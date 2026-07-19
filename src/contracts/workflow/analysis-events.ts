import { z } from "zod";

import {
  agentRoleSchema,
  boundedLevelSchema,
  evidenceSchema,
  kalshiSnapshotSchema,
  marketSchema,
  settlementRiskSchema,
  warningSchema,
  workflowResponseSchema,
} from "./workflow-contract";

/** Mirrors workflow-python/app/engine/events.py — the SSE stream contract. */

export const stageStatusSchema = z.enum(["completed", "skipped", "failed"]);

export const stageStartedSchema = z.object({
  type: z.literal("stage_started"),
  stage: agentRoleSchema,
  displayName: z.string().min(1),
  headline: z.string().min(1),
});

export const stageCompletedSchema = z.object({
  type: z.literal("stage_completed"),
  stage: agentRoleSchema,
  summary: z.string().min(1),
  status: stageStatusSchema,
});

export const marketResolvedSchema = z.object({
  type: z.literal("market_resolved"),
  market: marketSchema,
  kalshi: kalshiSnapshotSchema,
});

export const sourceFoundSchema = z.object({
  type: z.literal("source_found"),
  sourceTitle: z.string().min(1),
  sourceUrl: z.string().url().nullish(),
  publishedAt: z.string().nullish(),
  relevance: boundedLevelSchema,
});

export const evidenceAddedSchema = z.object({
  type: z.literal("evidence_added"),
  evidence: evidenceSchema,
});

export const settlementRiskFoundSchema = z.object({
  type: z.literal("settlement_risk_found"),
  risk: settlementRiskSchema,
});

export const warningRaisedSchema = z.object({
  type: z.literal("warning_raised"),
  warning: warningSchema,
});

export const estimateBasisSchema = z.enum(["market_prior", "research_draft", "skeptic_calibrated"]);

export const estimateUpdatedSchema = z.object({
  type: z.literal("estimate_updated"),
  probability: z.number().min(0).max(1),
  confidence: boundedLevelSchema.nullish(),
  basis: estimateBasisSchema,
});

export const analysisCompletedSchema = z.object({
  type: z.literal("final"),
  response: workflowResponseSchema,
});

export const analysisFailedSchema = z.object({
  type: z.literal("error"),
  code: z.string().min(1),
  message: z.string().min(1),
  statusCode: z.number().int(),
});

export const analysisEventSchema = z.discriminatedUnion("type", [
  stageStartedSchema,
  stageCompletedSchema,
  marketResolvedSchema,
  sourceFoundSchema,
  evidenceAddedSchema,
  settlementRiskFoundSchema,
  warningRaisedSchema,
  estimateUpdatedSchema,
  analysisCompletedSchema,
  analysisFailedSchema,
]);

export type StageStatus = z.infer<typeof stageStatusSchema>;
export type StageStartedEvent = z.infer<typeof stageStartedSchema>;
export type StageCompletedEvent = z.infer<typeof stageCompletedSchema>;
export type MarketResolvedEvent = z.infer<typeof marketResolvedSchema>;
export type SourceFoundEvent = z.infer<typeof sourceFoundSchema>;
export type EvidenceAddedEvent = z.infer<typeof evidenceAddedSchema>;
export type SettlementRiskFoundEvent = z.infer<typeof settlementRiskFoundSchema>;
export type WarningRaisedEvent = z.infer<typeof warningRaisedSchema>;
export type EstimateBasis = z.infer<typeof estimateBasisSchema>;
export type EstimateUpdatedEvent = z.infer<typeof estimateUpdatedSchema>;
export type AnalysisCompletedEvent = z.infer<typeof analysisCompletedSchema>;
export type AnalysisFailedEvent = z.infer<typeof analysisFailedSchema>;
export type AnalysisEvent = z.infer<typeof analysisEventSchema>;
