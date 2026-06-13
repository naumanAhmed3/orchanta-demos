import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

// The live portal references "Source Sans Pro"; Source Sans 3 is its
// current Google Fonts release — the closest available match.
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Islamabad Driving Center — Learn to Drive with Confidence",
  description:
    "Driving lessons and full license assistance in Islamabad & Rawalpindi. Book a course and a slot online. Demo concept by Orchanta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sourceSans.variable}>
      <body>{children}</body>
    </html>
  );
}
