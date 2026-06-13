import type { Metadata, Viewport } from "next";
import { Spline_Sans, Inter } from "next/font/google";
import "./globals.css";

const splineSans = Spline_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-spline",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moveforth · Creative Automation Pipeline",
  description:
    "Brief in, on-brand ad batch out — a working concept of Moveforth Studio's AI creative-automation pipeline. Built by Orchanta.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${splineSans.variable} ${inter.variable}`}>
      <body className="bg-engine min-h-dvh antialiased">{children}</body>
    </html>
  );
}
