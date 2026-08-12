"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandCarousel } from "@/components/landing/brand-carousel";

const CompareVisual = dynamic(
  () =>
    import("@/components/landing/hero-compare").then((mod) => mod.CompareVisual),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse bg-beige/80" />
    ),
  }
);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function Hero() {
  return (
    <section className="flex flex-col">
      <div className="bg-dusty-rose pt-16 sm:pt-16 lg:pt-16">
        {/* Desktop: two-column */}
        <div className="mx-auto hidden w-full max-w-6xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-8 lg:py-12">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col justify-center py-6 text-left"
          >
            <h1 className="font-heading text-[clamp(2.15rem,3.4vw,3.15rem)] font-bold leading-[1.12] tracking-[-0.015em] text-burgundy">
              A Spotless Car in Your Driveway Every Weekend Without Lifting a Finger.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-burgundy sm:text-lg">
              We come straight to your home for a full interior &amp; exterior
              car wash, with flexible weekly or bi-weekly memberships.
              Plant-based, non-toxic cleans safe for kids &amp; pets.
            </p>
            <div className="mt-8">
              <Button
                asChild
                className="h-14 px-8 text-base font-semibold tracking-[0.08em] bg-burgundy text-white hover:bg-pink-primary-hover"
              >
                <Link href="#route-schedule">
                  Book Now
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-xs tracking-wide text-burgundy/70 uppercase">
              Woman-owned · Safe for kids &amp; pets · From $140/mo
            </p>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto w-full max-w-sm"
          >
            {/* Native photo ratio ~734×980 — arched top like a window frame */}
            <div
              className="aspect-[3/4] w-full overflow-hidden"
              style={{
                borderRadius: "50% 50% 0.5rem 0.5rem / 18% 18% 0.5rem 0.5rem",
              }}
            >
              <CompareVisual className="h-full w-full" />
            </div>
          </motion.div>
        </div>

        {/* Mobile: centered copy + full-bleed portrait */}
        <div className="lg:hidden">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto flex w-full max-w-lg flex-col items-center px-5 pb-7 pt-12 text-center sm:px-8 sm:pb-9 sm:pt-14"
          >
            <h1 className="font-heading w-full text-[clamp(1.85rem,7.2vw,2.35rem)] font-bold leading-[1.12] tracking-[-0.02em] text-burgundy">
              A Spotless Car in Your Driveway Every Weekend Without Lifting a Finger.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-burgundy sm:mt-5 sm:text-lg">
              We come straight to your home for a full interior &amp; exterior
              car wash, with flexible weekly or bi-weekly memberships.
              Plant-based, non-toxic cleans safe for kids &amp; pets.
            </p>
            <div className="mt-6 sm:mt-7">
              <Button
                asChild
                className="h-14 rounded-sm px-10 text-base font-semibold tracking-[0.08em] bg-burgundy text-white hover:bg-pink-primary-hover"
              >
                <Link href="#route-schedule">Book Now</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs tracking-wide text-burgundy/70 uppercase">
              Woman-owned · Safe for kids &amp; pets · From $140/mo
            </p>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="w-full"
          >
            <div className="aspect-[3/4] w-full">
              <CompareVisual className="h-full w-full rounded-none shadow-none" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-white">
        <BrandCarousel />
      </div>
    </section>
  );
}
