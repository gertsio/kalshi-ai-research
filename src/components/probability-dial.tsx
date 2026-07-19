import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

import type { EstimateUpdatedEvent } from "@/contracts/workflow/analysis-events";

const SWEEP_DEGREES = 240;
const START_ANGLE = 150; // degrees; arc opens downward
const RADIUS = 84;
const CENTER = 100;

function polar(angleDegrees: number, radius: number): { x: number; y: number } {
  const radians = (angleDegrees * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(radians), y: CENTER + radius * Math.sin(radians) };
}

function arcPath(fromFraction: number, toFraction: number, radius: number): string {
  const startAngle = START_ANGLE + fromFraction * SWEEP_DEGREES;
  const endAngle = START_ANGLE + toFraction * SWEEP_DEGREES;
  const start = polar(startAngle, radius);
  const end = polar(endAngle, radius);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

const BASIS_LABEL: Record<EstimateUpdatedEvent["basis"], string> = {
  market_prior: "market prior",
  research_draft: "research estimate",
  skeptic_calibrated: "skeptic-calibrated",
};

export function ProbabilityDial({
  estimate,
  marketPrior,
}: {
  estimate: EstimateUpdatedEvent | null;
  marketPrior: number | null;
}) {
  const probability = estimate?.probability ?? marketPrior ?? 0;
  const value = useMotionValue(0);
  const percentText = useTransform(value, (current) => `${Math.round(current * 100)}`);
  const fillPath = useTransform(value, (current) => arcPath(0, Math.max(current, 0.001), RADIUS));

  useEffect(() => {
    const controls = animate(value, probability, { type: "spring", stiffness: 60, damping: 18 });
    return () => controls.stop();
  }, [probability, value]);

  const priorMark = marketPrior === null ? null : polar(START_ANGLE + marketPrior * SWEEP_DEGREES, RADIUS);

  return (
    <div className="relative flex flex-col items-center" data-testid="probability-dial">
      <svg viewBox="0 0 200 168" className="w-full max-w-[290px]">
        <path
          d={arcPath(0, 1, RADIUS)}
          fill="none"
          stroke="var(--color-desk-edge)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <motion.path
          d={fillPath}
          fill="none"
          stroke="var(--color-glow)"
          strokeWidth="8"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 6px rgba(74, 222, 128, 0.55))" }}
        />
        {priorMark ? (
          <circle
            cx={priorMark.x}
            cy={priorMark.y}
            r="4.5"
            fill="var(--color-ink)"
            stroke="var(--color-glow-soft)"
            strokeWidth="2"
          >
            <title>Kalshi implied probability</title>
          </circle>
        ) : null}
        <text
          x={CENTER}
          y={CENTER - 4}
          textAnchor="middle"
          className="fill-foreground font-mono"
          style={{ fontSize: "44px", fontWeight: 600 }}
        >
          <motion.tspan>{percentText}</motion.tspan>
          <tspan style={{ fontSize: "20px" }} dy="-14" dx="2">
            %
          </tspan>
        </text>
        <text
          x={CENTER}
          y={CENTER + 22}
          textAnchor="middle"
          className="fill-muted-foreground font-mono"
          style={{ fontSize: "9.5px", letterSpacing: "0.2em" }}
        >
          {estimate ? BASIS_LABEL[estimate.basis].toUpperCase() : "AWAITING SIGNAL"}
        </text>
      </svg>
      {estimate?.confidence ? (
        <p className="text-muted-foreground -mt-2 font-mono text-[11px] tracking-widest uppercase">
          confidence · <span className="text-glow-soft">{estimate.confidence}</span>
        </p>
      ) : null}
    </div>
  );
}
