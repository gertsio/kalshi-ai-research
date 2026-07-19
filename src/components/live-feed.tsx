import { AnimatePresence, motion } from "motion/react";

import type { Finding } from "@/features/analysis/state";
import { cn } from "@/lib/utils";

const item = {
  initial: { opacity: 0, x: -14, filter: "blur(3px)" },
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
};

function FindingCard({ finding }: { finding: Finding }) {
  if (finding.kind === "source") {
    return (
      <div className="flex items-start gap-3">
        <span className="text-glow mt-0.5 font-mono text-xs">⇲</span>
        <div className="min-w-0">
          <p className="text-secondary-foreground font-mono text-[11px] tracking-widest uppercase">
            source · relevance {finding.relevance}
          </p>
          {finding.url ? (
            <a
              href={finding.url}
              target="_blank"
              rel="noreferrer"
              className="text-foreground decoration-glow/40 hover:decoration-glow block truncate text-sm underline underline-offset-4"
            >
              {finding.title}
            </a>
          ) : (
            <p className="text-foreground truncate text-sm">{finding.title}</p>
          )}
        </div>
      </div>
    );
  }
  if (finding.kind === "risk") {
    return (
      <div className="flex items-start gap-3">
        <span className="text-signal-amber mt-0.5 font-mono text-xs">⚠</span>
        <div>
          <p className="text-secondary-foreground font-mono text-[11px] tracking-widest uppercase">
            settlement risk · {finding.risk.severity}
          </p>
          <p className="text-foreground/90 text-sm leading-snug">{finding.risk.risk}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-3">
      <span className="text-signal-rust mt-0.5 font-mono text-xs">!</span>
      <div>
        <p className="text-secondary-foreground font-mono text-[11px] tracking-widest uppercase">
          {finding.warning.kind.replace("_", " ")} warning · {finding.warning.severity}
        </p>
        <p className="text-foreground/90 text-sm leading-snug">{finding.warning.message}</p>
      </div>
    </div>
  );
}

export function LiveFeed({ findings, streaming }: { findings: Finding[]; streaming: boolean }) {
  return (
    <div className="space-y-3" data-testid="live-feed" aria-live="polite">
      <AnimatePresence initial={false}>
        {findings.map((finding) => (
          <motion.div
            key={finding.key}
            layout
            {...item}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={cn("hairline bg-desk rounded-lg border p-3")}
          >
            <FindingCard finding={finding} />
          </motion.div>
        ))}
      </AnimatePresence>
      {streaming ? (
        <motion.p
          className="text-muted-foreground pl-1 font-mono text-xs"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          listening to the desk…
        </motion.p>
      ) : null}
    </div>
  );
}
