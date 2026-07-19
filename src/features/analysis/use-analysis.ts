import { useCallback, useEffect, useReducer, useRef } from "react";

import { normalizeMarketInput } from "./market-input-normalization";
import { type AnalysisState, initialState, reducer } from "./state";
import { openAnalysisStream, type StreamHandle } from "./stream-client";

/** Demo mode replays a fixture server-side; any non-empty input satisfies the stream contract. */
const DEMO_EVENT_INPUT = "KXEXAMPLE-26MAY03-DEMO";

export interface AnalysisController {
  state: AnalysisState;
  submit: (rawInput: string, options?: { demoMode?: boolean }) => boolean;
  reset: () => void;
}

export function useAnalysis(): AnalysisController {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleRef = useRef<StreamHandle | null>(null);

  useEffect(() => () => handleRef.current?.close(), []);

  const submit = useCallback((rawInput: string, options?: { demoMode?: boolean }) => {
    const demoMode = options?.demoMode;
    const normalized = normalizeMarketInput(rawInput);
    if (normalized === null && demoMode !== true) return false;

    const eventInput = normalized?.marketInput ?? (rawInput.trim() || DEMO_EVENT_INPUT);
    handleRef.current?.close();
    dispatch({ type: "START", eventInput });

    handleRef.current = openAnalysisStream(eventInput, {
      ...(demoMode === undefined ? {} : { demoMode }),
      callbacks: {
        onEvent: (event) => dispatch({ type: "EVENT", event }),
        onTransportError: () => dispatch({ type: "TRANSPORT_ERROR" }),
      },
    });
    return true;
  }, []);

  const reset = useCallback(() => {
    handleRef.current?.close();
    handleRef.current = null;
    dispatch({ type: "RESET" });
  }, []);

  return { state, submit, reset };
}
