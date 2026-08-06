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
      <div className="h-full w-full animate-pulse rounded-sm bg-beige/80" />
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
    <section className="flex flex-col overflow-hidden bg-beige pt-16 sm:pt-20">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 sm:px-6 lg:min-h-[calc(100svh-5rem)] lg:grid lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-1 flex-col justify-start pb-6 pt-12 text-center sm:pt-10 lg:flex-none lg:justify-center lg:py-8 lg:text-left"
        >
          <h1 className="font-serif text-[clamp(2.5rem,8.5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-stone-900">
            A Pristine Vehicle Every Single Day
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-stone-700 sm:text-lg lg:mx-0">
            We keep your vehicle pristine bi-weekly&mdash;freeing you from
            the drive-thru lines while you enjoy the coast.
          </p>
          <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Button
              asChild
              size="sm"
              className="h-10 px-5 text-xs tracking-[0.12em] bg-burgundy text-white hover:bg-burgundy/90"
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

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="w-full shrink-0 max-lg:-mx-4 max-lg:w-[calc(100%+2rem)] sm:max-lg:-mx-6 sm:max-lg:w-[calc(100%+3rem)] lg:mx-auto lg:max-w-md"
        >
          <div className="h-[32svh] w-full lg:h-[min(64svh,580px)] lg:aspect-[4/5] lg:max-w-full lg:rounded-sm lg:overflow-hidden">
            <CompareVisual className="h-full w-full max-lg:rounded-none lg:rounded-sm" />
          </div>
        </motion.div>
      </div>

      <BrandCarousel />
    </section>
  );
}
