export const DISCLAIMER_TEXT =
  "Research-only analysis. Output describes a probability estimate from agent research compared with Kalshi's market-implied probability. It is not financial advice and is not a recommendation to place, buy, or sell any contract.";

export function DisclaimerStrip() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-background mt-auto"
    >
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <div className="pb-6">
          <div className="bg-muted/50 border-border/60 rounded-md border px-4 py-3">
            <p className="text-muted-foreground text-xs leading-relaxed">
              <span className="text-foreground/80 mr-1.5 font-medium">
                Disclosure.
              </span>
              {DISCLAIMER_TEXT}
            </p>
          </div>
        </div>

        <div className="border-border/70 flex flex-col-reverse items-start justify-between gap-4 border-t py-6 sm:flex-row sm:items-center">
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
              className="text-foreground h-5 w-5 shrink-0"
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
            <span>&copy; {year} Kalshi AI Research</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com"
              aria-label="GitHub"
              className="text-foreground/60 hover:text-foreground hover:bg-muted focus-visible:ring-ring inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path d="M12 .5a11.5 11.5 0 0 0-3.635 22.41c.575.106.785-.25.785-.555 0-.274-.01-1-.016-1.964-3.2.695-3.876-1.543-3.876-1.543-.523-1.33-1.278-1.685-1.278-1.685-1.044-.714.08-.7.08-.7 1.155.082 1.763 1.186 1.763 1.186 1.026 1.76 2.694 1.252 3.35.957.103-.745.402-1.252.73-1.541-2.555-.291-5.243-1.278-5.243-5.687 0-1.256.448-2.283 1.184-3.088-.118-.291-.513-1.464.113-3.05 0 0 .965-.31 3.165 1.18A10.96 10.96 0 0 1 12 6.84c.978.005 1.965.132 2.886.388 2.198-1.49 3.162-1.18 3.162-1.18.628 1.586.233 2.759.115 3.05.737.805 1.182 1.832 1.182 3.088 0 4.42-2.692 5.392-5.256 5.677.413.355.78 1.057.78 2.131 0 1.539-.014 2.78-.014 3.16 0 .308.207.667.79.553A11.5 11.5 0 0 0 12 .5Z" />
              </svg>
            </a>
            <a
              href="https://x.com"
              aria-label="X (Twitter)"
              className="text-foreground/60 hover:text-foreground hover:bg-muted focus-visible:ring-ring inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-3.5 w-3.5"
              >
                <path d="M18.244 2H21l-6.56 7.495L22 22h-6.844l-4.78-6.244L4.8 22H2.04l7.02-8.02L2 2h7.02l4.32 5.71L18.244 2Zm-1.2 18.4h1.872L7.04 3.514H5.05L17.044 20.4Z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="text-foreground/60 hover:text-foreground hover:bg-muted focus-visible:ring-ring inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path d="M20.45 20.45h-3.555v-5.569c0-1.328-.026-3.038-1.852-3.038-1.853 0-2.136 1.446-2.136 2.94v5.667H9.353V9h3.412v1.561h.046c.475-.9 1.637-1.852 3.37-1.852 3.601 0 4.268 2.37 4.268 5.455v6.286ZM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126ZM7.119 20.45H3.554V9H7.12v11.45ZM22.225 0H1.771C.792 0 0 .773 0 1.728v20.543C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.728C24 .773 23.2 0 22.222 0h.003Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
