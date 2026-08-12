"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const coastalItems = [
  {
    icon: Heart,
    title: "Non-Toxic & Family Safe",
    description:
      "Crushed snacks, dog hair, and beach sand vanish without a trace. We deep-clean the interior with plant-based, pet-safe formulas—safe for kids and pets, with zero harsh chemical fumes.",
  },
  {
    icon: Clock,
    title: "Reclaim 2 Hours Every Weekend",
    description:
      "Stop wasting sunny Saturdays sitting in loud car wash lobbies or waiting in drive-thru lines. We service your vehicle right in your driveway while you work, relax, or spend time with family.",
  },
  {
    icon: Shield,
    title: "Preserve Paint & Resale Value",
    description:
      "Automatic wash brushes leave permanent swirl marks and micro-scratches on clear coats. Our scratch-free hand wash uses ultra-soft microfibers and pH-balanced foam to protect your luxury SUV’s finish and long-term value.",
  },
];

export function CoastalStack() {
  return (
    <section id="coastal-care" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-4xl font-medium leading-tight tracking-tight text-charcoal sm:text-5xl">
          Never Wait in Line at a Car Wash Again
          </h2>
          <p className="mt-4 text-slate">
          A bi-weekly driveway membership that saves you time, your car paint, and protects your children and pets from harsh chemicals.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {coastalItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
            >
              <Card className="h-full border-border bg-white">
                <CardHeader>
                  <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-dusty-rose/35">
                    <item.icon className="size-5 text-burgundy" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-slate">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
