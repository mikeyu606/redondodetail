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
    <section className="bg-dusty-rose pt-24 sm:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 py-16 sm:py-20 lg:grid-cols-2 lg:gap-10 lg:py-24">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center lg:text-left"
          >
            <h1 className="font-serif text-4xl leading-[1.1] tracking-tight text-stone-900 sm:text-5xl lg:text-[3.5rem]">
              Boutique mobile detailing, right in your driveway.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-stone-700 sm:text-lg lg:mx-0">
              Bi-weekly detailing for South Bay families and professionals -
              fully insured, self-contained, and on autopilot.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Button asChild size="lg" className="min-w-[200px]">
                <Link href="#pricing">
                  Lock In Bi-Weekly Slot
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Link
                href="#route-schedule"
                className="text-sm font-medium text-burgundy/70 underline-offset-4 transition-colors hover:text-burgundy hover:underline"
              >
                View neighborhood routes
              </Link>
            </div>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto w-full max-w-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-beige/90 shadow-xl shadow-burgundy/15">
              <ReactCompareSlider
                itemOne={
                  <ReactCompareSliderImage
                    src="/Screenshot 2026-08-06 at 2.54.02 AM.png"
                    alt="Before detail condition"
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src="/Screenshot 2026-08-06 at 2.54.10 AM.png"
                    alt="After detail finish"
                  />
                }
                handle={
                  <button
                    aria-label="Drag to compare before and after"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white shadow-md"
                  >
                    <span className="text-xs font-semibold tracking-wide text-burgundy">
                      ↔
                    </span>
                  </button>
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

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="border-t border-burgundy/15 py-6 text-center text-xs tracking-wide text-burgundy/70 uppercase"
        >
          Fully insured · Coastal sand + salt care · 100% delight guarantee
        </motion.p>
      </div>
    </section>
  );
}
