import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pretty Ambitious — by Aditi Mishra",
  description:
    "For those who've been called too ambitious, too restless, too much. Tech, business, careers & smart reads for people who want more from life.",
  applicationName: "Pretty Ambitious",
  authors: [{ name: "Aditi Mishra" }],
  openGraph: {
    title: "Pretty Ambitious — by Aditi Mishra",
    description:
      "For those who've been called too ambitious, too restless, too much.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
