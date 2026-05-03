"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import { errorReasonCopy, type ErrorReason } from "@/features/research-memo/state";

interface Props {
  reason: ErrorReason;
  marketInput?: string | undefined;
  onReset: () => void;
  onLoadDemo: () => void;
}

export function ErrorPlaceholder({ reason, marketInput, onReset, onLoadDemo }: Props) {
  const copy = errorReasonCopy[reason];

  return (
    <section className="flex flex-col gap-8" aria-live="assertive">
      <div className="flex flex-col gap-2">
        <p className="eyebrow">Workflow placeholder · failure</p>
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{copy.title}.</h2>
        {marketInput !== undefined ? (
          <p className="text-muted-foreground font-serif text-base">
            Market input: <span className="text-foreground font-mono">{marketInput}</span>
          </p>
        ) : null}
      </div>

      <Alert variant="destructive">
        <AlertTitle className="font-display tracking-tight">Workflow returned an error</AlertTitle>
        <AlertDescription className="font-serif">
          {copy.detail} The deterministic demo fixture is available so the analysis flow can be reviewed even
          when the live workflow is unavailable.
        </AlertDescription>
      </Alert>

      <div className="flex flex-wrap gap-3">
        <Button size="lg" className="rounded-none font-mono tracking-[0.12em] uppercase" onClick={onReset}>
          Start over
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-rule rounded-none font-mono tracking-[0.12em] uppercase"
          onClick={onLoadDemo}
        >
          Load demo fixture
        </Button>
      </div>
    </section>
  );
}
