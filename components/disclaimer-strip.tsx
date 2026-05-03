export const DISCLAIMER_TEXT =
  "Research-only analysis. Output describes a probability estimate from agent research compared with Kalshi's market-implied probability. It is not financial advice and is not a recommendation to place, buy, or sell any contract.";

export function DisclaimerStrip() {
  return (
    <footer role="contentinfo" className="border-rule bg-background/60 mt-auto border-t backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-5 sm:px-10">
        <p className="eyebrow">Disclaimer</p>
        <p className="text-muted-foreground font-serif text-sm leading-relaxed">{DISCLAIMER_TEXT}</p>
      </div>
    </footer>
  );
}
