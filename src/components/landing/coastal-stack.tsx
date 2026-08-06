"use client";

import { motion } from "framer-motion";
import { Waves, Wind, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const coastalItems = [
  {
    icon: Wind,
    title: "Deep Sand Extraction",
    description:
      "High-lift vacuuming and compressed air pull embedded beach sand out of deep carpet fibers and seams.",
  },
  {
    icon: Waves,
    title: "Salt Air Paint Protection",
    description:
      "Hydrophobic ceramic sealant helps neutralize salt-air oxidation and sticky ocean haze on paint and glass.",
  },
  {
    icon: Sun,
    title: "UV & Sunscreen Care",
    description:
      "Safe removal of sunscreen smudges from leather and door panels without stripping interior finishes.",
  },
];

export function CoastalStack() {
  return (
    <section id="coastal-care" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="default" className="mb-4">
            Engineered For Coastal Life
          </Badge>
          <h2 className="font-serif text-3xl leading-tight text-burgundy sm:text-4xl">
            Coastal Protection System
          </h2>
          <p className="mt-4 text-slate">
            Not just a wash. Sand and salt armor built for Redondo, Hermosa,
            Manhattan Beach, and Palos Verdes.
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
