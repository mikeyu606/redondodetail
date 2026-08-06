"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const coastalItems = [
  {
    title: "Deep Sand Extraction",
    description:
      "High-lift vacuuming and compressed air pull embedded beach sand out of deep carpet fibers and seams.",
    image: "/coastal-sand.png",
    alt: "Macro shot of carpet fibers being vacuumed during deep sand extraction",
  },
  {
    title: "Salt Air Paint Protection",
    description:
      "Hydrophobic ceramic sealant helps neutralize salt-air oxidation and sticky ocean haze on paint and glass.",
    image: "/coastal-paint-v2.png",
    alt: "Water beading on gleaming paint with hydrophobic ceramic protection",
  },
  {
    title: "UV & Sunscreen Care",
    description:
      "Safe removal of sunscreen smudges from leather and door panels without stripping interior finishes.",
    image: "/coastal-leather-v2.png",
    alt: "Pristine leather interior bathed in warm sunlight after UV and sunscreen care",
  },
];

export function CoastalStack() {
  return (
    <section id="coastal-care" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl">
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
              <Card className="h-full overflow-hidden border-border bg-white pt-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <CardHeader className="pt-5">
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
