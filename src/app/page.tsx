import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Transformations } from "@/components/landing/transformations";
import { CoastalStack } from "@/components/landing/coastal-stack";
import { ZeroFriction } from "@/components/landing/zero-friction";
import { RouteCalendar } from "@/components/landing/route-calendar";
import { Pricing } from "@/components/landing/pricing";
import { RedondoPromise } from "@/components/landing/redondo-promise";
import { About } from "@/components/landing/about";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-beige text-charcoal">
      <Navbar />
      <main>
        {/* 1. Hook & Outcome */}
        <Hero />

        {/* 2. Immediate Visual Proof (Desire) */}
        <Transformations />

        {/* 3. The Coastal Problem & Solution */}
        <CoastalStack />

        {/* 4. Friction Removal (1-2-3 How It Works) */}
        <ZeroFriction />

        {/* 5. Scarcity & Route Selection */}
        <RouteCalendar />

        {/* 6. Clear Subscription Offer */}
        <Pricing />

        {/* 7. Trust & Guarantee */}
        <RedondoPromise variant="banner" />
        <About />

        {/* 8. Risk Reversal & Answers */}
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
