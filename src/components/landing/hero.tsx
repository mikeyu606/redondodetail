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

function CompareVisual({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm bg-beige/90 shadow-xl shadow-burgundy/15 ${className ?? ""}`}
    >
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src="/hero-before.png"
            alt="Before detail condition"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="/hero-after.png"
            alt="After detail finish"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        }
        className="h-full w-full"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      <div className="absolute left-3 top-3 rounded-full bg-charcoal/65 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/95 backdrop-blur-sm">
        Before
      </div>
      <div className="absolute right-3 top-3 rounded-full bg-charcoal/65 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/95 backdrop-blur-sm">
        After
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="flex min-h-[100svh] flex-col overflow-hidden bg-dusty-rose pt-16 sm:pt-20">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-1 flex-col justify-center py-6 text-center lg:flex-none lg:py-8 lg:text-left"
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

        {/* Mobile: interactive slider teased at bottom (handle stays visible) */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto w-full max-w-lg shrink-0 pb-2 lg:hidden"
        >
          <CompareVisual className="h-[28svh] w-full" />
        </motion.div>

        {/* Desktop: full tall slider */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto hidden w-full max-w-md lg:block"
        >
          <CompareVisual className="mx-auto h-[min(64svh,580px)] aspect-[4/5] max-w-full" />
        </motion.div>
      </div>
    </section>
  );
}
