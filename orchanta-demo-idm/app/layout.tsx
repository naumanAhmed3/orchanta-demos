import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-source",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IDM Imagineering — Scan-to-Order QR (Orchanta concept)",
  description:
    "A working concept Orchanta built for IDM Imagineering: configure a model or prop — colour, size, quantity — and get a QR code that carries the exact order, total and payment details. Counter cards, product tags, invoice slips.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sourceSans.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
