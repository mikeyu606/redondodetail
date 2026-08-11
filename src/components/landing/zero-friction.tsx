"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Pick Your Saturday",
    description:
      "Newport Beach is live Saturdays 8 AM – 4 PM. Join the waitlist for Palos Verdes and South Bay / pool routes.",
    image: "/zero-friction-schedule.png",
    alt: "Hand scheduling a Her Driveway Club route on a phone",
  },
  {
    number: "02",
    title: "Park in Your Driveway",
    description:
      "We come to you bi-weekly. We'll text you 30 minutes before arrival—no keys needed, no waiting in lines. Just park in your driveway and we handle the rest.",
    image: "/how-it-works-step-2.jpg",
    alt: "Range Rover parked in a sunny modern Newport Beach driveway",
  },
  {
    number: "03",
    title: "We Clean It Every Two Weeks",
    description:
      "We give your SUV a full interior & exterior deep clean every two weeks on auto-pay. Pause anytime. Get your Saturdays back.",
    image: "/how-it-works-step-3.jpg",
    alt: "Woman opening her Range Rover after a driveway wash with coastal views",
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
