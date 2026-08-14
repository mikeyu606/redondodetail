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

const HERO_SUBTEXT =
  "We come straight to your home for a full interior & exterior car wash, with flexible weekly or bi-weekly memberships. Plant-based, non-toxic cleans safe for kids & pets.";

const TRUST_ITEMS = ["Woman-owned", "Safe for kids & pets", "From $100/mo"] as const;

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

function HeroCopy() {
  return (
    <>
      <span className="inline-flex w-fit items-center rounded-full border border-burgundy/20 bg-white/60 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-burgundy shadow-sm backdrop-blur-sm">
        Limited spots
      </span>

      <h1 className="hero-title mt-4 text-balance text-burgundy sm:mt-5">
        A Spotless Car in Your Driveway Every Weekend Without Lifting a Finger.
      </h1>

      <p className="lede mt-4 max-w-lg text-burgundy/85 sm:mt-5">
        {HERO_SUBTEXT}
      </p>

      <div className="mt-6 sm:mt-8">
        <Button
          asChild
          className="h-11 rounded-full px-7 text-sm font-semibold tracking-wide shadow-lg shadow-burgundy/25 bg-burgundy text-white hover:bg-pink-primary-hover sm:h-12 sm:px-8 sm:text-base"
        >
          <Link href="#route-schedule">
            Book Now
            <ArrowRight className="size-4 sm:size-5" />
          </Link>
        </Button>
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-[11px] font-medium uppercase tracking-[0.1em] text-burgundy/65 sm:mt-6">
        {TRUST_ITEMS.map((item, i) => (
          <li key={item} className="flex items-center gap-3">
            {i > 0 && (
              <span aria-hidden className="hidden size-1 rounded-full bg-burgundy/30 sm:block" />
            )}
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

function HeroVisual({ variant }: { variant: "desktop" | "mobile" }) {
  if (variant === "desktop") {
    return (
      <div
        className="aspect-[3/4] w-full overflow-hidden shadow-2xl shadow-burgundy/15 ring-1 ring-white/60"
        style={{
          borderRadius: "50% 50% 0.5rem 0.5rem / 18% 18% 0.5rem 0.5rem",
        }}
      >
        <CompareVisual className="h-full w-full" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl shadow-xl shadow-burgundy/10 ring-1 ring-white/50">
      <div className="aspect-[4/5] w-full sm:aspect-[3/4]">
        <CompareVisual className="h-full w-full rounded-none shadow-none" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="flex flex-col">
      <div className="bg-dusty-rose pt-16">
        {/* Desktop */}
        <div className="mx-auto hidden w-full max-w-6xl px-4 sm:px-6 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-8 lg:py-14 xl:gap-16">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col items-start justify-center py-6 text-left"
          >
            <HeroCopy />
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto w-full max-w-sm lg:max-w-none"
          >
            <HeroVisual variant="desktop" />
          </motion.div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto w-full max-w-lg px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12"
          >
            <HeroCopy />
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto w-full max-w-lg px-5 pb-10 sm:px-8 sm:pb-12"
          >
            <HeroVisual variant="mobile" />
          </motion.div>
        </div>
      </div>

      <div className="bg-white">
        <BrandCarousel />
      </div>
    </section>
  );
}
