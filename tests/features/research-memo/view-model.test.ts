import { describe, expect, it } from "vitest";

import { demoWorkflowResponse } from "@/contracts/workflow/fixtures/demo-workflow-response";
import {
  formatDeltaPoints,
  formatProbability,
  toHeadlineViewModel,
} from "@/features/research-memo/view-model";

describe("view-model formatters", () => {
  it("formats probabilities as integer percent", () => {
    expect(formatProbability(0.42)).toBe("42%");
    expect(formatProbability(0)).toBe("0%");
    expect(formatProbability(1)).toBe("100%");
  });

  it("formats deltas with explicit sign and pp suffix", () => {
    expect(formatDeltaPoints(0.13)).toBe("+13pp");
    expect(formatDeltaPoints(-0.04)).toBe("-4pp");
    expect(formatDeltaPoints(0)).toBe("0pp");
  });
});

describe("toHeadlineViewModel", () => {
  it("derives the headline fields from the validated demo fixture", () => {
    const headline = toHeadlineViewModel(demoWorkflowResponse);
    expect(headline.ticker).toBe("KXEXAMPLE-26MAY03-DEMO");
    expect(headline.kalshiProbability).toBe("42%");
    expect(headline.agentProbability).toBe("55%");
    expect(headline.delta).toBe("+13pp");
    expect(headline.direction).toBe("agent_higher");
    expect(headline.confidence).toBe("medium");
  });
});
