import type { Metadata } from "next";
import { Nunito_Sans, Open_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-nunito-sans",
  display: "swap",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Uno Vita — MVA riktig, regnskap automatisk (Orchanta-konsept)",
  description:
    "Et arbeidende konsept Orchanta bygde for Uno Vita: riktig norsk MVA (0% / 15% / 25%) per varelinje — også for Shopify Collective — og EHF-bilag rett inn i Tripletex. Eksempeldata, demo-modus.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nb" className={`${nunitoSans.variable} ${openSans.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
