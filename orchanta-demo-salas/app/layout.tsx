import type { Metadata } from "next";
import { Inter, Lexend_Exa } from "next/font/google";
import "./globals.css";

const lexendExa = Lexend_Exa({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-lexend-exa",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Salas Training — Memberships (Orchanta concept)",
  description:
    "A working membership concept built by Orchanta for Salas Training: three NYC youth soccer pathways with monthly and annual plans, a sibling add-on, and a demo-mode checkout with auto-renewal.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${lexendExa.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
