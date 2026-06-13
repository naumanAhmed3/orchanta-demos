import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import SignatureExperiences from "@/components/SignatureExperiences";
import JourneyPicker from "@/components/JourneyPicker";
import FounderVision from "@/components/FounderVision";
import Enquiry from "@/components/Enquiry";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Stats />
        <SignatureExperiences />
        <JourneyPicker />
        <FounderVision />
        <Enquiry />
      </main>
      <SiteFooter />
    </>
  );
}
