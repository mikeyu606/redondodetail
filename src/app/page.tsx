import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Transformations } from "@/components/landing/transformations";
import { ZeroFriction } from "@/components/landing/zero-friction";
import { RouteCalendar } from "@/components/landing/route-calendar";
import { Pricing } from "@/components/landing/pricing";
import { RedondoPromise } from "@/components/landing/redondo-promise";
import { About } from "@/components/landing/about";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-charcoal">
      <Navbar />
      <main>
        {/* Hero: What is this & why should I care? */}
        <Hero />

        {/* Transformations: Does it actually look good? */}
        <Transformations />

        {/* Zero Friction: How hard is it for me to do this? */}
        <ZeroFriction />

        {/* Route Calendar: Can I get this in my neighborhood right now? */}
        <RouteCalendar />

        {/* Pricing: How much does it cost? */}
        <Pricing />

        {/* About / FAQ: Can I trust this person on my driveway? */}
        <RedondoPromise variant="banner" />
        <About />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
