import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { DisclaimerStrip, DISCLAIMER_TEXT } from "@/components/disclaimer-strip";
import { ErrorPlaceholder } from "@/components/error-placeholder";
import { IdleView } from "@/components/idle-view";
import { LoadingView } from "@/components/loading-view";
import { ResearchMemo } from "@/components/research-memo";

import { demoWorkflowResponse } from "@/contracts/workflow/fixtures/demo-workflow-response";

/** Verbs that imply a trade recommendation. The disclaimer is intentionally allowed
 * to mention these as the things the product does *not* do, so this assertion runs
 * against each non-disclaimer view's own subtree only. */
const ADVICE_VERBS = /\b(buy|sell|place a trade|place this trade|invest now)\b/i;

describe("research-only safety language", () => {
  it("disclaimer is rendered with the canonical text", () => {
    render(<DisclaimerStrip />);
    expect(screen.getByText(DISCLAIMER_TEXT)).toBeInTheDocument();
  });

  it("idle view does not contain advice verbs", () => {
    const { container } = render(<IdleView onSubmit={() => undefined} />);
    expect(container.textContent ?? "").not.toMatch(ADVICE_VERBS);
  });

  it("loading view does not contain advice verbs", () => {
    const { container } = render(<LoadingView marketInput="KX-DEMO" />);
    expect(container.textContent ?? "").not.toMatch(ADVICE_VERBS);
  });

  it("research memo does not contain advice verbs outside the disclaimer", () => {
    const { container } = render(<ResearchMemo response={demoWorkflowResponse} />);
    const disclaimer = container.querySelector('[data-testid="memo-disclaimer"]');
    disclaimer?.remove();
    expect(container.textContent ?? "").not.toMatch(ADVICE_VERBS);
  });

  it("error placeholder does not contain advice verbs", () => {
    const { container } = render(
      <ErrorPlaceholder
        reason="workflow_unavailable"
        onReset={() => undefined}
        onLoadDemo={() => undefined}
      />,
    );
    expect(container.textContent ?? "").not.toMatch(ADVICE_VERBS);
  });
});
