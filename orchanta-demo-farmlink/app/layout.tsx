import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

// Farm Link Hawaiʻi's live theme uses DM Sans for both headings and body.
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EBT Tax Reconciliation — Farm Link Hawaiʻi (Orchanta concept)",
  description:
    "A working concept Orchanta built for Farm Link Hawaiʻi: penny-perfect GET exemption on SNAP-EBT orders — catches Shopify's mis-rounded tax refunds and produces compliant receipts. Sample data, demo mode.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
