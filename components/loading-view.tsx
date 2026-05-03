import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AGENTS = [
  { role: "market_data", name: "Market Data Agent", note: "parsing ticker, snapshotting price" },
  { role: "settlement_rules", name: "Settlement Rules Agent", note: "auditing resolution criteria" },
  { role: "research", name: "Research Agent", note: "gathering recent evidence" },
  { role: "probability_estimator", name: "Probability Estimator", note: "bounding the estimate" },
  { role: "skeptic", name: "Skeptic Agent", note: "challenging the conclusion" },
  { role: "memo_editor", name: "Memo Editor", note: "drafting the typed memo" },
] as const;

interface Props {
  marketInput: string;
}

export function LoadingView({ marketInput }: Props) {
  return (
    <section aria-busy="true" aria-live="polite" className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="eyebrow">Workflow placeholder · status</p>
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
          Analyzing <span className="text-signal font-mono">{marketInput}</span>
          <span className="text-signal ml-1 inline-block animate-pulse">_</span>
        </h2>
        <p className="text-muted-foreground font-serif text-base">
          The live workflow is not wired in this scaffold — agent rows below are placeholders.
        </p>
      </div>

      <Card>
        <CardHeader className="border-rule border-b pb-4">
          <CardTitle className="eyebrow">Agent roll-call</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-0">
          {AGENTS.map((agent, index) => (
            <div
              key={agent.role}
              className="border-rule flex items-center gap-4 border-b py-3 last:border-b-0"
            >
              <span className="text-muted-foreground font-mono text-[0.7rem] tracking-[0.18em] tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-1 flex-col gap-1">
                <span className="font-display text-base">{agent.name}</span>
                <Skeleton className="bg-muted h-2 w-3/4 max-w-sm rounded-none" />
                <span className="text-muted-foreground font-mono text-xs italic">{agent.note}</span>
              </div>
              <span className="text-muted-foreground font-mono text-[0.65rem] tracking-[0.15em] uppercase">
                pending
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
