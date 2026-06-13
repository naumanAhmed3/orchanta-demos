import type { Metadata } from "next";
import { Anton, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Frame — How do you want to feel today? (Orchanta concept)",
  description:
    "A concept Orchanta built for Frame: pick your Need State, the live timetable re-sorts to your mood, and you book in a tap.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${hanken.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
