import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Liter is the exact body font on the live kumikolash.com theme. It is
// self-hosted (OFL-licensed, latin subset) because next/font has no built-in
// fallback metrics for it; globals.css supplies the fallback stack.
const liter = localFont({
  src: "./fonts/liter-latin-400.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-liter",
  display: "swap",
  adjustFontFallback: false,
});

// Single-weight Liter can't carry display headings, so the concept pairs it
// with a feminine editorial serif for hierarchy.
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kumiko Lash — Handmade Wispy Lashes, Los Angeles (Orchanta concept)",
  description:
    "A conversion-first storefront concept Orchanta built for Kumiko Lash: handmade Fairy, Princess, and Starlight wispy lashes, designed in Los Angeles and finished in small batches. Demo mode — no charge.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${liter.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
