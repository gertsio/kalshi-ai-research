import { ResearchOnlyBadge } from "@/components/research-only-badge";

export function SiteHeader() {
  return (
    <header className="border-rule border-b">
      <div className="mx-auto flex w-full max-w-6xl items-baseline justify-between gap-6 px-6 py-5 sm:px-10">
        <div className="flex items-baseline gap-3">
          <span className="eyebrow">Vol. 01 · No. 01</span>
          <span className="font-display text-base tracking-tight">Kalshi Research Swarm</span>
        </div>
        <ResearchOnlyBadge />
      </div>
    </header>
  );
}
