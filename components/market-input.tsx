"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  defaultValue?: string;
  onSubmit: (marketInput: string) => void;
  disabled?: boolean;
}

export function MarketInput({ defaultValue = "", onSubmit, disabled = false }: Props) {
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value.trim().length === 0) return;
    onSubmit(value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" aria-label="Submit a Kalshi market">
      <label className="eyebrow" htmlFor="market-input">
        Market URL or ticker
      </label>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <Input
          id="market-input"
          type="text"
          autoComplete="off"
          spellCheck={false}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="KXEXAMPLE-26MAY03-DEMO  ·  https://kalshi.com/markets/…"
          className="border-rule bg-background h-11 flex-1 rounded-none font-mono text-sm tracking-tight"
          disabled={disabled}
        />
        <Button
          type="submit"
          size="lg"
          className="h-11 rounded-none px-5 font-mono tracking-[0.12em] uppercase"
          disabled={disabled || value.trim().length === 0}
        >
          Run research
        </Button>
      </div>
      <p className="text-muted-foreground font-serif text-xs italic">
        Submitting will eventually call the agent workflow. In this scaffold, use the demo state controls
        above to preview the four states.
      </p>
    </form>
  );
}
