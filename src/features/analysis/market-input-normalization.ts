export interface NormalizedMarketInput {
  marketInput: string;
  source: "ticker" | "url";
}

const TICKER_PATTERN = /^KX[A-Z0-9-]{3,}$/;
const KALSHI_HOST_PATTERN = /(^|\.)kalshi\.com$/i;

export function normalizeMarketInput(input: string): NormalizedMarketInput | null {
  const trimmed = input.trim();
  if (trimmed.length === 0) return null;

  const fromUrl = normalizeKalshiUrl(trimmed);
  if (fromUrl !== null) return { marketInput: fromUrl, source: "url" };

  const ticker = trimmed.toUpperCase();
  if (TICKER_PATTERN.test(ticker)) return { marketInput: ticker, source: "ticker" };

  return null;
}

function normalizeKalshiUrl(input: string): string | null {
  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return null;
  }

  if (!KALSHI_HOST_PATTERN.test(url.hostname)) return null;

  const segments = url.pathname.split("/").filter(Boolean);
  const marketIndex = segments.findIndex((segment) => segment.toLowerCase() === "markets");
  if (marketIndex === -1) return null;

  const ticker = segments
    .slice(marketIndex + 1)
    .filter((segment) => TICKER_PATTERN.test(segment.toUpperCase()))
    .at(-1);
  return ticker?.toUpperCase() ?? null;
}
