"use client";

import { motion } from "framer-motion";
import { MapPin, Home, Waves } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Select Your Neighborhood Route",
    description:
      "Pick your recurring day and window (Tuesdays for North Redondo, Wednesdays for Hermosa/Manhattan).",
  },
  {
    number: "02",
    icon: Home,
    title: "Park in Your Driveway",
    description:
      "No keys needed to meet us, no waiting in lines. We bring our own water and setup directly to your home.",
  },
  {
    number: "03",
    icon: Waves,
    title: "Automatic Coastal Care",
    description:
      "Your car stays pristine 365 days a year on autopilot. Pause, reschedule, or cancel anytime in one click.",
  },
];

export function ZeroFriction() {
  return (
    <section className="bg-beige pb-6 pt-16 sm:pb-8 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-serif text-3xl tracking-tight text-charcoal sm:text-4xl">
          Zero Friction
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
              <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
                <span className="font-serif text-3xl text-burgundy/40">
                  {step.number}
                </span>
                <div className="flex size-9 items-center justify-center rounded-full bg-dusty-rose/40">
                  <step.icon className="size-4 text-burgundy" />
                </div>
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-charcoal">
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
