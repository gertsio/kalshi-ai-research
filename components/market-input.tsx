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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2" aria-label="Submit a Kalshi market">
      <label className="sr-only" htmlFor="market-input">
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
          placeholder="Paste a Kalshi market URL or ticker"
          className="h-12 flex-1 text-base"
          disabled={disabled}
        />
        <Button
          type="submit"
          size="lg"
          className="h-12 px-6 text-sm font-medium"
          disabled={disabled || value.trim().length === 0}
        >
          Research
        </Button>
      </div>
    </form>
  );
}
