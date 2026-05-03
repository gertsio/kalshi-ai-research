"use client";

import { useState } from "react";

import { ExamplePicker } from "@/components/example-picker";
import { MarketInput } from "@/components/market-input";
import { Separator } from "@/components/ui/separator";

interface Props {
  onSubmit: (marketInput: string) => void;
}

export function IdleView({ onSubmit }: Props) {
  const [seed, setSeed] = useState("");

  return (
    <section aria-labelledby="masthead-heading" className="flex flex-col gap-10">
      <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start">
        <span aria-hidden className="font-display text-signal/70 text-[5.5rem] leading-none lg:text-[7rem]">
          01
        </span>
        <div className="flex flex-col gap-4">
          <p className="eyebrow">A research memo, in one input</p>
          <h1
            id="masthead-heading"
            className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Market price <em className="text-signal italic">vs.</em> agent-estimated probability, with
            evidence and skepticism.
          </h1>
          <p className="text-muted-foreground max-w-xl font-serif text-lg leading-relaxed">
            Paste a Kalshi market URL or ticker. Six named agents read the rules, gather evidence, estimate a
            probability, and challenge the estimate — returning a typed memo, not a trade.
          </p>
        </div>
      </div>

      <Separator className="bg-rule" />

      <MarketInput defaultValue={seed} onSubmit={onSubmit} />

      <Separator className="bg-rule" />

      <ExamplePicker onPick={setSeed} />
    </section>
  );
}
