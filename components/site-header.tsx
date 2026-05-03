import { ResearchOnlyBadge } from "@/components/research-only-badge";

export function SiteHeader() {
  return (
    <header className="border-border border-b">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <span className="text-foreground text-sm font-semibold tracking-tight">Kalshi AI Research</span>
        <ResearchOnlyBadge />
      </div>
    </header>
  );
}
