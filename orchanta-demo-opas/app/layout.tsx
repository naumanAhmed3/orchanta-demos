import type { Metadata } from "next";
import { Open_Sans, Ultra } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-open-sans", display: "swap" });
const ultra = Ultra({ subsets: ["latin"], weight: "400", variable: "--font-ultra", display: "swap" });

export const metadata: Metadata = {
  title: "Opa's Smoked Meats — Wholesale done right (an Orchanta concept)",
  description:
    "A working concept Orchanta built for Opa's Smoked Meats: the Dawn-theme Wholesale Catalog nav item rendering reliably for every B2B customer — including newly created company accounts — with a live persona switcher and sample wholesale case pricing.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${openSans.variable} ${ultra.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
