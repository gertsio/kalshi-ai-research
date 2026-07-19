import { motion } from "motion/react";

import { LiveFeed } from "@/components/live-feed";
import { MemoSheet } from "@/components/memo-sheet";
import { ProbabilityDial } from "@/components/probability-dial";
import { StageRail } from "@/components/stage-rail";
import type { AnalysisState } from "@/features/analysis/state";

function MarketCard({ state }: { state: AnalysisState }) {
  if (!state.market) {
    return (
      <div className="hairline bg-desk rounded-lg border p-4">
        <motion.p
          className="text-muted-foreground font-mono text-xs"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          resolving {state.eventInput}…
        </motion.p>
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="hairline bg-desk rounded-lg border p-4"
    >
      <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">under analysis</p>
      <h2 className="font-display text-foreground mt-1 text-lg leading-snug font-medium text-balance">
        {state.market.title}
      </h2>
      <p className="text-glow-soft/70 mt-1 font-mono text-[11px]">{state.market.ticker}</p>
      {state.kalshi ? (
        <dl className="text-muted-foreground mt-3 grid grid-cols-3 gap-2 font-mono text-[11px]">
          <div>
            <dt className="uppercase opacity-60">bid</dt>
            <dd className="text-foreground tabular">{state.kalshi.yesBid ?? "—"}</dd>
          </div>
          <div>
            <dt className="uppercase opacity-60">ask</dt>
            <dd className="text-foreground tabular">{state.kalshi.yesAsk ?? "—"}</dd>
          </div>
          <div>
            <dt className="uppercase opacity-60">volume</dt>
            <dd className="text-foreground tabular">{state.kalshi.volume ?? "—"}</dd>
          </div>
        </dl>
      ) : null}
    </motion.div>
  );
}

function ErrorPanel({ state, onReset }: { state: AnalysisState; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-signal-rust/40 bg-desk mx-auto max-w-xl rounded-lg border p-6 text-center"
      role="alert"
    >
      <p className="text-signal-rust font-mono text-xs tracking-widest uppercase">
        analysis halted · {state.error?.code}
      </p>
      <p className="text-foreground mt-3 leading-relaxed">{state.error?.message}</p>
      <button
        type="button"
        onClick={onReset}
        className="hairline text-glow-soft hover:border-glow/50 mt-5 rounded-lg border px-5 py-2 font-mono text-sm transition-colors"
      >
        back to the desk
      </button>
    </motion.div>
  );
}

export function AnalysisView({ state, onReset }: { state: AnalysisState; onReset: () => void }) {
  const streaming = state.phase === "streaming";

  if (state.phase === "failed") {
    return (
      <div className="flex h-full items-center justify-center px-6 py-16">
        <ErrorPanel state={state} onReset={onReset} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8 md:px-10">
      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)_300px]">
        <aside className="order-2 lg:order-1">
          <p className="text-muted-foreground mb-3 font-mono text-[10px] tracking-[0.3em] uppercase">
            research pass
          </p>
          <StageRail stages={state.stages} />
        </aside>

        <section className="order-3 min-w-0 lg:order-2">
          {state.phase === "complete" && state.response ? (
            <div className="space-y-8">
              <MemoSheet response={state.response} />
              <div className="text-center">
                <button
                  type="button"
                  onClick={onReset}
                  className="hairline text-glow-soft hover:border-glow/50 rounded-lg border px-5 py-2 font-mono text-sm transition-colors"
                >
                  research another event
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-3 font-mono text-[10px] tracking-[0.3em] uppercase">
                live findings
              </p>
              <LiveFeed findings={state.findings} streaming={streaming} />
            </>
          )}
        </section>

        <aside className="order-1 space-y-6 lg:order-3">
          <ProbabilityDial estimate={state.estimate} marketPrior={state.kalshi?.impliedProbability ?? null} />
          <MarketCard state={state} />
        </aside>
      </div>
    </div>
  );
}
