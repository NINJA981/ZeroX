import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { ProblemAgitation } from "@/components/landing/ProblemAgitation";
import { BentoFeatures } from "@/components/landing/BentoFeatures";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <ProblemAgitation />
        <BentoFeatures />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
