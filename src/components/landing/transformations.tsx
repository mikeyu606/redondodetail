"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileCarousel } from "@/components/landing/mobile-carousel";

type ProofCard = {
  id: string;
  name: string;
  location: string;
  quote: string;
  afterLabel: string;
  beforeSrc: string;
  afterSrc: string;
};

const proofCards: ProofCard[] = [
  {
    id: "exterior",
    name: "Sarah M.",
    location: "Newport Coast",
    quote:
      "Between soccer practice and school runs, our Q7 was constantly coated in dust and salt air. Having Her Driveway Club reset it every two weeks on autopilot is absolute magic. The paint stays glowing and I never have to spend my Saturdays in line.",
    afterLabel: "After 1 visit",
    beforeSrc: "/reviews/5.png",
    afterSrc: "/reviews/6.png",
  },
  {
    id: "interior",
    name: "Lauren K.",
    location: "Balboa Island",
    quote:
      "The coffee spills and dusty vents were driving me crazy, but I hate the chemical smell of regular car washes. Her Driveway Club leaves the interior completely spotless with zero harsh fumes. My kids actually noticed how fresh the cabin felt!",
    afterLabel: "After 2 weeks",
    beforeSrc: "/reviews/3.png",
    afterSrc: "/reviews/4.png",
  },
  {
    id: "carpet",
    name: "Jessica T.",
    location: "Eastbluff",
    quote:
      "After weekend beach trips with two toddlers and a golden retriever, our carpets were a disaster area. One visit and the sand was completely gone. Getting our cabin reset while taking Zoom calls inside is the ultimate life hack.",
    afterLabel: "After 1 visit",
    beforeSrc: "/reviews/1.png",
    afterSrc: "/reviews/2.png",
  },
];

export function Transformations() {
  return (
    <section id="transformations" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-medium tracking-tight text-charcoal sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Our back seats used to be disaster zones.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
              See how local coastal families keep their SUVs pristine, non-toxic,
              and beach-ready without lifting a finger.
            </p>
          </div>
          <Button
            asChild
            size="sm"
            className="h-10 shrink-0 self-start bg-burgundy px-5 text-xs tracking-[0.12em] text-white hover:bg-pink-primary-hover sm:mt-1"
          >
            <Link href="#pricing">
              Reserve Your Slot
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>

        <MobileCarousel
          className="mt-12"
          desktopClassName="md:grid-cols-3 md:gap-8"
        >
          {proofCards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.35 }}
              className="flex w-[82vw] max-w-sm shrink-0 snap-center flex-col md:w-auto md:max-w-none"
            >
              <div className="overflow-hidden rounded-sm ring-1 ring-border/80">
                <div className="grid grid-cols-2">
                  <div className="relative aspect-[4/5] bg-pink-soft sm:aspect-[3/4]">
                    <Image
                      src={card.beforeSrc}
                      alt={`${card.name} before detailing`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 20vw"
                      draggable={false}
                    />
                    <span className="absolute left-2.5 top-2.5 bg-burgundy px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                      Before
                    </span>
                  </div>
                  <div className="relative aspect-[4/5] bg-pink-soft sm:aspect-[3/4]">
                    <Image
                      src={card.afterSrc}
                      alt={`${card.name} after detailing`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 20vw"
                      draggable={false}
                    />
                    <span className="absolute left-2.5 top-2.5 bg-burgundy px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                      {card.afterLabel}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-2.5 text-xs text-slate/70">Results may vary</p>
              <p
                className="mt-4 font-serif text-3xl leading-none text-burgundy"
                aria-hidden
              >
                &ldquo;
              </p>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <p className="text-lg font-semibold text-charcoal">{card.name}</p>
                <p className="text-sm text-slate">{card.location}</p>
              </div>
              <p
                className="mt-1 text-sm tracking-wide text-burgundy"
                aria-label="5 out of 5 stars"
              >
                ★★★★★
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-slate">
                {card.quote}
              </p>
            </motion.article>
          ))}
        </MobileCarousel>

        <p className="mt-8 text-xs text-slate/60">
          Individual results may vary by vehicle condition and visit frequency.
        </p>
      </div>
    </section>
  );
}
