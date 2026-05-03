import { z } from "zod";

export const probabilitySchema = z.number().min(0).max(1);
export const boundedEnumSchema = z.enum(["low", "medium", "high"]);

export const agentRoleSchema = z.enum([
  "market_data",
  "settlement_rules",
  "research",
  "probability_estimator",
  "skeptic",
  "memo_editor",
]);

export const workflowRequestSchema = z.object({
  marketInput: z.string().trim().min(1),
  requestedAt: z.string().datetime().optional(),
  demoMode: z.boolean().optional(),
});

export const workflowResponseSchema = z
  .object({
    schemaVersion: z.literal("1.0"),
    analyzedAt: z.string().datetime(),
    market: z.object({
      ticker: z.string().min(1),
      title: z.string().min(1),
      subtitle: z.string().optional(),
      url: z.string().url().optional(),
      status: z.enum(["open", "closed", "settled", "unknown"]),
      closeTime: z.string().datetime().optional(),
      settlementSource: z.string().min(1).optional(),
    }),
    kalshi: z.object({
      impliedProbability: probabilitySchema,
      yesBid: probabilitySchema.optional(),
      yesAsk: probabilitySchema.optional(),
      spread: probabilitySchema.optional(),
      volume: z.number().nonnegative().optional(),
      openInterest: z.number().nonnegative().optional(),
      lastUpdatedAt: z.string().datetime().optional(),
    }),
    agentEstimate: z.object({
      probability: probabilitySchema,
      confidence: boundedEnumSchema,
      thesis: z.string().min(1),
      assumptions: z.array(z.string().min(1)).min(1),
    }),
    delta: z.object({
      probabilityPoints: z.number().min(-1).max(1),
      direction: z.enum(["agent_higher", "agent_lower", "in_line"]),
    }),
    evidence: z.array(
      z.object({
        claim: z.string().min(1),
        sourceTitle: z.string().min(1),
        sourceUrl: z.string().url().optional(),
        relevance: boundedEnumSchema,
      }),
    ),
    counterarguments: z.array(z.string().min(1)),
    settlementRisks: z.array(
      z.object({
        risk: z.string().min(1),
        severity: boundedEnumSchema,
      }),
    ),
    warnings: z.array(
      z.object({
        kind: z.enum(["liquidity", "staleness", "data_quality"]),
        message: z.string().min(1),
        severity: boundedEnumSchema,
      }),
    ),
    whatWouldChange: z.array(z.string().min(1)).min(1),
    agentTrace: z.array(
      z.object({
        role: agentRoleSchema,
        displayName: z.string().min(1),
        summary: z.string().min(1),
        status: z.enum(["completed", "skipped", "failed"]),
      }),
    ),
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

    const expectedDirection = expectedDelta > 0 ? "agent_higher" : expectedDelta < 0 ? "agent_lower" : "in_line";

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

    if (!/research|advice|trade/i.test(response.disclaimer)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["disclaimer"],
        message: "Disclaimer must clearly separate research from trading advice.",
      });
    }
  });

export type WorkflowRequest = z.infer<typeof workflowRequestSchema>;
export type WorkflowResponse = z.infer<typeof workflowResponseSchema>;

export function parseWorkflowResponse(input: unknown): WorkflowResponse {
  return workflowResponseSchema.parse(input);
}

export function validateWorkflowResponse(input: unknown): z.SafeParseReturnType<unknown, WorkflowResponse> {
  return workflowResponseSchema.safeParse(input);
}
