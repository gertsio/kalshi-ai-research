import type { WorkflowResponse } from "../workflow-contract.js";

export const demoWorkflowResponse: WorkflowResponse = {
  schemaVersion: "1.0",
  analyzedAt: "2026-05-03T12:00:00.000Z",
  market: {
    ticker: "KXEXAMPLE-26MAY03-DEMO",
    title: "Will the example economic release exceed expectations?",
    subtitle: "Demo-only market used to exercise the workflow response contract.",
    url: "https://kalshi.com/markets/KXEXAMPLE-26MAY03-DEMO",
    status: "open",
    closeTime: "2026-05-03T20:00:00.000Z",
    settlementSource: "Official agency release named in the market rules.",
  },
  kalshi: {
    impliedProbability: 0.42,
    yesBid: 0.4,
    yesAsk: 0.44,
    spread: 0.04,
    volume: 125000,
    openInterest: 3180,
    lastUpdatedAt: "2026-05-03T11:57:00.000Z",
  },
  agentEstimate: {
    probability: 0.55,
    confidence: "medium",
    thesis: "Recent indicators modestly favor the event resolving yes, but the signal is not strong enough for high confidence.",
    assumptions: [
      "The official release schedule does not change before market close.",
      "The latest comparable indicators remain directionally predictive for this event.",
    ],
  },
  delta: {
    probabilityPoints: 0.13,
    direction: "agent_higher",
  },
  evidence: [
    {
      claim: "Recent comparable data points have moved above consensus expectations.",
      sourceTitle: "Official Statistics Preview",
      sourceUrl: "https://example.com/statistics-preview",
      relevance: "high",
    },
    {
      claim: "A secondary nowcast model points in the same direction with wider uncertainty.",
      sourceTitle: "Independent Nowcast Summary",
      sourceUrl: "https://example.com/nowcast-summary",
      relevance: "medium",
    },
  ],
  counterarguments: [
    "The market may already incorporate the latest preview data.",
    "A late methodology note could change how the release maps to settlement wording.",
  ],
  settlementRisks: [
    {
      risk: "The intuitive event wording may differ from the exact threshold used by the official settlement source.",
      severity: "medium",
    },
  ],
  warnings: [
    {
      kind: "liquidity",
      message: "The spread is narrow enough for a demo but should still be shown as market context, not advice.",
      severity: "low",
    },
    {
      kind: "staleness",
      message: "The market snapshot is three minutes old and should be refreshed before live analysis.",
      severity: "low",
    },
  ],
  whatWouldChange: [
    "A materially different prerelease survey would lower the estimate.",
    "A clarification to settlement wording could raise or lower confidence.",
  ],
  agentTrace: [
    {
      role: "market_data",
      displayName: "Market Data Agent",
      summary: "Parsed the ticker, captured current price context, and summarized liquidity.",
      status: "completed",
    },
    {
      role: "settlement_rules",
      displayName: "Settlement Rules Agent",
      summary: "Checked the market title, close time, settlement source, and wording risks.",
      status: "completed",
    },
    {
      role: "research",
      displayName: "Research Agent",
      summary: "Collected recent evidence relevant to the market's exact resolution criteria.",
      status: "completed",
    },
    {
      role: "probability_estimator",
      displayName: "Probability Estimator Agent",
      summary: "Converted evidence and assumptions into a bounded probability estimate.",
      status: "completed",
    },
    {
      role: "skeptic",
      displayName: "Skeptic Agent",
      summary: "Challenged the estimate with market-efficiency, settlement, and data-quality concerns.",
      status: "completed",
    },
    {
      role: "memo_editor",
      displayName: "Memo Editor Agent",
      summary: "Merged agent outputs into the final workflow response contract.",
      status: "completed",
    },
  ],
  finalMemoMarkdown:
    "## Research Memo\n\nThe agent estimate is 55% versus Kalshi's 42% implied probability. The gap is driven by recent comparable indicators, but confidence remains medium because settlement wording and late data revisions could change the analysis.",
  developer: {
    rawJsonInspectionEnabled: true,
    rawJsonLabel: "Validated workflow response JSON",
  },
  disclaimer:
    "This is research-only analysis, not financial advice or trading advice, and not a recommendation or order instruction.",
};
