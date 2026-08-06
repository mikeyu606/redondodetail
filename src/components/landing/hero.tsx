"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { Button } from "@/components/ui/button";

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
    <section className="flex min-h-[100svh] flex-col overflow-hidden bg-beige pt-16 sm:pt-20">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-1 flex-col justify-center py-8 text-center lg:flex-none lg:py-8 lg:text-left"
        >
          <h1 className="font-serif text-[clamp(2.5rem,8.5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-stone-900">
            Your boutique mobile detailing, right in your driveway.
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
          className="relative mx-auto w-full max-w-md shrink-0 max-lg:h-[24svh] max-lg:overflow-hidden lg:h-auto lg:overflow-visible"
        >
          <div className="relative mx-auto overflow-hidden rounded-sm bg-beige/90 shadow-xl shadow-burgundy/15 max-lg:absolute max-lg:inset-x-0 max-lg:top-0 max-lg:h-[70svh] max-lg:w-full lg:h-[min(64svh,580px)] lg:aspect-[4/5] lg:max-w-full">
            <ReactCompareSlider
              itemOne={
                <ReactCompareSliderImage
                  src="/hero-before.png"
                  alt="Before detail condition"
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src="/hero-after.png"
                  alt="After detail finish"
                />
              }
              className="h-full w-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            <div className="absolute left-4 top-4 rounded-full bg-charcoal/65 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/95 backdrop-blur-sm">
              Before
            </div>
            <div className="absolute right-4 top-4 rounded-full bg-charcoal/65 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/95 backdrop-blur-sm">
              After
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
