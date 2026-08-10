"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const coastalItems = [
  {
    icon: Shield,
    title: "Asset Protection",
    description:
      "Automatic car wash brushes leave permanent swirl marks and micro-scratches. Our 100% hand wash uses soft microfibers and pH-balanced foam to protect your paint, ceramic finish, and resale value.",
  },
  {
    icon: Clock,
    title: "Zero Weekend Effort",
    description:
      "Stop wasting 2 hours sitting in car wash lobbies. We service your vehicle right on your driveway while you relax, work, or spend time with family.",
  },
  {
    icon: Heart,
    title: "Family & Pet Safe",
    description:
      "We remove crumbs, dog hair, and beach sand using gentle, non-toxic products. No harsh chemical fumes or synthetic residues left behind.",
  },
];

export function CoastalStack() {
  return (
    <section id="coastal-care" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-4xl font-medium leading-tight tracking-tight text-charcoal sm:text-5xl">
            Built for Coastal Families
          </h2>
          <p className="mt-4 text-slate">
            A bi-weekly mobile wash that feels like DoorDash for your driveway—
            safe products, woman-owned care, and a little love for the coast.
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
