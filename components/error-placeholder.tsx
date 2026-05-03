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
    <section className="mx-auto flex max-w-2xl flex-col gap-6" aria-live="assertive">
      <div className="flex flex-col gap-2">
        <h2 className="text-foreground text-2xl font-semibold tracking-tight">{copy.title}.</h2>
        {marketInput !== undefined ? (
          <p className="text-muted-foreground text-sm">
            Market input: <span className="text-foreground">{marketInput}</span>
          </p>
        ) : null}
      </div>

      <Alert variant="destructive">
        <AlertTitle>Workflow returned an error</AlertTitle>
        <AlertDescription>
          {copy.detail} A demo result is available so you can preview the analysis flow.
        </AlertDescription>
      </Alert>

      <div className="flex flex-wrap gap-3">
        <Button onClick={onReset}>Try again</Button>
        <Button variant="outline" onClick={onLoadDemo}>
          Load demo
        </Button>
      </div>
    </section>
  );
}
