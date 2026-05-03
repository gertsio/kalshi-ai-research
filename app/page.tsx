"use client";

import { useEffect, useState } from "react";

import { DemoStateBar } from "@/components/demo-state-bar";
import { ErrorPlaceholder } from "@/components/error-placeholder";
import { IdleView } from "@/components/idle-view";
import { LoadingView } from "@/components/loading-view";
import { ResearchMemo } from "@/components/research-memo";

import { demoWorkflowResponse } from "@/contracts/workflow/fixtures/demo-workflow-response";
import { useResearchMemo } from "@/features/research-memo/use-research-memo";

const HISTORY_BUSY_MARKER = "kalshiBusy";

export default function Page() {
  const { state, submit, reset, setDemoState } = useResearchMemo();
  const [showDemoBar, setShowDemoBar] = useState(false);

  useEffect(() => {
    setShowDemoBar(new URLSearchParams(window.location.search).get("demo") === "1");
  }, []);

  useEffect(() => {
    const onPop = () => reset();
    const onHome = () => {
      if (window.history.state?.[HISTORY_BUSY_MARKER]) {
        window.history.back();
      } else {
        reset();
      }
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("kalshi:home", onHome);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("kalshi:home", onHome);
    };
  }, [reset]);

  useEffect(() => {
    const hasBusyMarker = Boolean(window.history.state?.[HISTORY_BUSY_MARKER]);
    if (state.kind === "idle") {
      if (hasBusyMarker) window.history.back();
    } else if (!hasBusyMarker) {
      window.history.pushState({ [HISTORY_BUSY_MARKER]: true }, "", window.location.href);
    }
  }, [state.kind]);

  const view = renderView(state, {
    onSubmit: submit,
    onReset: reset,
    onLoadDemo: () => setDemoState({ kind: "success", response: demoWorkflowResponse }),
  });

  return (
    <>
      {showDemoBar ? <DemoStateBar current={state.kind} onSelect={setDemoState} /> : null}
      <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-12 sm:px-8 sm:py-16">{view}</div>
    </>
  );
}

interface Handlers {
  onSubmit: (marketInput: string) => void;
  onReset: () => void;
  onLoadDemo: () => void;
}

function renderView(
  state: ReturnType<typeof useResearchMemo>["state"],
  { onSubmit, onReset, onLoadDemo }: Handlers,
) {
  switch (state.kind) {
    case "idle":
      return <IdleView onSubmit={onSubmit} />;
    case "submitting":
      return <LoadingView marketInput={state.marketInput} />;
    case "success":
      return <ResearchMemo response={state.response} />;
    case "error":
      return (
        <ErrorPlaceholder
          reason={state.reason}
          marketInput={state.marketInput}
          onReset={onReset}
          onLoadDemo={onLoadDemo}
        />
      );
  }
}
