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
      <div className="bg-white pt-16 sm:pt-16 lg:pt-16">
        {/* Desktop: two-column */}
        <div className="mx-auto hidden w-full max-w-6xl px-4 sm:px-6 lg:grid lg:min-h-[calc(100svh-5rem)] lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-8 lg:pb-10">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col justify-center py-8 text-left"
          >
            <h1 className="font-heading text-[clamp(2.6rem,4.6vw,4rem)] font-bold leading-[1.1] tracking-[-0.015em] text-burgundy">
              Never Wait in Line for a Car Wash Again
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-burgundy sm:text-lg">
              Eco-chic, non-toxic washes delivered right to your doorstep.
              We keep your family SUV spotless on autopilot.
            </p>
            <div className="mt-7">
              <Button
                asChild
                size="sm"
                className="h-10 px-5 text-xs tracking-[0.12em] bg-burgundy text-white hover:bg-pink-primary-hover"
              >
                <Link href="#route-schedule">
                  Reserve Your Bi-Weekly Slot
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-xs tracking-wide text-burgundy/70 uppercase">
              Woman-owned · Non-toxic & pet-safe · From $180/mo
            </p>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto w-full max-w-md"
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
            <h1 className="font-heading w-full text-[clamp(2.35rem,9vw,2.85rem)] font-bold leading-[1.08] tracking-[-0.02em] text-burgundy">
              Never Wait in Line for a Car Wash Again
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-burgundy sm:mt-5 sm:text-lg">
              Eco-chic, non-toxic washes delivered right to your doorstep.
              We keep your family SUV spotless on autopilot.
            </p>
            <div className="mt-5 sm:mt-6">
              <Button
                asChild
                size="sm"
                className="h-10 rounded-sm px-6 text-xs tracking-[0.12em] bg-burgundy text-white hover:bg-pink-primary-hover"
              >
                <Link href="#route-schedule">Reserve Your Slot</Link>
              </Button>
            </div>
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
