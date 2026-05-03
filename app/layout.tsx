import type { Metadata } from "next";
import { Fraunces, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { DisclaimerStrip } from "@/components/disclaimer-strip";
import { SiteHeader } from "@/components/site-header";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif-display",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif-body",
  display: "swap",
  axes: ["opsz"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-monospace",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kalshi Research Swarm — research-only market analysis",
  description:
    "Compare Kalshi market-implied probabilities with multi-agent research estimates. Research only. Not financial advice.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("dark", fraunces.variable, newsreader.variable, jetbrainsMono.variable)}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <DisclaimerStrip />
      </body>
    </html>
  );
}
