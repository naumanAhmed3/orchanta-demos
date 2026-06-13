import type { Metadata } from "next";
import { Manuale, Nunito } from "next/font/google";
import "./globals.css";

const manuale = Manuale({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-manuale",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Little Big Flavour Kits — AI, automation & systems concept | Orchanta",
  description:
    "A working concept by Orchanta for Little Big Flavour Kits: an AI Spice Guide, an order-to-fulfilment automation, and an ops systems dashboard — tailored to a Sri Lankan curry kit brand. Demo mode, sample data.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manuale.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
