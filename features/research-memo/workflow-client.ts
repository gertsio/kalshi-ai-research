import { demoWorkflowResponse } from "@/contracts/workflow/fixtures/demo-workflow-response";
import {
  validateWorkflowResponse,
  workflowRequestSchema,
  type WorkflowResponse,
} from "@/contracts/workflow/workflow-contract";

import type { ErrorReason } from "./state";

export interface RunWorkflowOptions {
  marketInput: string;
  demoMode?: boolean;
  timeoutMs?: number;
}

export interface WorkflowFailure {
  reason: ErrorReason;
}

export type WorkflowResult =
  | { ok: true; response: WorkflowResponse }
  | { ok: false; failure: WorkflowFailure };

const DEFAULT_TIMEOUT_MS = 60_000;

export async function runWorkflow({
  marketInput,
  demoMode = false,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}: RunWorkflowOptions): Promise<WorkflowResult> {
  const request = workflowRequestSchema.safeParse({
    marketInput,
    requestedAt: new Date().toISOString(),
    demoMode,
  });

  if (!request.success) return { ok: false, failure: { reason: "invalid_input" } };
  if (demoMode) return { ok: true, response: demoWorkflowResponse };

  const endpoint = process.env.NEXT_PUBLIC_WORKFLOW_ENDPOINT;
  if (endpoint === undefined || endpoint.trim().length === 0) {
    return { ok: false, failure: { reason: "workflow_unavailable" } };
  }

  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(request.data),
      signal: controller.signal,
    });

    if (!response.ok) return { ok: false, failure: { reason: await mapHttpFailure(response) } };

    const payload = await readSuccessPayload(response);
    if (!payload.ok) return { ok: false, failure: { reason: "malformed_response" } };

    const parsed = validateWorkflowResponse(payload.value);
    if (!parsed.success) return { ok: false, failure: { reason: "malformed_response" } };

    return { ok: true, response: parsed.data };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { ok: false, failure: { reason: "timeout" } };
    }
    return { ok: false, failure: { reason: "workflow_unavailable" } };
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

async function readSuccessPayload(response: Response): Promise<{ ok: true; value: unknown } | { ok: false }> {
  try {
    return { ok: true, value: await response.json() };
  } catch {
    return { ok: false };
  }
}

async function mapHttpFailure(response: Response): Promise<ErrorReason> {
  const code = await readErrorCode(response);
  if (code === "invalid_input") return "invalid_input";
  if (code === "market_data_unavailable") return "market_data_unavailable";
  if (code === "search_failure") return "search_failure";
  if (code === "model_failure") return "model_failure";
  if (code === "malformed_workflow_output") return "malformed_response";

  if (response.status === 400 || response.status === 422) return "invalid_input";
  if (response.status === 502) return "malformed_response";
  if (response.status === 408 || response.status === 504) return "timeout";
  return "workflow_unavailable";
}

async function readErrorCode(response: Response): Promise<string | null> {
  try {
    const payload: unknown = await response.json();
    if (payload !== null && typeof payload === "object" && "code" in payload) {
      const code = payload.code;
      return typeof code === "string" ? code : null;
    }
  } catch {
    return null;
  }
  return null;
}
