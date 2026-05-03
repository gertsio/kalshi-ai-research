import { Card, CardContent } from "@/components/ui/card";

const AGENTS = [
  { role: "market_data", name: "Market Data", note: "Parsing ticker, snapshotting price" },
  { role: "settlement_rules", name: "Settlement Rules", note: "Auditing resolution criteria" },
  { role: "research", name: "Research", note: "Gathering recent evidence" },
  { role: "probability_estimator", name: "Probability Estimator", note: "Bounding the estimate" },
  { role: "skeptic", name: "Skeptic", note: "Challenging the conclusion" },
  { role: "memo_editor", name: "Memo Editor", note: "Drafting the memo" },
] as const;

interface Props {
  marketInput: string;
}

export function LoadingView({ marketInput }: Props) {
  return (
    <section aria-busy="true" aria-live="polite" className="mx-auto flex max-w-2xl flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-foreground text-2xl font-semibold tracking-tight">Researching {marketInput}</h2>
        <p className="text-muted-foreground text-sm">
          Six agents are reading the market and gathering evidence.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-0 p-0">
          {AGENTS.map((agent) => (
            <div
              key={agent.role}
              className="border-border flex items-center gap-3 border-b px-4 py-3 last:border-b-0"
            >
              <span aria-hidden className="bg-primary size-2 shrink-0 animate-pulse rounded-full" />
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-foreground text-sm font-medium">{agent.name}</span>
                <span className="text-muted-foreground text-xs">{agent.note}</span>
              </div>
              <span className="text-muted-foreground text-xs">Working</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
