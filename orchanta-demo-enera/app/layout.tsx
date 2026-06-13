import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enera Control Room — failed-charge recovery (Orchanta prototype)",
  description:
    "A working prototype Orchanta built for Enera: detect a failed EV charging session and recover it with an AI support agent — hear + help.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
