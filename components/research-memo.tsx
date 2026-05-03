"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import type { WorkflowResponse } from "@/contracts/workflow/workflow-contract";
import {
  directionGlyph,
  directionLabel,
  formatAnalyzedAt,
  formatDeltaPoints,
  formatProbability,
  severityRank,
  traceStatusLabel,
  warningKindLabel,
} from "@/features/research-memo/view-model";
import { SafeMarkdown } from "@/lib/safe-markdown";
import { cn } from "@/lib/utils";

interface Props {
  response: WorkflowResponse;
}

export function ResearchMemo({ response }: Props) {
  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-12">
      <MemoHeader response={response} />
      <ProbabilityComparison response={response} />
      <ThesisAndAssumptions response={response} />
      <EvidenceList response={response} />
      <Counterarguments response={response} />
      <RisksAndWarnings response={response} />
      <WhatWouldChange response={response} />
      <AgentTrace response={response} />
      <FinalMemo response={response} />
      <RawJsonToggle response={response} />
      <MemoDisclaimer response={response} />
    </article>
  );
}

function MemoHeader({ response }: Props) {
  const { market } = response;
  return (
    <header data-testid="memo-header" className="border-border flex flex-col gap-4 border-b pb-8">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="font-mono text-[0.7rem] tracking-wide uppercase">
          {market.ticker}
        </Badge>
        <Badge
          variant="outline"
          className={cn(
            "text-[0.7rem] tracking-wide uppercase",
            market.status === "open" && "bg-accent text-accent-foreground border-transparent",
          )}
        >
          {market.status}
        </Badge>
        <span className="text-muted-foreground ml-auto text-xs">
          Analyzed {formatAnalyzedAt(response.analyzedAt)}
        </span>
      </div>

      <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
        {market.title}
      </h1>
      {market.subtitle ? (
        <p className="text-muted-foreground text-base leading-relaxed">{market.subtitle}</p>
      ) : null}

      <dl className="text-muted-foreground mt-2 grid grid-cols-1 gap-x-8 gap-y-2 text-xs sm:grid-cols-3">
        {market.closeTime ? <MetaRow label="Closes" value={formatAnalyzedAt(market.closeTime)} /> : null}
        {market.settlementSource ? (
          <MetaRow label="Settlement source" value={market.settlementSource} />
        ) : null}
        {market.url ? (
          <MetaRow
            label="Market"
            value={
              <a
                href={market.url}
                rel="noreferrer noopener"
                target="_blank"
                className="text-foreground underline-offset-4 hover:underline"
              >
                View on Kalshi ↗
              </a>
            }
          />
        ) : null}
      </dl>
    </header>
  );
}

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[0.7rem] tracking-wide uppercase">{label}</dt>
      <dd className="text-foreground text-sm">{value}</dd>
    </div>
  );
}

function ProbabilityComparison({ response }: Props) {
  const kalshi = response.kalshi.impliedProbability;
  const agent = response.agentEstimate.probability;
  const deltaPoints = response.delta.probabilityPoints;

  return (
    <Section title="Probability comparison" data-testid="probability-comparison">
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-3">
        <Stat label="Kalshi implied" value={formatProbability(kalshi)} />
        <Stat label="Agent estimate" value={formatProbability(agent)} emphasized />
        <Stat
          label={directionLabel[response.delta.direction]}
          value={
            <span className="inline-flex items-baseline gap-1.5">
              <span aria-hidden className="text-foreground/60 text-2xl leading-none">
                {directionGlyph[response.delta.direction]}
              </span>
              <span>{formatDeltaPoints(deltaPoints)}</span>
            </span>
          }
        />
      </div>
    </Section>
  );
}

function Stat({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: React.ReactNode;
  emphasized?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-muted-foreground text-[0.7rem] tracking-wide uppercase">{label}</span>
      <span
        className={cn(
          "tabular-nums",
          "text-[2.5rem] leading-none font-semibold tracking-tight",
          emphasized ? "text-primary" : "text-foreground",
        )}
      >
        {value}
      </span>
    </div>
  );
}

function ThesisAndAssumptions({ response }: Props) {
  return (
    <Section title="Thesis" data-testid="thesis">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground text-[0.7rem] tracking-wide uppercase">Confidence</span>
        <Badge variant="secondary" className="text-[0.7rem] tracking-wide uppercase">
          {response.agentEstimate.confidence}
        </Badge>
      </div>
      <p className="text-foreground text-lg leading-relaxed">
        {response.agentEstimate.thesis}
      </p>
      <div>
        <h3 className="text-muted-foreground mb-2 text-[0.7rem] tracking-wide uppercase">
          Working assumptions
        </h3>
        <ul className="border-border flex flex-col gap-2 border-l pl-4">
          {response.agentEstimate.assumptions.map((assumption, index) => (
            <li key={index} className="text-foreground text-sm leading-relaxed">
              {assumption}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function EvidenceList({ response }: Props) {
  if (response.evidence.length === 0) return null;
  return (
    <Section title="Evidence" data-testid="evidence">
      <ol className="flex flex-col gap-0">
        {response.evidence.map((item, index) => (
          <li
            key={index}
            className="border-border grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-t py-4 first:border-t-0 first:pt-0"
          >
            <span className="text-muted-foreground font-mono text-xs tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-1.5">
              <p className="text-foreground text-sm leading-relaxed">{item.claim}</p>
              <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
                {item.sourceUrl ? (
                  <a
                    href={item.sourceUrl}
                    rel="noreferrer noopener"
                    target="_blank"
                    className="hover:text-foreground underline-offset-4 hover:underline"
                  >
                    {item.sourceTitle} ↗
                  </a>
                ) : (
                  <span>{item.sourceTitle}</span>
                )}
                <span aria-hidden>·</span>
                <RelevancePip level={item.relevance} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function RelevancePip({ level }: { level: "low" | "medium" | "high" }) {
  const filled = severityRank[level];
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-[0.7rem] tracking-wide uppercase">Relevance · {level}</span>
      <span aria-hidden className="inline-flex gap-0.5">
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            className={cn("size-1.5 rounded-full", step <= filled ? "bg-foreground" : "bg-muted")}
          />
        ))}
      </span>
    </span>
  );
}

function Counterarguments({ response }: Props) {
  if (response.counterarguments.length === 0) return null;
  return (
    <Section title="Counterarguments" data-testid="counterarguments">
      <ul className="flex flex-col gap-3">
        {response.counterarguments.map((arg, index) => (
          <li
            key={index}
            className="bg-muted/40 border-border text-foreground rounded-lg border-l-2 px-4 py-3 text-sm leading-relaxed"
          >
            {arg}
          </li>
        ))}
      </ul>
    </Section>
  );
}

function RisksAndWarnings({ response }: Props) {
  const hasRisks = response.settlementRisks.length > 0;
  const hasWarnings = response.warnings.length > 0;
  if (!hasRisks && !hasWarnings) return null;
  return (
    <Section title="Risks &amp; data warnings" data-testid="risks-and-warnings">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {hasRisks ? (
          <div className="flex flex-col gap-3" data-testid="settlement-risks">
            <h3 className="text-muted-foreground text-[0.7rem] tracking-wide uppercase">Settlement risks</h3>
            <ul className="flex flex-col gap-2">
              {response.settlementRisks.map((item, index) => (
                <li
                  key={index}
                  className="bg-card ring-foreground/10 flex flex-col gap-2 rounded-lg p-4 ring-1"
                >
                  <SeverityBadge level={item.severity} />
                  <p className="text-foreground text-sm leading-relaxed">{item.risk}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {hasWarnings ? (
          <div className="flex flex-col gap-3" data-testid="warnings">
            <h3 className="text-muted-foreground text-[0.7rem] tracking-wide uppercase">
              Liquidity &amp; staleness
            </h3>
            <ul className="flex flex-col gap-2">
              {response.warnings.map((item, index) => (
                <li
                  key={index}
                  className="bg-card ring-foreground/10 flex flex-col gap-2 rounded-lg p-4 ring-1"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[0.7rem] tracking-wide uppercase">
                      {warningKindLabel[item.kind]}
                    </Badge>
                    <SeverityBadge level={item.severity} />
                  </div>
                  <p className="text-foreground text-sm leading-relaxed">{item.message}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Section>
  );
}

function SeverityBadge({ level }: { level: "low" | "medium" | "high" }) {
  const filled = severityRank[level];
  return (
    <span
      className="text-muted-foreground inline-flex items-center gap-1.5 text-[0.7rem] tracking-wide uppercase"
      data-severity={level}
    >
      <span aria-hidden className="inline-flex gap-0.5">
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            className={cn("size-1.5 rounded-full", step <= filled ? "bg-foreground" : "bg-muted")}
          />
        ))}
      </span>
      Severity · {level}
    </span>
  );
}

function WhatWouldChange({ response }: Props) {
  return (
    <Section title="What would change the estimate" data-testid="what-would-change">
      <ul className="flex flex-col gap-2">
        {response.whatWouldChange.map((item, index) => (
          <li
            key={index}
            className="text-foreground border-border grid grid-cols-[auto_1fr] gap-3 border-t py-3 text-sm leading-relaxed first:border-t-0 first:pt-0"
          >
            <span aria-hidden className="text-muted-foreground select-none">
              ↻
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function AgentTrace({ response }: Props) {
  return (
    <Section title="Agent trace" data-testid="agent-trace">
      <Card>
        <CardContent className="flex flex-col gap-0 p-0">
          {response.agentTrace.map((entry, index) => (
            <div
              key={entry.role}
              className="border-border grid grid-cols-[auto_auto_1fr_auto] items-start gap-3 border-b px-4 py-3 last:border-b-0 sm:px-5"
            >
              <span className="text-muted-foreground font-mono text-xs tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span aria-hidden className={cn("mt-1 size-2 rounded-full", traceDotClass(entry.status))} />
              <div className="flex flex-col gap-0.5">
                <span className="text-foreground text-sm font-medium">{entry.displayName}</span>
                <span className="text-muted-foreground text-xs leading-relaxed">{entry.summary}</span>
              </div>
              <span className="text-muted-foreground self-center text-[0.7rem] tracking-wide uppercase">
                {traceStatusLabel[entry.status]}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </Section>
  );
}

function traceDotClass(status: "completed" | "skipped" | "failed"): string {
  if (status === "completed") return "bg-primary";
  if (status === "skipped") return "bg-muted-foreground/40";
  return "bg-destructive";
}

function FinalMemo({ response }: Props) {
  return (
    <Section title="Final memo" data-testid="final-memo">
      <div className="bg-card ring-foreground/10 rounded-xl px-6 py-7 ring-1 sm:px-8 sm:py-9">
        <SafeMarkdown source={response.finalMemoMarkdown} />
      </div>
    </Section>
  );
}

function RawJsonToggle({ response }: Props) {
  const [open, setOpen] = useState(false);
  if (!response.developer.rawJsonInspectionEnabled) return null;
  return (
    <section data-testid="raw-json" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-muted-foreground text-[0.7rem] tracking-wide uppercase">Developer</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="raw-json-payload"
        >
          {open ? "Hide" : "Show"} {response.developer.rawJsonLabel}
        </Button>
      </div>
      {open ? (
        <pre
          id="raw-json-payload"
          className="bg-card ring-foreground/10 overflow-x-auto rounded-lg p-4 font-mono text-xs leading-relaxed ring-1"
        >
          {JSON.stringify(response, null, 2)}
        </pre>
      ) : null}
    </section>
  );
}

function MemoDisclaimer({ response }: Props) {
  return (
    <aside
      data-testid="memo-disclaimer"
      className="border-border text-muted-foreground border-t pt-6 text-xs leading-relaxed"
    >
      {response.disclaimer}
    </aside>
  );
}

function Section({
  title,
  children,
  ...rest
}: {
  title: React.ReactNode;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "title">) {
  return (
    <section className="flex flex-col gap-5" {...rest}>
      <h2 className="text-foreground text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
