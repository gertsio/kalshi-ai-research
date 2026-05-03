export const DISCLAIMER_TEXT =
  "Research-only analysis. Output describes a probability estimate from agent research compared with Kalshi's market-implied probability. It is not financial advice and is not a recommendation to place, buy, or sell any contract.";

export function DisclaimerStrip() {
  return (
    <footer role="contentinfo" className="border-border bg-background mt-auto border-t">
      <div className="mx-auto w-full max-w-5xl px-6 py-5 sm:px-8">
        <p className="text-muted-foreground text-xs leading-relaxed">{DISCLAIMER_TEXT}</p>
      </div>
    </footer>
  );
}
