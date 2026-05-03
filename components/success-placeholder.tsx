import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import type { WorkflowResponse } from "@/contracts/workflow/workflow-contract";
import { toHeadlineViewModel } from "@/features/research-memo/view-model";

interface Props {
  response: WorkflowResponse;
}

const directionCopy = {
  agent_higher: "Agent higher",
  agent_lower: "Agent lower",
  in_line: "In line",
} as const;

export function SuccessPlaceholder({ response }: Props) {
  const headline = toHeadlineViewModel(response);

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="eyebrow">Workflow placeholder · validated response</p>
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
          Contract validated. Headline preview below — full memo render arrives in the next issue.
        </h2>
      </div>

      <Card size="default">
        <CardHeader className="border-rule border-b pb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <Badge variant="outline" className="font-mono tracking-[0.15em] uppercase">
              {headline.ticker}
            </Badge>
            <Badge variant="secondary" className="font-mono tracking-[0.15em] uppercase">
              Confidence · {headline.confidence}
            </Badge>
          </div>
          <CardTitle className="font-display text-2xl leading-snug">{headline.title}</CardTitle>
          <CardDescription className="text-muted-foreground font-serif text-base italic">
            {headline.thesis}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <dl className="border-rule bg-rule grid grid-cols-1 gap-px overflow-hidden border sm:grid-cols-3">
            <Cell label="Kalshi implied" value={headline.kalshiProbability} />
            <Cell label="Agent estimate" value={headline.agentProbability} accent />
            <Cell label={`Delta · ${directionCopy[headline.direction]}`} value={headline.delta} />
          </dl>

          <Separator className="bg-rule" />

          <div className="flex flex-col gap-3">
            <p className="eyebrow">What renders next (future issue)</p>
            <ul className="text-muted-foreground grid grid-cols-1 gap-2 font-serif text-sm sm:grid-cols-2">
              {[
                "Evidence cards with source titles & relevance",
                "Counterarguments",
                "Settlement-risk audit",
                "Liquidity & staleness warnings",
                "Agent trace per role",
                "Final memo markdown",
                "What-would-change bullets",
                "Developer raw-JSON inspector",
              ].map((item) => (
                <li key={item} className="before:bg-signal flex items-start gap-2 before:mt-2 before:size-1">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function Cell({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-card flex flex-col gap-2 p-5">
      <span className="eyebrow">{label}</span>
      <span
        className={
          accent
            ? "text-signal font-mono text-3xl tabular-nums"
            : "text-foreground font-mono text-3xl tabular-nums"
        }
      >
        {value}
      </span>
    </div>
  );
}
