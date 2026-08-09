"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Pick Your Coastal Route",
    description:
      "Start with Newport Beach or Palos Verdes. Join the waitlist for South Bay—and pool routes once we’re live.",
    image: "/zero-friction-schedule.png",
    alt: "Hand scheduling a Her Driveway Club route on a phone",
  },
  {
    number: "02",
    title: "Park in Your Driveway",
    description:
      "We come to you bi-weekly. We'll text you 30 minutes before arrival—no keys needed, no waiting in lines. Just park in your driveway and we handle the rest.",
    image: "/zero-friction-driveway.png",
    alt: "Family SUV parked on a bright coastal driveway",
  },
  {
    number: "03",
    title: "Weekends Back on Autopilot",
    description:
      "One of our girls resets your SUV every two weeks on auto-pay. Pause anytime. Get your Saturdays back.",
    image: "/card3.png",
    alt: "Freshly washed white Tesla after Her Driveway Club visit",
    showNotification: true,
  },
];

export function ZeroFriction() {
  return (
    <section id="zero-friction" className="bg-white pb-6 pt-16 sm:pb-8 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-4xl font-medium tracking-tight text-charcoal sm:text-5xl">
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
                            HD
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <div className="flex items-baseline justify-between gap-2">
                            <p className="truncate font-brand text-sm leading-tight text-charcoal">
                              Her Driveway Club
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
