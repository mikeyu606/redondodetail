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
      <div className="bg-dusty-rose pt-16 sm:pt-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col px-4 sm:px-6 lg:min-h-[calc(100svh-5rem)] lg:grid lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col justify-start pb-6 pt-16 text-center sm:pt-10 lg:justify-center lg:py-8 lg:text-left"
          >
            <h1 className="font-display text-[clamp(2.5rem,8.5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-burgundy">
              Keep Your Vehicle Like New On Autopilot
            </h1>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-stone-700 sm:text-lg lg:mx-0">
              We protect and preserve your vehicle bi-weekly&mdash;freeing you
              from the drive-thru lines while you enjoy the coast.
            </p>
            <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Button
                asChild
                size="sm"
                className="h-10 px-5 text-xs tracking-[0.12em] bg-burgundy text-white hover:bg-pink-primary-hover"
              >
                <Link href="#pricing">
                  Reserve Your Bi-Weekly Slot
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-xs tracking-wide text-burgundy/70 uppercase">
              Fully insured · Coastal sand + salt care · 100% delight guarantee
            </p>
          </motion.div>

          {/* Desktop slider */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto hidden w-full max-w-md lg:block"
          >
            <div className="h-[min(64svh,580px)] aspect-[4/5] max-w-full overflow-hidden rounded-sm">
              <CompareVisual className="h-full w-full rounded-sm" />
            </div>
          </motion.div>
        </div>

        {/* Mobile: full-bleed portrait slider matching photo aspect */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-2 w-full lg:hidden"
        >
          <div className="aspect-[3/4] w-full max-h-[72svh]">
            <CompareVisual className="h-full w-full rounded-none shadow-none" />
          </div>
        </motion.div>
      </div>

      <div className="bg-white">
        <BrandCarousel />
      </div>
    </section>
  );
}
