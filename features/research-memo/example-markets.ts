export interface ExampleMarket {
  ticker: string;
  label: string;
  blurb: string;
}

/** Demo-safe placeholders. The picker is non-functional in this scaffold —
 * selecting one populates the input but does not trigger a live workflow. */
export const exampleMarkets: ReadonlyArray<ExampleMarket> = [
  {
    ticker: "KXEXAMPLE-26MAY03-DEMO",
    label: "Example economic release",
    blurb: "Validated demo fixture used by the workflow contract tests.",
  },
  {
    ticker: "KXFEDRATE-DEC26",
    label: "Fed rate decision (placeholder)",
    blurb: "Reserved slot for a live demo market.",
  },
  {
    ticker: "KXJOBS-26JUN-PLACEHOLDER",
    label: "Monthly jobs print (placeholder)",
    blurb: "Reserved slot for a live demo market.",
  },
];
