import type { AnalysisEvent, EstimateUpdatedEvent, StageStatus } from "@/contracts/workflow/analysis-events";
import type {
  AgentRole,
  Evidence,
  KalshiSnapshot,
  Market,
  MarketWarning,
  SettlementRisk,
  WorkflowResponse,
} from "@/contracts/workflow/workflow-contract";

export type Phase = "idle" | "streaming" | "complete" | "failed";

export interface StageState {
  role: AgentRole;
  displayName: string;
  headline: string;
  status: "pending" | "running" | StageStatus;
  summary?: string;
}

export interface AnalysisError {
  code: string;
  message: string;
}

/** One item in the live findings feed, in arrival order. */
export type Finding =
  | { kind: "source"; key: string; title: string; url: string | null | undefined; relevance: string }
  | { kind: "risk"; key: string; risk: SettlementRisk }
  | { kind: "warning"; key: string; warning: MarketWarning };

export interface AnalysisState {
  phase: Phase;
  eventInput: string | null;
  stages: StageState[];
  market: Market | null;
  kalshi: KalshiSnapshot | null;
  estimate: EstimateUpdatedEvent | null;
  findings: Finding[];
  evidence: Evidence[];
  response: WorkflowResponse | null;
  error: AnalysisError | null;
}

export const STAGE_ORDER: ReadonlyArray<{ role: AgentRole; displayName: string; headline: string }> = [
  {
    role: "market_data",
    displayName: "Market Data Agent",
    headline: "Resolving the event and its market context",
  },
  {
    role: "settlement_rules",
    displayName: "Settlement Rules Agent",
    headline: "Auditing settlement rules and cutoff wording",
  },
  { role: "research", displayName: "Research Agent", headline: "Searching public evidence" },
  {
    role: "probability_estimator",
    displayName: "Probability Estimator Agent",
    headline: "Converting evidence into a bounded estimate",
  },
  { role: "skeptic", displayName: "Skeptic Agent", headline: "Stress-testing the draft estimate" },
  {
    role: "memo_editor",
    displayName: "Memo Editor Agent",
    headline: "Composing the validated research memo",
  },
];

export const initialState: AnalysisState = {
  phase: "idle",
  eventInput: null,
  stages: [],
  market: null,
  kalshi: null,
  estimate: null,
  findings: [],
  evidence: [],
  response: null,
  error: null,
};

export type Action =
  | { type: "START"; eventInput: string }
  | { type: "EVENT"; event: AnalysisEvent }
  | { type: "TRANSPORT_ERROR" }
  | { type: "RESET" };

function freshStages(): StageState[] {
  return STAGE_ORDER.map((stage) => ({ ...stage, status: "pending" }));
}

export function reducer(state: AnalysisState, action: Action): AnalysisState {
  switch (action.type) {
    case "START":
      return { ...initialState, phase: "streaming", eventInput: action.eventInput, stages: freshStages() };
    case "RESET":
      return initialState;
    case "TRANSPORT_ERROR":
      if (state.phase !== "streaming") return state;
      return {
        ...state,
        phase: "failed",
        error: { code: "stream_disconnected", message: "The analysis stream disconnected before finishing." },
      };
    case "EVENT":
      return applyEvent(state, action.event);
  }
}

function applyEvent(state: AnalysisState, event: AnalysisEvent): AnalysisState {
  switch (event.type) {
    case "stage_started":
      return {
        ...state,
        stages: state.stages.map((stage) =>
          stage.role === event.stage
            ? { ...stage, status: "running", displayName: event.displayName, headline: event.headline }
            : stage,
        ),
      };
    case "stage_completed":
      return {
        ...state,
        stages: state.stages.map((stage) =>
          stage.role === event.stage ? { ...stage, status: event.status, summary: event.summary } : stage,
        ),
      };
    case "market_resolved":
      return { ...state, market: event.market, kalshi: event.kalshi };
    case "estimate_updated":
      return { ...state, estimate: event };
    case "source_found":
      return {
        ...state,
        findings: [
          ...state.findings,
          {
            kind: "source",
            key: `source-${state.findings.length}`,
            title: event.sourceTitle,
            url: event.sourceUrl,
            relevance: event.relevance,
          },
        ],
      };
    case "evidence_added":
      return { ...state, evidence: [...state.evidence, event.evidence] };
    case "settlement_risk_found":
      return {
        ...state,
        findings: [
          ...state.findings,
          { kind: "risk", key: `risk-${state.findings.length}`, risk: event.risk },
        ],
      };
    case "warning_raised":
      return {
        ...state,
        findings: [
          ...state.findings,
          { kind: "warning", key: `warning-${state.findings.length}`, warning: event.warning },
        ],
      };
    case "final":
      return { ...state, phase: "complete", response: event.response };
    case "error":
      return { ...state, phase: "failed", error: { code: event.code, message: event.message } };
  }
}
