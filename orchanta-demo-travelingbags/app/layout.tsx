import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Traveling Bags — Box-Fit & Rate Estimator (Orchanta concept)",
  description:
    "A working concept Orchanta built for Traveling Bags Luggage & Repair: per-item ship dimensions, cubic-inch totals, best-fit cartons, dimensional vs actual weight, and illustrative zone rates for multi-item orders.",
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
