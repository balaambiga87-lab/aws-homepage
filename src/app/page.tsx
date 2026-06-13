import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import AboutUs from "@/components/AboutUs";
import Gallery from "@/components/Gallery";
import StatsSection from "@/components/StatsSection";
import Events from "@/components/Events";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "#FFFFFF", minHeight: "100vh", position: "relative", width: "100%" }}>
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <AboutUs />
      <Gallery />
      <StatsSection />
      <Events />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
