import { describe, expect, it } from "vitest";

import { demoWorkflowResponse } from "@/contracts/workflow/fixtures/demo-workflow-response";
import { initialState, reducer, type State } from "@/features/research-memo/state";

describe("research-memo state machine", () => {
  it("starts in the idle state", () => {
    expect(initialState).toEqual({ kind: "idle" });
  });

  it("transitions idle -> submitting on a non-empty input", () => {
    const next = reducer({ kind: "idle" }, { type: "SUBMIT", marketInput: "  KX-DEMO  " });
    expect(next).toEqual({ kind: "submitting", marketInput: "KX-DEMO" });
  });

  it("rejects empty market input as an invalid_input error", () => {
    const next = reducer({ kind: "idle" }, { type: "SUBMIT", marketInput: "   " });
    expect(next).toEqual({ kind: "error", reason: "invalid_input" });
  });

  it("transitions submitting -> success only when a response arrives", () => {
    const submitting: State = { kind: "submitting", marketInput: "KX-DEMO" };
    const next = reducer(submitting, { type: "SUCCEED", response: demoWorkflowResponse });
    expect(next).toEqual({ kind: "success", response: demoWorkflowResponse });
  });

  it("ignores SUCCEED if not currently submitting", () => {
    const next = reducer({ kind: "idle" }, { type: "SUCCEED", response: demoWorkflowResponse });
    expect(next).toEqual({ kind: "idle" });
  });

  it("transitions submitting -> error on FAIL and preserves the input", () => {
    const next = reducer(
      { kind: "submitting", marketInput: "KX-DEMO" },
      { type: "FAIL", reason: "workflow_unavailable" },
    );
    expect(next).toEqual({
      kind: "error",
      reason: "workflow_unavailable",
      marketInput: "KX-DEMO",
    });
  });

  it("RESET returns to idle from any state", () => {
    expect(reducer({ kind: "error", reason: "timeout" }, { type: "RESET" })).toEqual({ kind: "idle" });
    expect(reducer({ kind: "success", response: demoWorkflowResponse }, { type: "RESET" })).toEqual({
      kind: "idle",
    });
  });

  it("DEMO_SET replaces the state — used by the demo controls", () => {
    const next = reducer(
      { kind: "idle" },
      {
        type: "DEMO_SET",
        state: { kind: "success", response: demoWorkflowResponse },
      },
    );
    expect(next).toEqual({ kind: "success", response: demoWorkflowResponse });
  });
});
