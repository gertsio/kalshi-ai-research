import { motion } from "motion/react";

import type { StageState } from "@/features/analysis/state";
import { cn } from "@/lib/utils";

function StageMark({ status }: { status: StageState["status"] }) {
  if (status === "completed") return <span className="text-glow font-mono text-xs">✓</span>;
  if (status === "skipped") return <span className="text-muted-foreground font-mono text-xs">–</span>;
  if (status === "failed") return <span className="text-signal-rust font-mono text-xs">✕</span>;
  if (status === "running")
    return (
      <motion.span
        className="bg-glow block size-2 rounded-full"
        animate={{ opacity: [1, 0.25, 1], scale: [1, 0.8, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
    );
  return <span className="bg-desk-edge block size-2 rounded-full" />;
}

export function StageRail({ stages }: { stages: StageState[] }) {
  return (
    <ol className="space-y-0" data-testid="stage-rail">
      {stages.map((stage, index) => {
        const active = stage.status === "running";
        return (
          <li key={stage.role} className={cn("hairline border-l-2 py-3 pl-4", active && "border-l-glow")}>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground font-mono text-[10px]">0{index + 1}</span>
              <StageMark status={stage.status} />
              <span
                className={cn(
                  "font-mono text-xs tracking-wide",
                  active
                    ? "text-foreground"
                    : stage.status === "pending"
                      ? "text-muted-foreground/60"
                      : "text-secondary-foreground",
                )}
              >
                {stage.displayName.replace(" Agent", "")}
              </span>
            </div>
            {active ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-glow-soft/80 mt-1 pl-[52px] font-mono text-[11px] leading-snug"
              >
                {stage.headline}…
              </motion.p>
            ) : stage.summary ? (
              <p className="text-muted-foreground mt-1 pl-[52px] font-mono text-[11px] leading-snug">
                {stage.summary}
              </p>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
