import type { Metadata } from "next";
import { Inter, Lora, Nanum_Gothic_Coding } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const nanum = Nanum_Gothic_Coding({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nanum",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Servicing Copilot — trial scope, working (an Orchanta concept for Readi Financial)",
  description:
    "A deterministic, client-side concept of the Servicing Copilot bake-off scope: idempotent CSV loan-tape import with audit, an NSF-collections case screen, structured borrower-reply classification, and an event-driven activity log — multi-tenant by lender_id. Sample data only.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${inter.variable} ${nanum.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
