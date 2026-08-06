"use client";

import { motion } from "framer-motion";
import {
  DoorOpen,
  GlassWater,
  Wind,
  CircleDot,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const details = [
  {
    icon: DoorOpen,
    title: "Door & Trunk Jambs",
    description:
      "Wiping hidden grease and dust in door surrounds — the spots every tunnel wash skips.",
  },
  {
    icon: GlassWater,
    title: "Zero Streak Interior Glass",
    description:
      "Fog-free inner windshield clarity with microfiber technique for a crystal-clear view.",
  },
  {
    icon: Wind,
    title: "Crevices & AC Vents",
    description:
      "Air-compressed dusting out seat tracks, console gaps, and AC vents for a factory-fresh feel.",
  },
  {
    icon: CircleDot,
    title: "Satin Finish Rubber",
    description:
      "Rich, OEM matte tire dressing without greasy paint sling — clean lines, every time.",
  },
];

export function DifferenceGrid() {
  return (
    <section id="services" className="border-y border-pink-medium/30 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            The Details Other Car Washes Ignore
          </h2>
          <p className="mt-4 text-slate">
            We obsess over the hidden areas that separate a good wash from a
            true auto spa experience.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Card className="group h-full transition-all duration-300 hover:border-pink-primary/30 hover:shadow-md hover:shadow-pink-medium/10">
                <CardHeader>
                  <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-pink-light ring-1 ring-pink-medium/40 transition-colors group-hover:bg-pink-medium/30">
                    <item.icon className="size-6 text-pink-primary" />
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
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
