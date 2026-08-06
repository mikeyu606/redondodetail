"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProofCard = {
  id: string;
  name: string;
  quote: string;
  afterLabel: string;
  beforeSrc: string;
  afterSrc: string;
};

const proofCards: ProofCard[] = [
  {
    id: "sand",
    name: "Jordan",
    quote:
      "Beach sand was everywhere after Hermosa. One visit and the carpets looked brand new.",
    afterLabel: "After 1 visit",
    beforeSrc: "/hero-before.png",
    afterSrc: "/hero-after.png",
  },
  {
    id: "interior",
    name: "Maya",
    quote:
      "I never have to think about wash day anymore. Bi-weekly and my SUV always looks spotless.",
    afterLabel: "After 2 weeks",
    beforeSrc:
      "https://images.unsplash.com/photo-1771491237218-cbd4a707497e?w=800&q=80&auto=format&fit=crop",
    afterSrc:
      "https://images.unsplash.com/photo-1656077884513-efd5e02193af?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "console",
    name: "Alex",
    quote:
      "Door jambs and vents finally get cleaned. You can tell they care about the tiny details.",
    afterLabel: "After 1 month",
    beforeSrc:
      "https://images.unsplash.com/photo-1771491237225-01931a752f58?w=800&q=80&auto=format&fit=crop",
    afterSrc: "/door.png",
  },
  {
    id: "family",
    name: "Sam",
    quote:
      "With kids and beach days, this subscription is the only thing that keeps up.",
    afterLabel: "After 3 months",
    beforeSrc: "/hero-before.png",
    afterSrc: "/hero-after.png",
  },
];

export function Transformations() {
  return (
    <section id="transformations" className="bg-beige py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            South Bay drivers keep their cars pristine on autopilot*
          </h2>
          <Button
            asChild
            size="sm"
            className="h-10 shrink-0 self-start bg-burgundy px-5 text-xs tracking-[0.12em] text-white hover:bg-burgundy/90 sm:mt-1"
          >
            <Link href="#pricing">
              Reserve Your Slot
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 -mx-4 overflow-x-auto pb-2 sm:-mx-6 lg:mx-0 lg:overflow-visible">
          <div className="flex w-max snap-x snap-mandatory gap-4 px-4 sm:gap-5 sm:px-6 lg:w-full lg:max-w-none lg:snap-none lg:gap-6 lg:px-0 lg:overflow-visible">
            {proofCards.map((card, index) => (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
                className="w-[78vw] max-w-[300px] shrink-0 snap-center sm:w-[280px] lg:w-auto lg:max-w-none lg:flex-1"
              >
                <div className="grid grid-cols-2 overflow-hidden rounded-sm">
                  <div className="relative aspect-square bg-pink-soft">
                    <Image
                      src={card.beforeSrc}
                      alt={`${card.name} before detailing`}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                    <span className="absolute left-2 top-2 bg-burgundy px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Before
                    </span>
                  </div>
                  <div className="relative aspect-square bg-pink-soft">
                    <Image
                      src={card.afterSrc}
                      alt={`${card.name} after detailing`}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                    <span className="absolute left-2 top-2 bg-burgundy px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      {card.afterLabel}
                    </span>
                  </div>
                </div>

                <p className="mt-2 text-xs text-slate/70">Results may vary</p>

                <p
                  className="mt-4 font-serif text-3xl leading-none text-burgundy"
                  aria-hidden
                >
                  &ldquo;
                </p>
                <p className="mt-1 text-base font-semibold text-charcoal">
                  {card.name}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">
                  {card.quote}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <p className="mt-10 text-xs text-slate/60">
          *Based on subscriber feedback from recurring South Bay routes. Individual
          results may vary by vehicle condition and visit frequency.
        </p>
      </div>
    </section>
  );
}
