import type { Metadata } from "next";
import { Barlow, Open_Sans } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "A.R.M Textile — Export Catalog & Quote (Concept)",
  description:
    "Terry towels, bed linen & hospital textiles from Faisalabad. Export-grade catalog with specs and an instant quote request. A working concept by Orchanta.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} ${openSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
