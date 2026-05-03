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
          className="text-foreground hover:text-foreground/70 focus-visible:ring-ring flex cursor-pointer items-center gap-2 rounded-sm text-lg font-semibold tracking-tight transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:text-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="h-7 w-7 shrink-0 sm:h-8 sm:w-8"
          >
            <rect width="32" height="32" rx="6" fill="currentColor" />
            <path
              d="M11 8 V24 M11 16 L21 8 M11 16 L21 24"
              stroke="var(--background, #ffffff)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Kalshi AI Research
        </button>
      </div>
    </header>
  );
}
