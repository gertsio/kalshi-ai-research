import { describe, expect, it } from "vitest";

import { normalizeMarketInput } from "@/features/research-memo/market-input-normalization";

describe("market input normalization", () => {
  it("accepts and normalizes Kalshi tickers", () => {
    expect(normalizeMarketInput("  kxexample-26may03-demo  ")).toEqual({
      marketInput: "KXEXAMPLE-26MAY03-DEMO",
      source: "ticker",
    });
  });

  it("extracts tickers from Kalshi market URLs and ignores tracking parameters", () => {
    expect(
      normalizeMarketInput("https://kalshi.com/markets/KXEXAMPLE-26MAY03-DEMO?utm_source=test&ref=demo"),
    ).toEqual({ marketInput: "KXEXAMPLE-26MAY03-DEMO", source: "url" });
  });

  it("rejects empty and non-Kalshi inputs", () => {
    expect(normalizeMarketInput("   ")).toBeNull();
    expect(normalizeMarketInput("https://example.com/markets/KXEXAMPLE-26MAY03-DEMO")).toBeNull();
    expect(normalizeMarketInput("not a ticker")).toBeNull();
  });
});
