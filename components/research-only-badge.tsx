export function ResearchOnlyBadge() {
  return (
    <span
      role="note"
      aria-label="This is research-only. Not financial advice."
      className="border-border text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs"
    >
      <span aria-hidden className="bg-muted-foreground size-1.5 rounded-full" />
      Research only
    </span>
  );
}
