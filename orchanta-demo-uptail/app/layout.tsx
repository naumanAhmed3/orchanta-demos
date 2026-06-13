import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Fragment_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-jakarta", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
const fragment = Fragment_Mono({ subsets: ["latin"], weight: "400", variable: "--font-fragment", display: "swap" });

export const metadata: Metadata = {
  title: "Uptail — watch an AI agent close a lead, live (Orchanta concept)",
  description:
    "A concept Orchanta built for Uptail: watch an AI sales agent qualify an inbound lead on WhatsApp, handle an objection, book the meeting and sync the CRM — with the revenue landing live.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} ${fragment.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
