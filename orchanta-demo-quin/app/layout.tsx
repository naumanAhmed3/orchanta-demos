import type { Metadata } from "next";
import { Cinzel, Jost, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// iamquin.ai self-hosts Copperplate Gothic Std (display caps), Jost (body)
// and JetBrains Mono. Jost and JetBrains Mono are on Google Fonts directly;
// Cinzel is the closest Google face to Copperplate/Trajan — the site's own
// fallback stack is "Trajan Pro", "Optima", serif.
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-cinzel", display: "swap" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });
const jbMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jbmono", display: "swap" });

export const metadata: Metadata = {
  title: "Quin — agent run (an Orchanta concept)",
  description:
    "One personal-finance agent slice, end to end: observe → detect → decide → act, every step a typed contract. A deterministic working concept built by Orchanta for Quin — sample data, demo mode.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${jost.variable} ${jbMono.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
