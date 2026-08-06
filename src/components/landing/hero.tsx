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
    <section className="flex min-h-[100svh] flex-col bg-dusty-rose pt-16 sm:pt-20">
      <div className="mx-auto flex w-full max-w-6xl flex-1 items-center px-4 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-6 py-6 lg:grid-cols-2 lg:gap-8 lg:py-8">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center lg:text-left"
          >
            <h1 className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-stone-900">
              Your boutique mobile detailing, right in your driveway.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-stone-700 sm:text-lg lg:mx-0">
              We keep your vehicle pristine bi-weekly&mdash;freeing you from
              the drive-thru lines while you enjoy the coast.
            </p>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Button asChild size="lg" className="min-w-[200px]">
                <Link href="#pricing">
                  Reserve Your Bi-Weekly Slot
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-3 text-xs tracking-wide text-burgundy/70 uppercase">
              Fully insured · Coastal sand + salt care · 100% delight guarantee
            </p>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto w-full max-w-md"
          >
            <div className="relative mx-auto h-[min(64svh,580px)] aspect-[4/5] max-w-full overflow-hidden rounded-sm bg-beige/90 shadow-xl shadow-burgundy/15">
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
      </div>
    </section>
  );
}
