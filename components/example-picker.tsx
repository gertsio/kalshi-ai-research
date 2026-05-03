"use client";

import { Button } from "@/components/ui/button";

import { exampleMarkets } from "@/features/research-memo/example-markets";

interface Props {
  onPick: (ticker: string) => void;
}

export function ExamplePicker({ onPick }: Props) {
  return (
    <section aria-labelledby="example-picker-heading" className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="example-picker-heading" className="eyebrow">
          Examples — placeholder
        </h2>
        <span className="text-muted-foreground font-mono text-[0.65rem] tracking-[0.15em] uppercase">
          Populates input only
        </span>
      </div>
      <ol className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {exampleMarkets.map((market, index) => (
          <li key={market.ticker}>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onPick(market.ticker)}
              className="group border-rule h-auto w-full flex-col items-start gap-1 rounded-none px-4 py-3 text-left whitespace-normal"
            >
              <span className="text-muted-foreground font-mono text-[0.65rem] tracking-[0.15em] uppercase">
                {romanNumeral(index + 1)}
              </span>
              <span className="font-display text-base">{market.label}</span>
              <span className="text-muted-foreground font-mono text-xs">{market.ticker}</span>
            </Button>
          </li>
        ))}
      </ol>
    </section>
  );
}

function romanNumeral(n: number): string {
  return ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][n - 1] ?? `${n}`;
}
