"use client";

import { useState } from "react";

import { ExamplePicker } from "@/components/example-picker";
import { MarketInput } from "@/components/market-input";

interface Props {
  onSubmit: (marketInput: string) => void;
}

export function IdleView({ onSubmit }: Props) {
  const [seed, setSeed] = useState("");

  return (
    <section aria-labelledby="masthead-heading" className="mx-auto flex max-w-2xl flex-col gap-10">
      <div className="flex flex-col gap-3 text-center">
        <h1
          id="masthead-heading"
          className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Research a Kalshi market in seconds.
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Paste a market URL or ticker. Six agents read the rules, gather evidence, and return a research
          memo.
        </p>
      </div>

      <MarketInput defaultValue={seed} onSubmit={onSubmit} />

      <ExamplePicker onPick={setSeed} />
    </section>
  );
}
