export function ResearchOnlyBadge() {
  return (
    <span
      role="note"
      aria-label="This is research-only. Not financial advice."
      className="border-signal/40 text-signal inline-flex items-center gap-2 border px-2 py-1 font-mono text-[0.65rem] tracking-[0.18em] uppercase"
    >
      <span aria-hidden className="bg-signal size-1.5 animate-pulse rounded-full" />
      Research-only
    </span>
  );
}
