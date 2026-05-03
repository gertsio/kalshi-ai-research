import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ResearchMemo } from "@/components/research-memo";
import { demoWorkflowResponse } from "@/contracts/workflow/fixtures/demo-workflow-response";
import type { WorkflowResponse } from "@/contracts/workflow/workflow-contract";

describe("ResearchMemo — required user-visible sections", () => {
  it("renders the market headline and ticker", () => {
    render(<ResearchMemo response={demoWorkflowResponse} />);
    expect(
      screen.getByRole("heading", { level: 1, name: demoWorkflowResponse.market.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(demoWorkflowResponse.market.ticker)).toBeInTheDocument();
  });

  it("renders Kalshi implied probability, agent estimate, and signed delta", () => {
    render(<ResearchMemo response={demoWorkflowResponse} />);
    const block = screen.getByTestId("probability-comparison");
    expect(within(block).getByText("42%")).toBeInTheDocument();
    expect(within(block).getByText("55%")).toBeInTheDocument();
    expect(within(block).getByText(/\+13pp/)).toBeInTheDocument();
    expect(within(block).getByText(/Agent higher/i)).toBeInTheDocument();
  });

  it("renders confidence and the thesis", () => {
    render(<ResearchMemo response={demoWorkflowResponse} />);
    const thesis = screen.getByTestId("thesis");
    expect(within(thesis).getByText(/medium/i)).toBeInTheDocument();
    expect(within(thesis).getByText(demoWorkflowResponse.agentEstimate.thesis)).toBeInTheDocument();
    for (const assumption of demoWorkflowResponse.agentEstimate.assumptions) {
      expect(within(thesis).getByText(assumption)).toBeInTheDocument();
    }
  });

  it("renders every evidence claim and source", () => {
    render(<ResearchMemo response={demoWorkflowResponse} />);
    const block = screen.getByTestId("evidence");
    for (const item of demoWorkflowResponse.evidence) {
      expect(within(block).getByText(item.claim)).toBeInTheDocument();
      expect(within(block).getByText(new RegExp(item.sourceTitle))).toBeInTheDocument();
    }
  });

  it("renders every counterargument", () => {
    render(<ResearchMemo response={demoWorkflowResponse} />);
    const block = screen.getByTestId("counterarguments");
    for (const arg of demoWorkflowResponse.counterarguments) {
      expect(within(block).getByText(arg)).toBeInTheDocument();
    }
  });

  it("renders settlement risks and liquidity/staleness warnings", () => {
    render(<ResearchMemo response={demoWorkflowResponse} />);
    const risks = screen.getByTestId("settlement-risks");
    for (const risk of demoWorkflowResponse.settlementRisks) {
      expect(within(risks).getByText(risk.risk)).toBeInTheDocument();
    }
    const warnings = screen.getByTestId("warnings");
    for (const warning of demoWorkflowResponse.warnings) {
      expect(within(warnings).getByText(warning.message)).toBeInTheDocument();
    }
    expect(within(warnings).getAllByText(/Liquidity/i).length).toBeGreaterThan(0);
    expect(within(warnings).getAllByText(/Staleness/i).length).toBeGreaterThan(0);
  });

  it("renders 'what would change the estimate'", () => {
    render(<ResearchMemo response={demoWorkflowResponse} />);
    const block = screen.getByTestId("what-would-change");
    for (const item of demoWorkflowResponse.whatWouldChange) {
      expect(within(block).getByText(item)).toBeInTheDocument();
    }
  });

  it("renders the agent trace with every role's display name", () => {
    render(<ResearchMemo response={demoWorkflowResponse} />);
    const block = screen.getByTestId("agent-trace");
    for (const entry of demoWorkflowResponse.agentTrace) {
      expect(within(block).getByText(entry.displayName)).toBeInTheDocument();
      expect(within(block).getByText(entry.summary)).toBeInTheDocument();
    }
  });

  it("renders the final memo as sanitized markdown — heading and prose, not raw markdown", () => {
    render(<ResearchMemo response={demoWorkflowResponse} />);
    const memo = screen.getByTestId("final-memo");
    // The fixture markdown contains "## Research Memo" — the renderer turns it into a heading
    expect(within(memo).getByRole("heading", { level: 2, name: /Research Memo/i })).toBeInTheDocument();
    // Raw "##" must not leak through to the rendered output
    expect(memo.textContent ?? "").not.toMatch(/##\s/);
  });

  it("renders the research-only disclaimer inside the memo", () => {
    render(<ResearchMemo response={demoWorkflowResponse} />);
    const block = screen.getByTestId("memo-disclaimer");
    expect(within(block).getByText(demoWorkflowResponse.disclaimer)).toBeInTheDocument();
  });
});

describe("ResearchMemo — raw JSON developer toggle", () => {
  it("hides raw JSON by default and exposes it behind a toggle", async () => {
    const user = userEvent.setup();
    render(<ResearchMemo response={demoWorkflowResponse} />);

    // No JSON payload visible by default
    expect(document.getElementById("raw-json-payload")).toBeNull();

    const toggle = screen.getByRole("button", { name: /show .*workflow response/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    const payload = document.getElementById("raw-json-payload");
    expect(payload).not.toBeNull();
    expect(payload?.textContent ?? "").toContain(demoWorkflowResponse.market.ticker);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await user.click(toggle);
    expect(document.getElementById("raw-json-payload")).toBeNull();
  });

  it("does not show the toggle when developer inspection is disabled", () => {
    const response: WorkflowResponse = {
      ...demoWorkflowResponse,
      developer: { rawJsonInspectionEnabled: false, rawJsonLabel: "n/a" },
    };
    render(<ResearchMemo response={response} />);
    expect(screen.queryByTestId("raw-json")).toBeNull();
  });
});

describe("ResearchMemo — markdown sanitization", () => {
  it("does not render raw HTML embedded in the memo markdown", () => {
    const response: WorkflowResponse = {
      ...demoWorkflowResponse,
      finalMemoMarkdown:
        "## Research Memo\n\n<script>window.__pwned=true</script>\n\nSafe paragraph with **bold** text.",
    };
    render(<ResearchMemo response={response} />);
    const memo = screen.getByTestId("final-memo");

    // The raw <script> tag string is rendered as text, not as a DOM element
    expect(memo.querySelector("script")).toBeNull();
    expect(within(memo).getByText(/<script>/)).toBeInTheDocument();

    // Bold inline still renders semantically
    expect(within(memo).getByText("bold").tagName.toLowerCase()).toBe("strong");
  });
});
