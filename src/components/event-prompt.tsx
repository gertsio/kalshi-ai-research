import { motion } from "motion/react";
import { useState } from "react";

import { exampleMarkets } from "@/features/analysis/example-markets";
import { normalizeMarketInput } from "@/features/analysis/market-input-normalization";

const reveal = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export function EventPrompt({
  onSubmit,
}: {
  onSubmit: (rawInput: string, options?: { demoMode?: boolean }) => boolean;
}) {
  const [value, setValue] = useState("");
  const [rejected, setRejected] = useState(false);
  const valid = normalizeMarketInput(value) !== null;

  const run = (demoMode?: boolean) => {
    const accepted = onSubmit(value, demoMode === undefined ? undefined : { demoMode });
    if (!accepted) setRejected(true);
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-24">
      <motion.p
        {...reveal}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="text-glow-soft mb-6 font-mono text-xs tracking-[0.35em] uppercase"
      >
        ask the desk
      </motion.p>

      <motion.h1
        {...reveal}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="font-display text-foreground text-5xl leading-[1.05] font-light tracking-tight text-balance md:text-7xl"
      >
        How likely is it, <em className="text-glow font-medium italic">really</em>?
      </motion.h1>

      <motion.p
        {...reveal}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed"
      >
        Paste a Kalshi market ticker or URL. The desk runs a live research pass — market context, settlement
        rules, public evidence, a skeptic's audit — and shows its work while it thinks.
      </motion.p>

      <motion.form
        {...reveal}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mt-10"
        onSubmit={(event) => {
          event.preventDefault();
          run();
        }}
      >
        <div className="hairline bg-desk focus-within:border-glow/50 flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors">
          <span className="text-glow font-mono text-sm select-none">▸</span>
          <input
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              setRejected(false);
            }}
            placeholder="KXFEDDECISION-26JUL-H  ·  kalshi.com/markets/…"
            aria-label="Kalshi market ticker or URL"
            className="text-foreground placeholder:text-muted-foreground/50 w-full bg-transparent font-mono text-sm outline-none"
            autoFocus
          />
          <span className="text-glow cursor-blink font-mono text-sm select-none" aria-hidden>
            █
          </span>
        </div>
        {rejected ? (
          <p className="text-signal-rust mt-2 font-mono text-xs">
            That doesn't look like a Kalshi ticker (KX…) or market URL yet.
          </p>
        ) : null}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={!valid}
            className="bg-glow text-primary-foreground hover:bg-glow-soft rounded-lg px-5 py-2 font-mono text-sm font-semibold tracking-wide transition-colors disabled:opacity-40"
          >
            run research
          </button>
          <button
            type="button"
            onClick={() => run(true)}
            className="hairline text-glow-soft hover:border-glow/50 rounded-lg border px-5 py-2 font-mono text-sm tracking-wide transition-colors"
          >
            watch the demo
          </button>
        </div>
      </motion.form>

      <motion.div {...reveal} transition={{ duration: 0.5, delay: 0.5 }} className="mt-12">
        <p className="text-muted-foreground mb-3 font-mono text-[11px] tracking-widest uppercase">or try</p>
        <div className="flex flex-wrap gap-2">
          {exampleMarkets.map((market) => (
            <button
              key={market.ticker}
              type="button"
              onClick={() => {
                setValue(market.ticker);
                setRejected(false);
              }}
              className="hairline text-secondary-foreground hover:text-glow-soft hover:border-glow/40 rounded-full border px-4 py-1.5 font-mono text-xs transition-colors"
              title={market.blurb}
            >
              {market.label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
