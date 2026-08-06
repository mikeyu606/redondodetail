import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { BrandCarousel } from "@/components/landing/brand-carousel";
import { CoastalStack } from "@/components/landing/coastal-stack";
import { About } from "@/components/landing/about";
import { RedondoPromise } from "@/components/landing/redondo-promise";
import { RouteCalendar } from "@/components/landing/route-calendar";
import { Pricing } from "@/components/landing/pricing";
import { Transformations } from "@/components/landing/transformations";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-beige text-charcoal">
      <Navbar />
      <main>
        <Hero />
        <BrandCarousel />
        <CoastalStack />
        <About />
        <RedondoPromise variant="banner" />
        <RouteCalendar />
        <Pricing />
        <Transformations />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
