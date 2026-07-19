import { motion } from "motion/react";

import type { WorkflowResponse } from "@/contracts/workflow/workflow-contract";
import { SafeMarkdown } from "@/lib/safe-markdown";

function percent(probability: number): string {
  return `${Math.round(probability * 100)}%`;
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-paper-ink/50 mb-2 font-mono text-[10px] tracking-[0.25em] uppercase">{children}</p>
  );
}

/** The finished artifact: the dark desk "prints" a paper memo. */
export function MemoSheet({ response }: { response: WorkflowResponse }) {
  const delta = response.delta;
  const deltaLabel =
    delta.direction === "in_line"
      ? "in line with the market"
      : `${delta.probabilityPoints > 0 ? "+" : ""}${Math.round(delta.probabilityPoints * 100)} pts vs market`;

  return (
    <motion.article
      data-testid="memo-sheet"
      initial={{ opacity: 0, y: 32, rotate: -0.6 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.15 }}
      className="bg-paper text-paper-ink mx-auto max-w-2xl rounded-sm px-8 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.55)] md:px-12"
    >
      <header className="border-paper-ink/20 border-b pb-6">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-60">
          research memo · {new Date(response.analyzedAt).toUTCString()}
        </p>
        <h2 className="font-display mt-3 text-3xl leading-tight font-semibold text-balance">
          {response.market.title}
        </h2>
        <p className="mt-1 font-mono text-xs opacity-60">{response.market.ticker}</p>
      </header>

      <div className="border-paper-ink/20 grid grid-cols-3 gap-4 border-b py-6 text-center">
        <div>
          <p className="font-mono text-[10px] tracking-widest uppercase opacity-50">market implies</p>
          <p className="font-display text-4xl font-light">{percent(response.kalshi.impliedProbability)}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-widest uppercase opacity-50">desk estimate</p>
          <p className="font-display text-4xl font-semibold">{percent(response.agentEstimate.probability)}</p>
        </div>
        <div className="self-center">
          <p className="font-mono text-[10px] tracking-widest uppercase opacity-50">delta</p>
          <p className="font-mono text-sm font-semibold">{deltaLabel}</p>
          <p className="font-mono text-[10px] uppercase opacity-50">
            confidence {response.agentEstimate.confidence}
          </p>
        </div>
      </div>

      <div className="space-y-8 py-8">
        <section>
          <SectionLabel>memo</SectionLabel>
          <SafeMarkdown source={response.finalMemoMarkdown} />
        </section>

        <section>
          <SectionLabel>thesis</SectionLabel>
          <p className="leading-relaxed">{response.agentEstimate.thesis}</p>
        </section>

        <section>
          <SectionLabel>evidence</SectionLabel>
          <ul className="space-y-3">
            {response.evidence.map((item, index) => (
              <li key={index} className="flex gap-3">
                <span className="font-mono text-xs opacity-40">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="leading-snug">{item.claim}</p>
                  {item.sourceUrl ? (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs underline underline-offset-2 opacity-70 hover:opacity-100"
                    >
                      {item.sourceTitle}
                    </a>
                  ) : (
                    <span className="font-mono text-xs opacity-60">{item.sourceTitle}</span>
                  )}
                  <span className="ml-2 font-mono text-[10px] uppercase opacity-40">
                    rel. {item.relevance}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionLabel>counterarguments</SectionLabel>
          <ul className="list-disc space-y-1.5 pl-5">
            {response.counterarguments.map((argument, index) => (
              <li key={index} className="leading-snug">
                {argument}
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-8 md:grid-cols-2">
          <section>
            <SectionLabel>settlement risks</SectionLabel>
            <ul className="space-y-2">
              {response.settlementRisks.map((risk, index) => (
                <li key={index} className="text-sm leading-snug">
                  <span className="font-mono text-[10px] uppercase opacity-50">[{risk.severity}]</span>{" "}
                  {risk.risk}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <SectionLabel>what would change this</SectionLabel>
            <ul className="space-y-2">
              {response.whatWouldChange.map((item, index) => (
                <li key={index} className="text-sm leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section>
          <SectionLabel>assumptions</SectionLabel>
          <ul className="list-disc space-y-1.5 pl-5">
            {response.agentEstimate.assumptions.map((assumption, index) => (
              <li key={index} className="text-sm leading-snug">
                {assumption}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="border-paper-ink/20 border-t pt-5">
        <p className="font-mono text-[10px] leading-relaxed opacity-60">{response.disclaimer}</p>
      </footer>
    </motion.article>
  );
}
