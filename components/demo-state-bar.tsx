"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { demoWorkflowResponse } from "@/contracts/workflow/fixtures/demo-workflow-response";
import type { State } from "@/features/research-memo/state";

type DemoKind = State["kind"];

interface Props {
  current: DemoKind;
  onSelect: (state: State) => void;
}

const options: ReadonlyArray<{ kind: DemoKind; label: string }> = [
  { kind: "idle", label: "Idle" },
  { kind: "submitting", label: "Loading" },
  { kind: "success", label: "Success" },
  { kind: "error", label: "Error" },
];

export function DemoStateBar({ current, onSelect }: Props) {
  return (
    <div role="toolbar" aria-label="Demo state controls" className="border-border bg-muted border-b">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-3 px-6 py-2 sm:px-8">
        <span className="text-muted-foreground text-xs">Demo states</span>
        <div className="flex flex-wrap items-center gap-1">
          {options.map(({ kind, label }) => (
            <Button
              key={kind}
              variant={current === kind ? "secondary" : "ghost"}
              size="sm"
              className={cn("h-7 text-xs", current === kind && "text-foreground")}
              onClick={() => onSelect(stateFor(kind))}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

function stateFor(kind: DemoKind): State {
  switch (kind) {
    case "idle":
      return { kind: "idle" };
    case "submitting":
      return { kind: "submitting", marketInput: demoWorkflowResponse.market.ticker };
    case "success":
      return { kind: "success", response: demoWorkflowResponse };
    case "error":
      return { kind: "error", reason: "workflow_unavailable" };
  }
}
