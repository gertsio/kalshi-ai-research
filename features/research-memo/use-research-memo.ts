"use client";

import { useCallback, useReducer, useRef } from "react";

import type { WorkflowResponse } from "@/contracts/workflow/workflow-contract";

import { normalizeMarketInput } from "./market-input-normalization";
import { type Action, type ErrorReason, type State, initialState, reducer } from "./state";
import { runWorkflow } from "./workflow-client";

export interface ResearchMemoController {
  state: State;
  submit: (marketInput: string, options?: { demoMode?: boolean }) => void;
  succeed: (response: WorkflowResponse) => void;
  fail: (reason: ErrorReason) => void;
  reset: () => void;
  setDemoState: (state: State) => void;
}

export function useResearchMemo(initial: State = initialState): ResearchMemoController {
  const [state, dispatch] = useReducer(reducer, initial);
  const requestIdRef = useRef(0);

  const submit = useCallback((marketInput: string, options?: { demoMode?: boolean }) => {
    const normalized = normalizeMarketInput(marketInput);
    if (normalized === null) {
      dispatch({ type: "FAIL", reason: "invalid_input" });
      return;
    }

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    dispatch({ type: "SUBMIT", input: normalized });

    void runWorkflow({
      marketInput: normalized.marketInput,
      ...(options?.demoMode === undefined ? {} : { demoMode: options.demoMode }),
    })
      .then((result) => {
        if (requestId !== requestIdRef.current) return;
        if (result.ok) {
          dispatch({ type: "SUCCEED", response: result.response });
        } else {
          dispatch({ type: "FAIL", reason: result.failure.reason });
        }
      })
      .catch(() => {
        if (requestId !== requestIdRef.current) return;
        dispatch({ type: "FAIL", reason: "workflow_unavailable" });
      });
  }, []);

  const succeed = useCallback((response: WorkflowResponse) => {
    dispatch({ type: "SUCCEED", response });
  }, []);

  const fail = useCallback((reason: ErrorReason) => {
    dispatch({ type: "FAIL", reason });
  }, []);

  const reset = useCallback(() => {
    requestIdRef.current += 1;
    dispatch({ type: "RESET" });
  }, []);

  const setDemoState = useCallback((next: State) => {
    dispatch({ type: "DEMO_SET", state: next } satisfies Action);
  }, []);

  return { state, submit, succeed, fail, reset, setDemoState };
}
