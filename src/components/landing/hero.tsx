"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

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
  const { hero } = siteConfig;

  return (
    <section className="bg-dusty-rose pt-24 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center lg:text-left"
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-burgundy/70">
              ✨ Woman-Owned · South Bay Coastal Care
            </p>
            <h1 className="font-serif text-4xl leading-[1.1] text-burgundy sm:text-5xl lg:text-[3.5rem]">
              Boutique mobile detailing, right in your driveway.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-burgundy/80 sm:text-lg lg:mx-0">
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-beige/90 shadow-xl shadow-burgundy/15 ring-2 ring-beige/60">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                className="object-contain object-center p-1"
                sizes="(max-width: 1024px) 85vw, 420px"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-burgundy/15 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
                <span className="rounded-full bg-charcoal/50 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/90 backdrop-blur-sm">
                  Door jamb detail
                </span>
                <Link
                  href="#transformations"
                  className="whitespace-nowrap rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-burgundy shadow-md transition-colors hover:bg-white"
                >
                  Bi-weekly from $100/visit
                </Link>
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
