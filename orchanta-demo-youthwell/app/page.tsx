import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Pathways from "@/components/Pathways";
import ResourceFinder from "@/components/ResourceFinder";
import AboutStats from "@/components/AboutStats";
import Programs from "@/components/Programs";
import DonateCTA from "@/components/DonateCTA";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Pathways />
        <ResourceFinder />
        <AboutStats />
        <Programs />
        <DonateCTA />
      </main>
      <SiteFooter />
    </>
  );
}
