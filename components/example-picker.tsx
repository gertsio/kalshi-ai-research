"use client";

import { Button } from "@/components/ui/button";

import { exampleMarkets } from "@/features/research-memo/example-markets";

interface Props {
  onPick: (ticker: string) => void;
}

export function ExamplePicker({ onPick }: Props) {
  return (
    <section aria-labelledby="example-picker-heading" className="flex flex-col gap-3">
      <h2 id="example-picker-heading" className="text-muted-foreground text-xs font-medium">
        Examples
      </h2>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {exampleMarkets.map((market) => (
          <li key={market.ticker}>
            <Button
              variant="outline"
              onClick={() => onPick(market.ticker)}
              className="h-auto w-full flex-col items-start gap-1 px-3 py-3 text-left whitespace-normal"
            >
              <span className="text-foreground text-sm font-medium">{market.label}</span>
              <span className="text-muted-foreground text-xs">{market.ticker}</span>
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
