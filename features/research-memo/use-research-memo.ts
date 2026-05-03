"use client";

import { useCallback, useReducer } from "react";

import type { WorkflowResponse } from "@/contracts/workflow/workflow-contract";

import { type Action, type ErrorReason, type State, initialState, reducer } from "./state";

export interface ResearchMemoController {
  state: State;
  submit: (marketInput: string) => void;
  succeed: (response: WorkflowResponse) => void;
  fail: (reason: ErrorReason) => void;
  reset: () => void;
  setDemoState: (state: State) => void;
}

export function useResearchMemo(initial: State = initialState): ResearchMemoController {
  const [state, dispatch] = useReducer(reducer, initial);

  const submit = useCallback((marketInput: string) => {
    dispatch({ type: "SUBMIT", marketInput });
  }, []);

  const succeed = useCallback((response: WorkflowResponse) => {
    dispatch({ type: "SUCCEED", response });
  }, []);

  const fail = useCallback((reason: ErrorReason) => {
    dispatch({ type: "FAIL", reason });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const setDemoState = useCallback((next: State) => {
    dispatch({ type: "DEMO_SET", state: next } satisfies Action);
  }, []);

  return { state, submit, succeed, fail, reset, setDemoState };
}
