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
    beforeSrc: "/reviews/1.png",
    afterSrc: "/reviews/2.png",
  },
  {
    id: "interior",
    name: "Lauren",
    quote:
      "You have to check out this woman-owned mobile car service—she comes every two weeks on auto-pay and the interior looks brand new. Lifesaver for our family.",
    afterLabel: "After 2 weeks",
    beforeSrc: "/reviews/3.png",
    afterSrc: "/reviews/4.png",
  },
  {
    id: "console",
    name: "Alex",
    quote:
      "Door jambs and vents finally get cleaned. You can tell they care about the tiny details.",
    afterLabel: "After 1 month",
    beforeSrc: "/reviews/5.png",
    afterSrc: "/reviews/6.png",
  },
];

export function Transformations() {
  return (
    <section id="transformations" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="font-heading max-w-xl text-3xl font-medium tracking-tight text-charcoal sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Newport parents get their weekends back on autopilot*
          </h2>
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

        <div className="mt-12 grid gap-8 sm:gap-6 md:grid-cols-3 md:gap-8">
          {proofCards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.35 }}
              className="flex flex-col"
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
              <p className="mt-1 text-lg font-semibold text-charcoal">
                {card.name}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-slate">
                {card.quote}
              </p>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-xs text-slate/60">
          *Based on subscriber feedback from recurring South Bay routes. Individual
          results may vary by vehicle condition and visit frequency.
        </p>
      </div>
    </section>
  );
}
