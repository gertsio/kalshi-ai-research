"use client";

export function SiteHeader() {
  const goHome = () => {
    window.dispatchEvent(new CustomEvent("kalshi:home"));
  };

  return (
    <header className="border-border border-b">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-6 px-6 py-4 sm:px-8">
        <button
          type="button"
          onClick={goHome}
          className="text-foreground hover:text-foreground/70 focus-visible:ring-ring rounded-sm text-sm font-semibold tracking-tight transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          Kalshi AI Research
        </button>
      </div>
    </header>
  );
}
