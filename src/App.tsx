import { AnimatePresence, motion } from "motion/react";

import { AnalysisView } from "@/components/analysis-view";
import { EventPrompt } from "@/components/event-prompt";
import { useAnalysis } from "@/features/analysis/use-analysis";

export default function App() {
  const { state, submit, reset } = useAnalysis();
  const researching = state.phase !== "idle";

  return (
    <div className="grain desk-glow flex min-h-dvh flex-col">
      <header className="hairline flex items-baseline justify-between border-b px-6 py-4 md:px-10">
        <button
          type="button"
          onClick={reset}
          className="font-display text-foreground text-lg font-semibold tracking-tight"
        >
          Probable<span className="text-glow">.</span>
        </button>
        <p className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
          event probability research desk
        </p>
      </header>

      <main className="flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          {researching ? (
            <motion.div
              key="analysis"
              className="flex-1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <AnalysisView state={state} onReset={reset} />
            </motion.div>
          ) : (
            <motion.div
              key="prompt"
              className="flex flex-1 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <EventPrompt onSubmit={submit} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="hairline border-t px-6 py-3 md:px-10">
        <p className="text-muted-foreground font-mono text-[11px] leading-relaxed">
          Research assistance only — not financial advice, not trading advice, and never a recommendation to
          place any trade.
        </p>
      </footer>
    </div>
  );
}
