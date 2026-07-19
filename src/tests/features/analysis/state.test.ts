import { describe, expect, it } from "vitest";

import { demoWorkflowResponse } from "@/contracts/workflow/fixtures/demo-workflow-response";
import type { AnalysisEvent } from "@/contracts/workflow/analysis-events";
import { parseWorkflowResponse } from "@/contracts/workflow/workflow-contract";
import { type AnalysisState, initialState, reducer } from "@/features/analysis/state";

function run(state: AnalysisState, events: AnalysisEvent[]): AnalysisState {
  return events.reduce((current, event) => reducer(current, { type: "EVENT", event }), state);
}

const started = reducer(initialState, { type: "START", eventInput: "KXEXAMPLE-26MAY03-DEMO" });

describe("analysis stream reducer", () => {
  it("starts a streaming pass with all six stages pending", () => {
    expect(started.phase).toBe("streaming");
    expect(started.stages).toHaveLength(6);
    expect(started.stages.every((stage) => stage.status === "pending")).toBe(true);
  });

  it("advances stages through running to completed", () => {
    const state = run(started, [
      {
        type: "stage_started",
        stage: "market_data",
        displayName: "Market Data Agent",
        headline: "Resolving the event and its market context",
      },
    ]);
    expect(state.stages[0]?.status).toBe("running");

    const completed = run(state, [
      {
        type: "stage_completed",
        stage: "market_data",
        summary: "Captured market context.",
        status: "completed",
      },
    ]);
    expect(completed.stages[0]?.status).toBe("completed");
    expect(completed.stages[0]?.summary).toBe("Captured market context.");
  });

  it("accumulates findings in arrival order and tracks the latest estimate", () => {
    const state = run(started, [
      {
        type: "source_found",
        sourceTitle: "Official Statistics Preview",
        sourceUrl: "https://example.com/statistics-preview",
        relevance: "high",
      },
      {
        type: "settlement_risk_found",
        risk: { risk: "Wording may differ from the official threshold.", severity: "medium" },
      },
      {
        type: "warning_raised",
        warning: { kind: "liquidity", message: "Thin orderbook.", severity: "medium" },
      },
      { type: "estimate_updated", probability: 0.42, basis: "market_prior" },
      { type: "estimate_updated", probability: 0.55, confidence: "medium", basis: "research_draft" },
    ]);

    expect(state.findings.map((finding) => finding.kind)).toEqual(["source", "risk", "warning"]);
    expect(state.estimate?.probability).toBe(0.55);
    expect(state.estimate?.basis).toBe("research_draft");
  });

  it("completes with a validated final response", () => {
    const response = parseWorkflowResponse(demoWorkflowResponse);
    const state = run(started, [{ type: "final", response }]);

    expect(state.phase).toBe("complete");
    expect(state.response?.market.ticker).toBe(response.market.ticker);
  });

  it("fails with the typed error payload", () => {
    const state = run(started, [
      { type: "error", code: "model_failure", message: "Gemini scoring failed.", statusCode: 502 },
    ]);

    expect(state.phase).toBe("failed");
    expect(state.error).toEqual({ code: "model_failure", message: "Gemini scoring failed." });
  });

  it("treats a transport drop mid-stream as a failure", () => {
    const state = reducer(started, { type: "TRANSPORT_ERROR" });
    expect(state.phase).toBe("failed");
    expect(state.error?.code).toBe("stream_disconnected");
  });

  it("ignores transport drops after completion", () => {
    const response = parseWorkflowResponse(demoWorkflowResponse);
    const completed = run(started, [{ type: "final", response }]);
    expect(reducer(completed, { type: "TRANSPORT_ERROR" }).phase).toBe("complete");
  });
});
