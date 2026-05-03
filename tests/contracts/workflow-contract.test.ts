import { describe, expect, it } from "vitest";

import { demoWorkflowResponse } from "../../contracts/workflow/fixtures/demo-workflow-response.js";
import { validateWorkflowResponse } from "../../contracts/workflow/workflow-contract.js";

describe("workflow response contract", () => {
  it("accepts the complete demo fixture", () => {
    const result = validateWorkflowResponse(demoWorkflowResponse);

    expect(result.success).toBe(true);
  });

  it("rejects missing required fields", () => {
    const { disclaimer: _disclaimer, ...withoutDisclaimer } = demoWorkflowResponse;

    const result = validateWorkflowResponse(withoutDisclaimer);

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.join(".") === "disclaimer")).toBe(true);
  });

  it("rejects probabilities outside 0 to 1", () => {
    const result = validateWorkflowResponse({
      ...demoWorkflowResponse,
      agentEstimate: {
        ...demoWorkflowResponse.agentEstimate,
        probability: 1.2,
      },
      delta: {
        probabilityPoints: 0.78,
        direction: "agent_higher",
      },
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.join(".") === "agentEstimate.probability")).toBe(true);
  });

  it("rejects invalid enum values", () => {
    const result = validateWorkflowResponse({
      ...demoWorkflowResponse,
      agentEstimate: {
        ...demoWorkflowResponse.agentEstimate,
        confidence: "certain",
      },
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.join(".") === "agentEstimate.confidence")).toBe(true);
  });

  it("requires a disclaimer that separates research from trading advice", () => {
    const result = validateWorkflowResponse({
      ...demoWorkflowResponse,
      disclaimer: "Informational output.",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.join(".") === "disclaimer")).toBe(true);
  });

  it("requires all six named agent trace roles", () => {
    const result = validateWorkflowResponse({
      ...demoWorkflowResponse,
      agentTrace: demoWorkflowResponse.agentTrace.filter((entry) => entry.role !== "skeptic"),
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.message.includes("skeptic"))).toBe(true);
  });

  it("rejects deltas that do not match agent estimate minus Kalshi probability", () => {
    const result = validateWorkflowResponse({
      ...demoWorkflowResponse,
      delta: {
        probabilityPoints: 0.01,
        direction: "agent_higher",
      },
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.join(".") === "delta.probabilityPoints")).toBe(true);
  });
});
