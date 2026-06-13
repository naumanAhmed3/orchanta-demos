import type { Metadata } from "next";
import { PT_Sans, PT_Sans_Narrow } from "next/font/google";
import "./globals.css";

const ptNarrow = PT_Sans_Narrow({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-narrow",
  display: "swap",
});
const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Strahltechnik Express — VAT-aware Versandkosten im Checkout (Orchanta Konzept-Demo)",
  description:
    "Ein Orchanta-Konzept für Strahltechnik Express: eine Custom Carrier-Service-App, die den USt-Status des Kunden kennt — korrekte Netto-Raten (Reverse-Charge) für EU-B2B, Bruttopreise für B2C. Beispieldaten, Demo-Modus.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${ptNarrow.variable} ${ptSans.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
