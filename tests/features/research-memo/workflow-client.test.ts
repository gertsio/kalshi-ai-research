import { afterEach, describe, expect, it, vi } from "vitest";

import { demoWorkflowResponse } from "@/contracts/workflow/fixtures/demo-workflow-response";
import { runWorkflow } from "@/features/research-memo/workflow-client";

const originalEndpoint = process.env.NEXT_PUBLIC_WORKFLOW_ENDPOINT;

describe("workflow client", () => {
  afterEach(() => {
    process.env.NEXT_PUBLIC_WORKFLOW_ENDPOINT = originalEndpoint;
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("calls the configured workflow endpoint and validates a successful response", async () => {
    process.env.NEXT_PUBLIC_WORKFLOW_ENDPOINT = "https://workflow.example.test/analyze";
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => demoWorkflowResponse });
    vi.stubGlobal("fetch", fetchMock);

    const result = await runWorkflow({ marketInput: "KXEXAMPLE-26MAY03-DEMO" });

    expect(result).toEqual({ ok: true, response: demoWorkflowResponse });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://workflow.example.test/analyze",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("surfaces malformed workflow responses before rendering", async () => {
    process.env.NEXT_PUBLIC_WORKFLOW_ENDPOINT = "https://workflow.example.test/analyze";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ schemaVersion: "1.0" }) }),
    );

    await expect(runWorkflow({ marketInput: "KXEXAMPLE-26MAY03-DEMO" })).resolves.toEqual({
      ok: false,
      failure: { reason: "malformed_response" },
    });
  });

  it("maps unparsable successful responses to malformed workflow responses", async () => {
    process.env.NEXT_PUBLIC_WORKFLOW_ENDPOINT = "https://workflow.example.test/analyze";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => Promise.reject(new SyntaxError("bad json")) }),
    );

    await expect(runWorkflow({ marketInput: "KXEXAMPLE-26MAY03-DEMO" })).resolves.toEqual({
      ok: false,
      failure: { reason: "malformed_response" },
    });
  });

  it("keeps demo fixture fallback explicit", async () => {
    process.env.NEXT_PUBLIC_WORKFLOW_ENDPOINT = undefined;

    await expect(runWorkflow({ marketInput: "KXEXAMPLE-26MAY03-DEMO", demoMode: true })).resolves.toEqual({
      ok: true,
      response: demoWorkflowResponse,
    });
  });
});
