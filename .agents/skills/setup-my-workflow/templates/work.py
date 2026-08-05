#!/usr/bin/env python3
"""Query and update the local docs/work tracker.

Manifests store only intrinsic state: each record's own lifecycle status and,
for tickets, its blocked_by edges. Blockedness, the frontier, and the
active/next pointers are derived on every call, so they cannot drift from the
edges they are computed from.

Usage:
    python3 docs/work/work.py next            # the ticket to work now
    python3 docs/work/work.py frontier        # every workable ticket
    python3 docs/work/work.py list            # the queue, with derived state
    python3 docs/work/work.py show <id>       # resolve one ticket
    python3 docs/work/work.py set <id> <status>
    python3 docs/work/work.py check           # validate; exit 1 on a problem
"""
import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent

# Intrinsic lifecycle states. A ticket is never stored as "blocked" — that is
# derived from blocked_by, which is why the two can no longer disagree.
STATUSES = (
    "draft",
    "ready",
    "active",
    "ready-for-human",
    "completed",
    "cancelled",
    "archived",
)

# A blocker in one of these states will never be worked again, so it no longer
# holds anything back.
SETTLED = {"completed", "cancelled", "archived"}


class TrackerError(Exception):
    pass


def load(path: Path) -> dict:
    if not path.is_file():
        raise TrackerError(f"missing manifest: {rel(path)}")
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise TrackerError(f"{rel(path)}: invalid JSON: {exc}") from exc


def save(path: Path, doc: dict) -> None:
    path.write_text(json.dumps(doc, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def rel(path: Path) -> str:
    try:
        return str(path.relative_to(ROOT.parent.parent))
    except ValueError:
        return str(path)


def workstream_folders() -> list[tuple[Path, dict]]:
    """Every workstream, as (folder, entry).

    A repo with one queue needs no workstream layer: when there is no
    index.json, docs/work is itself the workstream. The layout is discovered
    rather than declared, so a small repo carries no scaffolding it does not
    use and the same commands work as it grows."""
    if not (ROOT / "index.json").is_file():
        return [(ROOT, {"id": ROOT.name, "title": ROOT.name})]
    index = load(ROOT / "index.json")
    found = []
    for entry in index.get("workstreams", []):
        if "id" not in entry:
            raise TrackerError("index.json has a workstream with no id")
        found.append((ROOT / entry.get("folder", entry["id"]), entry))
    return found


def resolve_workstream(want: str | None = None) -> tuple[Path, dict]:
    folders = workstream_folders()
    if not (ROOT / "index.json").is_file():
        return folders[0]

    index = load(ROOT / "index.json")
    wanted = want or index.get("active_workstream")
    if not wanted:
        if len(folders) == 1:
            return folders[0]
        raise TrackerError("index.json names no active_workstream")
    for folder, entry in folders:
        if entry["id"] == wanted:
            if not folder.is_dir():
                raise TrackerError(f"workstream folder not found: {rel(folder)}")
            return folder, entry
    raise TrackerError(f"unknown workstream: {wanted}")


def spec_package(folder: Path, spec: dict) -> Path:
    """A spec entry names its `spec.md`; the package is that file's directory."""
    if "file" not in spec:
        raise TrackerError(f"spec {spec.get('id', '?')} has no `file`")
    return (folder / spec["file"]).parent


def discover_specs(folder: Path) -> list[dict]:
    """Spec packages found on disk, for a workstream with no specs.json: any
    directory holding a tickets.json, in name order."""
    found = []
    for manifest in sorted(folder.glob("*/tickets.json")):
        package = manifest.parent
        head = package.name.split("-", 1)[0]
        found.append({
            "id": head if head.isdigit() else package.name,
            "title": package.name,
            "file": f"{package.name}/spec.md",
            "status": "active",
        })
    if not found:
        raise TrackerError(f"no spec package found under {rel(folder)}")
    return found


def resolve_specs(folder: Path, want: str | None = None) -> list[dict]:
    """The spec packages in play: the named one, else every package still being
    worked. A workstream can carry several at once, so the frontier spans them
    all rather than belonging to any single package."""
    if not (folder / "specs.json").is_file():
        specs = discover_specs(folder)
        if want:
            matches = [s for s in specs if s["id"] == want or s["title"] == want]
            if not matches:
                raise TrackerError(f"unknown spec: {want}")
            return matches
        return specs

    doc = load(folder / "specs.json")
    specs = doc.get("specs", [])
    if want:
        matches = [
            s for s in specs
            if s.get("id") == want or spec_package(folder, s).name == want
        ]
        if not matches:
            raise TrackerError(f"unknown spec: {want}")
        return matches
    open_specs = [s for s in specs if s.get("status") in ("active", "ready")]
    if not open_specs:
        raise TrackerError("no active or ready spec package in specs.json")
    return open_specs


def open_blockers(ticket: dict, by_id: dict) -> list[str]:
    """The blockers still holding this ticket back."""
    return [
        b
        for b in ticket.get("blocked_by", [])
        if by_id.get(b, {}).get("status") not in SETTLED
    ]


def frontier(tickets: list[dict]) -> list[dict]:
    """Every ticket that could be picked up right now, in manifest order."""
    by_id = {t["id"]: t for t in tickets if "id" in t}
    return [
        t
        for t in tickets
        if t.get("status") == "ready" and not open_blockers(t, by_id)
    ]


def load_queues(args) -> list[tuple[dict, Path, dict]]:
    """Every (spec, package, tickets.json) in play, in manifest order."""
    folder, _ = resolve_workstream(getattr(args, "workstream", None))
    queues = []
    for spec in resolve_specs(folder, getattr(args, "spec", None)):
        package = spec_package(folder, spec)
        manifest = package / "tickets.json"
        if manifest.is_file():
            queues.append((spec, package, load(manifest)))
    if not queues:
        raise TrackerError("no spec package in play has a tickets.json")
    return queues


def describe(ticket: dict, spec: dict, package: Path, by_id: dict) -> dict:
    blockers = open_blockers(ticket, by_id)
    return {
        "spec": spec.get("id", ""),
        "id": ticket["id"],
        "title": ticket.get("title", ""),
        "status": ticket.get("status"),
        "file": rel(package / ticket["file"]),
        "blocked_by_open": blockers,
        "workable": ticket.get("status") == "ready" and not blockers,
    }


def collect(args, only_frontier: bool = False) -> list[dict]:
    records = []
    for spec, package, doc in load_queues(args):
        tickets = doc.get("tickets", [])
        by_id = {t["id"]: t for t in tickets if "id" in t}
        chosen = frontier(tickets) if only_frontier else tickets
        records += [describe(t, spec, package, by_id) for t in chosen if "id" in t]
    return records


def emit(records: list[dict], as_json: bool) -> None:
    if as_json:
        print(json.dumps(records, indent=2, ensure_ascii=False))
        return
    for record in records:
        mark = "blocked" if record["blocked_by_open"] else record["status"]
        print(f"{record['spec']}/{record['id']}  {mark:<15}  {record['title']}")
        detail = f"    {record['file']}"
        if record["blocked_by_open"]:
            detail += f"  (waiting on {', '.join(record['blocked_by_open'])})"
        print(detail)


def cmd_next(args) -> int:
    workable = collect(args, only_frontier=True)
    if not workable:
        print("no workable ticket: the frontier is empty")
        return 1
    emit(workable[:1], args.json)
    return 0


def cmd_frontier(args) -> int:
    emit(collect(args, only_frontier=True), args.json)
    return 0


def cmd_list(args) -> int:
    emit(collect(args), args.json)
    return 0


def cmd_show(args) -> int:
    matches = [r for r in collect(args) if r["id"] == args.id or f"{r['spec']}/{r['id']}" == args.id]
    if not matches:
        raise TrackerError(f"unknown ticket: {args.id} (try --spec to narrow)")
    emit(matches, args.json)
    return 0


def cmd_set(args) -> int:
    if args.status not in STATUSES:
        raise TrackerError(
            f"unknown status: {args.status} (expected one of {', '.join(STATUSES)})"
        )
    spec_id, _, ticket_id = args.id.rpartition("/")
    hits = []
    for spec, package, doc in load_queues(args):
        if spec_id and spec.get("id") != spec_id:
            continue
        for ticket in doc.get("tickets", []):
            if ticket.get("id") == ticket_id:
                hits.append((spec, package, doc, ticket))
    if not hits:
        raise TrackerError(f"unknown ticket: {args.id}")
    if len(hits) > 1:
        found = ", ".join(f"{s.get('id')}/{t['id']}" for s, _, _, t in hits)
        raise TrackerError(f"ambiguous ticket {args.id}: qualify it as one of {found}")
    spec, package, doc, ticket = hits[0]
    was = ticket.get("status")
    ticket["status"] = args.status
    save(package / "tickets.json", doc)
    print(f"{spec.get('id')}/{ticket['id']}: {was} -> {args.status}")
    return 0


def find_cycle(tickets: list[dict]) -> list[str] | None:
    by_id = {t["id"]: t for t in tickets if "id" in t}
    state: dict[str, int] = {}

    def walk(node: str, trail: list[str]) -> list[str] | None:
        if state.get(node) == 2:
            return None
        if state.get(node) == 1:
            return trail[trail.index(node):] + [node]
        state[node] = 1
        for nxt in by_id.get(node, {}).get("blocked_by", []):
            if nxt in by_id:
                found = walk(nxt, trail + [node])
                if found:
                    return found
        state[node] = 2
        return None

    for ticket in tickets:
        found = walk(ticket["id"], [])
        if found:
            return found
    return None


def check_package(package: Path, problems: list[str]) -> None:
    doc = load(package / "tickets.json")
    tickets = doc.get("tickets", [])
    where = rel(package / "tickets.json")

    for legacy in ("active_ticket", "next_ticket", "next_issue_number", "queue_policy"):
        if legacy in doc:
            problems.append(
                f"{where}: `{legacy}` is derived state — remove it and use `work.py next`"
            )

    seen: set[str] = set()
    ids = {t.get("id") for t in tickets}
    listed: set[Path] = set()
    for ticket in tickets:
        tid = ticket.get("id")
        if tid is None:
            problems.append(f"{where}: a ticket entry has no id")
            continue
        if "file" not in ticket:
            problems.append(f"{where}: {tid} has no `file`")
            continue
        if tid in seen:
            problems.append(f"{where}: duplicate ticket id {tid}")
        seen.add(tid)
        status = ticket.get("status")
        if status == "blocked":
            problems.append(
                f"{where}: {tid} has stored status `blocked` — blockedness is derived "
                f"from blocked_by; run `work.py migrate`"
            )
        elif status not in STATUSES:
            problems.append(f"{where}: {tid} has unknown status {status!r}")
        for blocker in ticket.get("blocked_by", []):
            if blocker not in ids:
                problems.append(f"{where}: {tid} is blocked_by unknown id {blocker}")
        path = package / ticket["file"]
        listed.add(path.resolve())
        if not path.is_file():
            problems.append(f"{where}: {tid} points at missing file {ticket['file']}")

    cycle = find_cycle(tickets)
    if cycle:
        problems.append(f"{where}: blocked_by cycle {' -> '.join(cycle)}")

    tickets_dir = package / "tickets"
    if tickets_dir.is_dir():
        for orphan in sorted(tickets_dir.glob("*.md")):
            if orphan.resolve() not in listed:
                problems.append(f"{where}: {rel(orphan)} is not listed in the manifest")


def cmd_check(args) -> int:
    problems: list[str] = []
    if (ROOT / "index.json").is_file():
        index = load(ROOT / "index.json")
        ids = {e.get("id") for e in index.get("workstreams", [])}
        active = index.get("active_workstream")
        if active and active not in ids:
            problems.append(f"index.json: active_workstream {active} is not a workstream")

    for folder, entry in workstream_folders():
        if not folder.is_dir():
            problems.append(f"index.json: missing workstream folder {rel(folder)}")
            continue
        if not (folder / "specs.json").is_file():
            # Discovered layout: the packages on disk are the truth, so there
            # is no manifest that could disagree with them.
            for spec in discover_specs(folder):
                package = spec_package(folder, spec)
                if (package / "tickets.json").is_file():
                    check_package(package, problems)
            continue
        specs_doc = load(folder / "specs.json")
        where = rel(folder / "specs.json")
        for legacy in ("active_spec", "next_spec", "active_prd", "next_prd"):
            if legacy in specs_doc:
                problems.append(
                    f"{where}: `{legacy}` is derived state — remove it and use `work.py next`"
                )
        seen: set[str] = set()
        for spec in specs_doc.get("specs", []):
            sid = spec.get("id", "?")
            if sid in seen:
                problems.append(f"{where}: duplicate spec id {sid}")
            seen.add(sid)
            if spec.get("status") not in STATUSES:
                problems.append(f"{where}: {sid} has unknown status {spec.get('status')!r}")
            if "file" not in spec:
                problems.append(f"{where}: {sid} has no `file` naming its spec.md")
                continue
            if not (folder / spec["file"]).is_file():
                problems.append(f"{where}: {sid} points at missing file {spec['file']}")
                continue
            package = spec_package(folder, spec)
            if (package / "tickets.json").is_file():
                check_package(package, problems)

    if problems:
        for problem in problems:
            print(f"drift: {problem}", file=sys.stderr)
        return 1
    print("ok: tracker manifests are consistent")
    return 0


def cmd_migrate(args) -> int:
    """Rewrite v1 manifests in place: drop derived pointers and convert stored
    `blocked` statuses back to the edges they were computed from."""
    changes: list[str] = []
    for folder, entry in workstream_folders():
        if not folder.is_dir():
            continue
        specs_path = folder / "specs.json"
        if specs_path.is_file():
            specs_doc = load(specs_path)
            touched = False
            for legacy in ("active_spec", "next_spec", "active_prd", "next_prd"):
                if legacy in specs_doc:
                    specs_doc.pop(legacy)
                    changes.append(f"{rel(specs_path)}: dropped {legacy}")
                    touched = True
            if touched and not args.dry_run:
                save(specs_path, specs_doc)
            specs = specs_doc.get("specs", [])
        else:
            specs = discover_specs(folder)

        for spec in specs:
            if "file" not in spec:
                continue
            tickets_path = spec_package(folder, spec) / "tickets.json"
            if not tickets_path.is_file():
                continue
            doc = load(tickets_path)
            touched = False
            for legacy in ("active_ticket", "next_ticket", "next_issue_number", "queue_policy"):
                if legacy in doc:
                    doc.pop(legacy)
                    changes.append(f"{rel(tickets_path)}: dropped {legacy}")
                    touched = True
            by_id = {t["id"]: t for t in doc.get("tickets", []) if "id" in t}
            for ticket in doc.get("tickets", []):
                if ticket.get("status") != "blocked":
                    continue
                if open_blockers(ticket, by_id):
                    # The edges already say this is blocked, so the stored
                    # status was pure redundancy: drop it and let it derive.
                    ticket["status"] = "ready"
                    note = "blocked -> ready (derived from blocked_by)"
                else:
                    # Nothing in blocked_by explains this. The status was
                    # carrying meaning the edges never had — usually a human
                    # gate — so hand it to a human rather than the frontier.
                    ticket["status"] = "ready-for-human"
                    note = "blocked -> ready-for-human (no open blocker explained it)"
                changes.append(f"{rel(tickets_path)}: {ticket['id']} {note}")
                touched = True
            if touched and not args.dry_run:
                save(tickets_path, doc)

    if not changes:
        print("nothing to migrate")
        return 0
    for change in changes:
        print(change)
    if args.dry_run:
        print("\ndry run: re-run with --write to apply")
    return 0


def main(argv: list[str] | None = None) -> int:
    # Shared flags are attached to every subcommand as well as the root, so
    # both `work.py --json frontier` and `work.py frontier --json` work.
    # SUPPRESS keeps an unused subcommand copy from clobbering a flag that was
    # given before the subcommand.
    common = argparse.ArgumentParser(add_help=False)
    common.add_argument(
        "--workstream", default=argparse.SUPPRESS,
        help="override the active workstream",
    )
    common.add_argument(
        "--spec", default=argparse.SUPPRESS,
        help="override the selected spec package",
    )
    common.add_argument(
        "--json", action="store_true", default=argparse.SUPPRESS,
        help="machine-readable output",
    )

    parser = argparse.ArgumentParser(
        description=__doc__.splitlines()[0], parents=[common]
    )
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("next", parents=[common], help="the ticket to work now")
    sub.add_parser("frontier", parents=[common], help="every workable ticket")
    sub.add_parser("list", parents=[common], help="the queue, with derived state")
    show = sub.add_parser("show", parents=[common], help="resolve one ticket")
    show.add_argument("id")
    setter = sub.add_parser("set", parents=[common], help="change a ticket's status")
    setter.add_argument("id")
    setter.add_argument("status")
    sub.add_parser("check", parents=[common], help="validate the manifests")
    migrate = sub.add_parser(
        "migrate", parents=[common], help="rewrite v1 manifests to derived state"
    )
    migrate.add_argument(
        "--write", dest="dry_run", action="store_false", default=True,
        help="apply the changes instead of previewing them",
    )

    args = parser.parse_args(argv)
    args.json = getattr(args, "json", False)
    args.workstream = getattr(args, "workstream", None)
    args.spec = getattr(args, "spec", None)
    commands = {
        "next": cmd_next,
        "frontier": cmd_frontier,
        "list": cmd_list,
        "show": cmd_show,
        "set": cmd_set,
        "check": cmd_check,
        "migrate": cmd_migrate,
    }
    try:
        return commands[args.command](args)
    except TrackerError as exc:
        print(f"tracker error: {exc}", file=sys.stderr)
        return 1
    except (KeyError, TypeError) as exc:
        print(f"tracker error: malformed manifest entry: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
