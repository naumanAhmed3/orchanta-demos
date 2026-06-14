import type { Metadata } from "next";
import { Fraunces, Montserrat } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ConceptStrip from "./components/ConceptStrip";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aliro Consulting — Access to healthcare growth across Vietnam & ASEAN",
  description:
    "A concept preview of the new Aliro Consulting website, built by Orchanta in Aliro's own brand. Illustrative content.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${montserrat.variable}`}>
      <body>
        <ConceptStrip />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
