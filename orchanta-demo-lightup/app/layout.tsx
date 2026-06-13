import type { Metadata } from "next";
import { Arimo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Arimo is the closest Google Font to Lightup's Arial/Helvetica body type;
// IBM Plex Mono carries the provisioning log lines.
const arimo = Arimo({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-arimo", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Lightup Ops — Provisionierung in Aktion (Orchanta concept)",
  description:
    "A working concept built by Orchanta for Lightup Network Solutions: a mini ISP ops slice — customer list, one-click service provisioning pipeline, and a simulated invoice preview. Beispieldaten, Demo-Modus.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${arimo.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
