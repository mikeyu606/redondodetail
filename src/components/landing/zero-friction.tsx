"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Select Your Neighborhood Route",
    description:
      "Pick your recurring day and window (Tuesdays for North Redondo, Wednesdays for Hermosa/Manhattan).",
    image: "/zero-friction-schedule.png",
    alt: "Hand scheduling a Redondo Detail route on a phone",
  },
  {
    number: "02",
    title: "Park in Your Driveway",
    description:
      "No keys needed to meet us, no waiting in lines. We bring our own equipment and setup directly to your home.",
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
