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
      <div className="flex flex-col items-center gap-4 text-center">
        <h1
          id="masthead-heading"
          className="text-foreground text-3xl font-semibold tracking-tight sm:text-5xl"
        >
          Research a Kalshi market in <span className="text-primary">seconds</span>.
        </h1>
        <p className="text-muted-foreground max-w-xl text-base leading-relaxed">
          Paste a market URL or ticker. Six agents read the rules, gather evidence, and return a research
          memo.
        </p>
      </div>

      <MarketInput defaultValue={seed} onSubmit={onSubmit} />

      <ExamplePicker onPick={setSeed} />
    </section>
  );
}
