"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Select Your Neighborhood",
    description:
      "Pick your recurring day and window (Tuesdays for North Redondo, Wednesdays for South Redondo).",
    image: "/zero-friction-schedule.png",
    alt: "Hand scheduling a Redondo Detail route on a phone",
  },
  {
    number: "02",
    title: "Park in Your Driveway",
    description:
      "We come to you bi-weekly—no keys needed, no waiting in lines. Just park in your driveway and we handle the rest.",
    image: "/zero-friction-driveway.png",
    alt: "Pristine luxury vehicle parked on a bright coastal South Bay driveway",
  },
  {
    number: "03",
    title: "Automatic Coastal Care",
    description:
      "Your car stays pristine 365 days a year on autopilot. Pause, reschedule, or cancel anytime in one click.",
    image: "/card3.png",
    alt: "Owner with freshly detailed white Tesla after Redondo Detail coastal care",
    showNotification: true,
  },
];

export function ZeroFriction() {
  return (
    <section id="zero-friction" className="bg-white pb-6 pt-16 sm:pb-8 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
          Set It Once. Enjoy All Year.
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="text-center md:text-left"
            >
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl bg-beige">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {"showNotification" in step && step.showNotification ? (
                  <div className="absolute inset-x-3 top-3 z-10 sm:inset-x-4 sm:top-4">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.35, duration: 0.45 }}
                      className="rounded-2xl bg-white/95 p-2.5 shadow-lg shadow-black/15 ring-1 ring-black/5 backdrop-blur-md"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-burgundy">
                          <span className="font-brand text-[10px] font-semibold leading-none text-white">
                            RD
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <div className="flex items-baseline justify-between gap-2">
                            <p className="truncate font-brand text-sm leading-tight text-charcoal">
                              Redondo Detail
                            </p>
                            <span className="shrink-0 text-[10px] text-slate">
                              now
                            </span>
                          </div>
                          <p className="mt-0.5 text-[11px] leading-snug text-slate">
                            Your bi-weekly care is complete!
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ) : null}
              </div>
              <span className="font-serif text-2xl text-burgundy/45">
                {step.number}
              </span>
              <h3 className="mt-1 text-lg font-semibold tracking-tight text-charcoal">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
