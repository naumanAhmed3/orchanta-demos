import type { Metadata } from "next";
import { Cinzel, Nunito } from "next/font/google";
import "./globals.css";

// Nunito is titaitalia.com's actual site font (header + body stacks);
// Cinzel approximates the Roman serif caps of the Tita crest wordmark.
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tita Italia — Profit per Order (Orchanta concept)",
  description:
    "A working concept Orchanta built for Tita Italia: true net profit on every order — revenue minus COGS, shipping, transaction fees and allocated ad spend. Sample data, demo mode.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
