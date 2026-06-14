import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coco Clean — Cleans Like A Dream | Plastic-free laundry",
  description:
    "Coco Clean is plastic-free laundry detergent powder that cleans like a dream. Fragrance free, zero plastics, biodegradable, works in HE washers and hard water. Sample bespoke storefront concept.",
  keywords: [
    "Coco Clean",
    "plastic free detergent",
    "laundry powder",
    "biodegradable",
    "eco laundry",
  ],
};

export const viewport: Viewport = {
  themeColor: "#023F51",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
