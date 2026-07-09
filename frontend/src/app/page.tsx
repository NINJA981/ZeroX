import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { InteractiveDemo } from "@/components/landing/InteractiveDemo";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { VaultShowcase } from "@/components/landing/VaultShowcase";
import { SampleReport } from "@/components/landing/SampleReport";
import { WhySahur } from "@/components/landing/WhySahur";
import { Testimonials } from "@/components/landing/Testimonials";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <InteractiveDemo />
        <HowItWorks />
        <FeaturesGrid />
        <VaultShowcase />
        <SampleReport />
        <WhySahur />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
