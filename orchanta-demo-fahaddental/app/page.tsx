import Hero from "@/components/Hero";
import BookingFlow from "@/components/BookingFlow";
import Services from "@/components/Services";
import DoctorProfile from "@/components/DoctorProfile";
import LocationStrip from "@/components/LocationStrip";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <BookingFlow />
      <Services />
      <DoctorProfile />
      <LocationStrip />
      <Footer />
    </main>
  );
}
