import type { WorkflowResponse } from "@/contracts/workflow/workflow-contract";

import type { NormalizedMarketInput } from "./market-input-normalization";

export type ErrorReason =
  | "invalid_input"
  | "workflow_unavailable"
  | "malformed_response"
  | "market_data_unavailable"
  | "search_failure"
  | "model_failure"
  | "timeout";

export const errorReasonCopy: Record<ErrorReason, { title: string; detail: string }> = {
  invalid_input: {
    title: "Market input was rejected",
    detail: "Provide a Kalshi ticker or market URL.",
  },
  workflow_unavailable: {
    title: "Workflow is unreachable",
    detail: "The agent workflow did not respond. Retry or load the demo fixture.",
  },
  malformed_response: {
    title: "Workflow response failed validation",
    detail: "The response did not match the contract. Retry or load the demo fixture.",
  },
  market_data_unavailable: {
    title: "Market data is unavailable",
    detail: "The workflow could not retrieve public Kalshi market data for this input.",
  },
  search_failure: {
    title: "Evidence search failed",
    detail: "The research agent could not gather external evidence for this run.",
  },
  model_failure: {
    title: "Model reasoning failed",
    detail: "The model-backed agent step failed before producing a validated memo.",
  },
  timeout: {
    title: "Workflow timed out",
    detail: "The agents did not complete in time. Retry or load the demo fixture.",
  },
};

export type State =
  | { kind: "idle" }
  | { kind: "submitting"; marketInput: string }
  | { kind: "success"; response: WorkflowResponse }
  | { kind: "error"; reason: ErrorReason; marketInput?: string };

export type Action =
  | { type: "SUBMIT"; input: NormalizedMarketInput }
  | { type: "SUCCEED"; response: WorkflowResponse }
  | { type: "FAIL"; reason: ErrorReason }
  | { type: "RESET" }
  | { type: "DEMO_SET"; state: State };

export const initialState: State = { kind: "idle" };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SUBMIT": {
      return { kind: "submitting", marketInput: action.input.marketInput };
    }
    case "SUCCEED": {
      if (state.kind !== "submitting") return state;
      return { kind: "success", response: action.response };
    }
    case "FAIL": {
      const marketInput = state.kind === "submitting" ? state.marketInput : undefined;
      return marketInput === undefined
        ? { kind: "error", reason: action.reason }
        : { kind: "error", reason: action.reason, marketInput };
    }
    case "RESET":
      return initialState;
    case "DEMO_SET":
      return action.state;
    default:
      return state;
  }
}
