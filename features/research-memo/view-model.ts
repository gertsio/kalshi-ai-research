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
