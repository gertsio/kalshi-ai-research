import { analysisEventSchema, type AnalysisEvent } from "@/contracts/workflow/analysis-events";
import { apiBaseUrl } from "@/lib/config";

export interface StreamHandle {
  close: () => void;
}

export interface StreamCallbacks {
  onEvent: (event: AnalysisEvent) => void;
  onTransportError: () => void;
}

const TERMINAL_EVENTS = new Set(["final", "error"]);

/**
 * Opens the engine's SSE stream. Every payload is contract-validated before
 * it reaches the reducer; malformed frames surface as a transport error.
 */
export function openAnalysisStream(
  eventInput: string,
  { demoMode, callbacks }: { demoMode?: boolean; callbacks: StreamCallbacks },
): StreamHandle {
  const url = new URL("/analyze/stream", apiBaseUrl());
  url.searchParams.set("input", eventInput);
  if (demoMode !== undefined) url.searchParams.set("demo", String(demoMode));

  const source = new EventSource(url);
  let closed = false;

  const close = () => {
    if (closed) return;
    closed = true;
    source.close();
  };

  const handleMessage = (message: MessageEvent<string>) => {
    if (closed) return;
    let payload: unknown;
    try {
      payload = JSON.parse(message.data);
    } catch {
      close();
      callbacks.onTransportError();
      return;
    }
    const parsed = analysisEventSchema.safeParse(payload);
    if (!parsed.success) {
      close();
      callbacks.onTransportError();
      return;
    }
    if (TERMINAL_EVENTS.has(parsed.data.type)) close();
    callbacks.onEvent(parsed.data);
  };

  for (const eventType of analysisEventSchema.options.map((option) => option.shape.type.value)) {
    source.addEventListener(eventType, handleMessage as EventListener);
  }

  source.onerror = () => {
    if (closed) return;
    close();
    callbacks.onTransportError();
  };

  return { close };
}
