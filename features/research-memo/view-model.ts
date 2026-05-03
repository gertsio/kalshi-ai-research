import type { WorkflowResponse } from "@/contracts/workflow/workflow-contract";

/** Format a 0..1 probability as an integer percent — "42%". */
export function formatProbability(p: number): string {
  return `${Math.round(p * 100)}%`;
}

/** Format a signed delta in probability points — "+13pp", "-4pp", "0pp". */
export function formatDeltaPoints(delta: number): string {
  const points = Math.round(delta * 100);
  if (points === 0) return "0pp";
  const sign = points > 0 ? "+" : "";
  return `${sign}${points}pp`;
}

export const directionLabel: Record<WorkflowResponse["delta"]["direction"], string> = {
  agent_higher: "Agent higher",
  agent_lower: "Agent lower",
  in_line: "In line with market",
};

export const directionGlyph: Record<WorkflowResponse["delta"]["direction"], string> = {
  agent_higher: "↑",
  agent_lower: "↓",
  in_line: "→",
};

export const severityRank: Record<"low" | "medium" | "high", number> = {
  low: 1,
  medium: 2,
  high: 3,
};

export const warningKindLabel: Record<"liquidity" | "staleness" | "data_quality", string> = {
  liquidity: "Liquidity",
  staleness: "Staleness",
  data_quality: "Data quality",
};

export const traceStatusLabel: Record<"completed" | "skipped" | "failed", string> = {
  completed: "Completed",
  skipped: "Skipped",
  failed: "Failed",
};

export function formatAnalyzedAt(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

/** Lightweight headline extraction for the success placeholder. The full
 * memo render belongs to a follow-up issue. */
export interface HeadlineViewModel {
  ticker: string;
  title: string;
  kalshiProbability: string;
  agentProbability: string;
  delta: string;
  direction: WorkflowResponse["delta"]["direction"];
  confidence: WorkflowResponse["agentEstimate"]["confidence"];
  thesis: string;
}

export function toHeadlineViewModel(response: WorkflowResponse): HeadlineViewModel {
  return {
    ticker: response.market.ticker,
    title: response.market.title,
    kalshiProbability: formatProbability(response.kalshi.impliedProbability),
    agentProbability: formatProbability(response.agentEstimate.probability),
    delta: formatDeltaPoints(response.delta.probabilityPoints),
    direction: response.delta.direction,
    confidence: response.agentEstimate.confidence,
    thesis: response.agentEstimate.thesis,
  };
}
