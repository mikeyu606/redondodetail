"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
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
      <div className="bg-dusty-rose pt-14 sm:pt-16">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 pb-8 pt-10 text-center sm:px-8 sm:pb-10 sm:pt-12"
        >
          <h1 className="font-display text-[clamp(2.25rem,8vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight text-burgundy">
            Keep Your Vehicle Like New On Autopilot
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-burgundy sm:text-lg">
            Complete interior and exterior coastal care every two
            weeks&mdash;freeing you from car wash lines while you enjoy the
            beach.
          </p>
          <div className="mt-7">
            <Button
              asChild
              size="default"
              className="h-11 rounded-sm px-8 text-xs tracking-[0.14em] bg-burgundy text-white hover:bg-pink-primary-hover"
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
          <div className="aspect-[4/5] w-full sm:aspect-[16/11] sm:max-h-[min(70svh,720px)]">
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
