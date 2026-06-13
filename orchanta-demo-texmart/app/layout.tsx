import type { Metadata } from "next";
import { Libre_Franklin, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-libre-franklin",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tex Mart International — Export Catalogue & Inquiry (concept)",
  description:
    "A working concept by Orchanta: an export-grade product catalogue and inquiry flow for Tex Mart International — terry towels, bathrobes, cotton fabric and baby garments from Faisalabad since 1995.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${libreFranklin.variable} ${sourceSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
