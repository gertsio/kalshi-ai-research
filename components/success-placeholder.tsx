import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <section className="mx-auto flex max-w-2xl flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-xs font-medium">{headline.ticker}</span>
        <h2 className="text-foreground text-2xl leading-snug font-semibold tracking-tight">
          {headline.title}
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">{headline.thesis}</p>
      </div>

      <Card>
        <CardHeader className="border-border border-b">
          <CardTitle className="text-foreground text-sm font-medium">
            Confidence · {headline.confidence}
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-border grid grid-cols-1 gap-px overflow-hidden p-0 sm:grid-cols-3">
          <Cell label="Kalshi implied" value={headline.kalshiProbability} />
          <Cell label="Agent estimate" value={headline.agentProbability} emphasized />
          <Cell label={`Delta · ${directionCopy[headline.direction]}`} value={headline.delta} />
        </CardContent>
      </Card>
    </section>
  );
}

function Cell({ label, value, emphasized = false }: { label: string; value: string; emphasized?: boolean }) {
  return (
    <div className="bg-card flex flex-col gap-1.5 p-5">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span
        className={
          emphasized
            ? "text-foreground text-2xl font-semibold tabular-nums"
            : "text-foreground text-2xl font-medium tabular-nums"
        }
      >
        {value}
      </span>
    </div>
  );
}
