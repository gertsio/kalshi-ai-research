"use client";

import { useEffect, useState } from "react";

import { DemoStateBar } from "@/components/demo-state-bar";
import { ErrorPlaceholder } from "@/components/error-placeholder";
import { IdleView } from "@/components/idle-view";
import { LoadingView } from "@/components/loading-view";
import { SuccessPlaceholder } from "@/components/success-placeholder";

import { demoWorkflowResponse } from "@/contracts/workflow/fixtures/demo-workflow-response";
import { useResearchMemo } from "@/features/research-memo/use-research-memo";

export default function Page() {
  const { state, submit, reset, setDemoState } = useResearchMemo();
  const [showDemoBar, setShowDemoBar] = useState(false);

  useEffect(() => {
    setShowDemoBar(new URLSearchParams(window.location.search).get("demo") === "1");
  }, []);

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
      return <SuccessPlaceholder response={state.response} />;
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
