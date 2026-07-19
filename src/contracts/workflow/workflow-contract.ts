import { z } from "zod";

export const probabilitySchema = z.number().min(0).max(1);
export const boundedLevelSchema = z.enum(["low", "medium", "high"]);
/** Kept name for existing imports; prefer boundedLevelSchema. */
export const boundedEnumSchema = boundedLevelSchema;

export const agentRoleSchema = z.enum([
  "market_data",
  "settlement_rules",
  "research",
  "probability_estimator",
  "skeptic",
  "memo_editor",
]);

const forbiddenRecommendationPattern =
  /\b(?:you should|we recommend)\s+(?:buy|sell|place|enter|exit)\b|\b(?:recommendation|action|trade):\s*(?:buy|sell|place|enter|exit)\b|\b(?:buy|sell)\s+(?:now|this market|the contract)\b/i;

export const workflowRequestSchema = z.object({
  marketInput: z.string().trim().min(1),
  requestedAt: z.string().datetime().optional(),
  demoMode: z.boolean().optional(),
});

// The engine serializes absent optionals as null, so wire optionals are nullish.
export const marketSchema = z.object({
  ticker: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().nullish(),
  url: z.string().url().nullish(),
  status: z.enum(["open", "closed", "settled", "unknown"]),
  closeTime: z.string().datetime({ offset: true }).nullish(),
  settlementSource: z.string().min(1).nullish(),
});

export const kalshiSnapshotSchema = z.object({
  impliedProbability: probabilitySchema,
  yesBid: probabilitySchema.nullish(),
  yesAsk: probabilitySchema.nullish(),
  spread: probabilitySchema.nullish(),
  volume: z.number().nonnegative().nullish(),
  openInterest: z.number().nonnegative().nullish(),
  lastUpdatedAt: z.string().datetime({ offset: true }).nullish(),
});

export const agentEstimateSchema = z.object({
  probability: probabilitySchema,
  confidence: boundedLevelSchema,
  thesis: z.string().min(1),
  assumptions: z.array(z.string().min(1)).min(1),
});

export const deltaSchema = z.object({
  probabilityPoints: z.number().min(-1).max(1),
  direction: z.enum(["agent_higher", "agent_lower", "in_line"]),
});

export const evidenceSchema = z.object({
  claim: z.string().min(1),
  sourceTitle: z.string().min(1),
  sourceUrl: z.string().url().nullish(),
  context: z.string().nullish(),
  sourcePublishedAt: z.string().datetime({ offset: true }).nullish(),
  relevance: boundedLevelSchema,
});

export const settlementRiskSchema = z.object({
  risk: z.string().min(1),
  severity: boundedLevelSchema,
});

export const warningSchema = z.object({
  kind: z.enum(["liquidity", "staleness", "data_quality"]),
  message: z.string().min(1),
  severity: boundedLevelSchema,
});

export const agentTraceEntrySchema = z.object({
  role: agentRoleSchema,
  displayName: z.string().min(1),
  summary: z.string().min(1),
  status: z.enum(["completed", "skipped", "failed"]),
});

export const workflowResponseSchema = z
  .object({
    schemaVersion: z.literal("1.0"),
    analyzedAt: z.string().datetime({ offset: true }),
    market: marketSchema,
    kalshi: kalshiSnapshotSchema,
    agentEstimate: agentEstimateSchema,
    delta: deltaSchema,
    evidence: z.array(evidenceSchema),
    counterarguments: z.array(z.string().min(1)),
    settlementRisks: z.array(settlementRiskSchema),
    warnings: z.array(warningSchema),
    whatWouldChange: z.array(z.string().min(1)).min(1),
    agentTrace: z.array(agentTraceEntrySchema),
    finalMemoMarkdown: z.string().min(1),
    developer: z.object({
      rawJsonInspectionEnabled: z.boolean(),
      rawJsonLabel: z.string().min(1),
    }),
    disclaimer: z.string().min(1),
  })
  .superRefine((response, ctx) => {
    const expectedDelta = response.agentEstimate.probability - response.kalshi.impliedProbability;

    if (Math.abs(response.delta.probabilityPoints - expectedDelta) > 0.000001) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["delta", "probabilityPoints"],
        message: "Delta must equal agent estimate minus Kalshi implied probability.",
      });
    }

    const expectedDirection =
      expectedDelta > 0 ? "agent_higher" : expectedDelta < 0 ? "agent_lower" : "in_line";

    if (response.delta.direction !== expectedDirection) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["delta", "direction"],
        message: "Delta direction must match the signed probability delta.",
      });
    }

    const roles = new Set(response.agentTrace.map((entry) => entry.role));
    for (const role of agentRoleSchema.options) {
      if (!roles.has(role)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["agentTrace"],
          message: `Agent trace must include ${role}.`,
        });
      }
    }

    const disclaimer = response.disclaimer.toLowerCase();
    const hasResearchBoundary = disclaimer.includes("research") || disclaimer.includes("informational");
    const rejectsAdvice = ["not financial advice", "not trading advice", "not advice"].some((phrase) =>
      disclaimer.includes(phrase),
    );
    const rejectsTrade = ["not a recommendation", "not trade", "place any trade"].some((phrase) =>
      disclaimer.includes(phrase),
    );

    if (!(hasResearchBoundary && rejectsAdvice && rejectsTrade)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["disclaimer"],
        message: "Disclaimer must clearly separate research from trading advice.",
      });
    }

    const authoredOutputs: Array<{ path: Array<string | number>; text: string }> = [
      { path: ["agentEstimate", "thesis"], text: response.agentEstimate.thesis },
      { path: ["finalMemoMarkdown"], text: response.finalMemoMarkdown },
      ...response.counterarguments.map((text, index) => ({ path: ["counterarguments", index], text })),
      ...response.whatWouldChange.map((text, index) => ({ path: ["whatWouldChange", index], text })),
    ];

    for (const output of authoredOutputs) {
      if (forbiddenRecommendationPattern.test(output.text)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: output.path,
          message: "Workflow output must not include direct buy/sell/place-trade recommendation phrasing.",
        });
      }
    }
  });

export type BoundedLevel = z.infer<typeof boundedLevelSchema>;
export type AgentRole = z.infer<typeof agentRoleSchema>;
export type Market = z.infer<typeof marketSchema>;
export type KalshiSnapshot = z.infer<typeof kalshiSnapshotSchema>;
export type Evidence = z.infer<typeof evidenceSchema>;
export type SettlementRisk = z.infer<typeof settlementRiskSchema>;
export type MarketWarning = z.infer<typeof warningSchema>;
export type AgentTraceEntry = z.infer<typeof agentTraceEntrySchema>;
export type WorkflowRequest = z.infer<typeof workflowRequestSchema>;
export type WorkflowResponse = z.infer<typeof workflowResponseSchema>;

export function parseWorkflowResponse(input: unknown): WorkflowResponse {
  return workflowResponseSchema.parse(input);
}

export function validateWorkflowResponse(input: unknown): z.SafeParseReturnType<unknown, WorkflowResponse> {
  return workflowResponseSchema.safeParse(input);
}
