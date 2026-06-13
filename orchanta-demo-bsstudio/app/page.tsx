import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Packages from "@/components/Packages";
import DateInquiry from "@/components/DateInquiry";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Portfolio />
      <Packages />
      <DateInquiry />
      <Footer />
    </main>
  );
}
