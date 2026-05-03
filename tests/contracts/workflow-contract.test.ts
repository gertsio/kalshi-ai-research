import { describe, expect, it } from "vitest";

import { demoWorkflowResponse } from "../../contracts/workflow/fixtures/demo-workflow-response.js";
import { validateWorkflowResponse, workflowRequestSchema } from "../../contracts/workflow/workflow-contract.js";

describe("workflow request contract", () => {
  it("accepts a market ticker request", () => {
    const result = workflowRequestSchema.safeParse({
      marketInput: "KXEXAMPLE-26MAY03-DEMO",
      requestedAt: "2026-05-03T12:00:00.000Z",
      demoMode: true,
    });

    expect(result.success).toBe(true);
  });

  it("rejects missing market input", () => {
    const result = workflowRequestSchema.safeParse({ demoMode: true });

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.join(".") === "marketInput")).toBe(true);
  });

  it("rejects blank market input", () => {
    const result = workflowRequestSchema.safeParse({ marketInput: "   " });

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.join(".") === "marketInput")).toBe(true);
  });

  it("rejects invalid request timestamps", () => {
    const result = workflowRequestSchema.safeParse({
      marketInput: "KXEXAMPLE-26MAY03-DEMO",
      requestedAt: "today",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.join(".") === "requestedAt")).toBe(true);
  });
});

describe("workflow response contract", () => {
  it("accepts the complete demo fixture", () => {
    const result = validateWorkflowResponse(demoWorkflowResponse);

    expect(result.success).toBe(true);
  });

  it("includes frontend-critical staleness and raw JSON inspection fields", () => {
    expect(demoWorkflowResponse.warnings.some((warning) => warning.kind === "staleness")).toBe(true);
    expect(demoWorkflowResponse.developer.rawJsonInspectionEnabled).toBe(true);
    expect(demoWorkflowResponse.developer.rawJsonLabel).toBe("Validated workflow response JSON");
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

  it("rejects weak research-only disclaimers that do not reject advice and recommendations", () => {
    const result = validateWorkflowResponse({
      ...demoWorkflowResponse,
      disclaimer: "Research output only.",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.join(".") === "disclaimer")).toBe(true);
  });

  it("rejects direct recommendation phrasing in workflow-authored output", () => {
    const result = validateWorkflowResponse({
      ...demoWorkflowResponse,
      finalMemoMarkdown: "## Research Memo\n\nYou should buy this market now.",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.join(".") === "finalMemoMarkdown")).toBe(true);
  });

  it("rejects direct recommendation phrasing with recommend wording", () => {
    const result = validateWorkflowResponse({
      ...demoWorkflowResponse,
      finalMemoMarkdown: "## Research Memo\n\nWe recommend sell based on this evidence.",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.join(".") === "finalMemoMarkdown")).toBe(true);
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
