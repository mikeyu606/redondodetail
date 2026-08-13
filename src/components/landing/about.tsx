"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-config";

export function About() {
  const { founderName, founderSchool, businessName } = siteConfig;

  return (
    <section id="about" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 top-0 size-80 rounded-full bg-pink-medium/30 blur-3xl" />
        <div className="absolute -left-20 bottom-0 size-96 rounded-full bg-pink-light blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm lg:max-w-md"
          >
            <div className="relative overflow-hidden rounded-3xl border-2 border-pink-medium/50 bg-white shadow-lg shadow-pink-medium/20">
              <div className="relative aspect-square w-full">
                <Image
                  src="/founder-sophie-v2.jpg"
                  alt={`${founderName}, founder of ${businessName}`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 90vw, 420px"
                  priority={false}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pink-primary/80 via-pink-primary/40 to-transparent px-6 pb-5 pt-16">
                <p className="text-lg font-semibold text-white">{founderName}</p>
                <p className="text-sm text-white/85">
                  Founder, {businessName} · Recent {founderSchool} grad
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <Badge variant="default" className="px-4 py-1.5">
              <Sparkles className="mr-1.5 size-3.5" />
              Meet the Founder
            </Badge>

            <h2 className="section-title text-charcoal">
              Hi, I&apos;m {founderName}!
            </h2>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="gap-1.5 px-3 py-1">
                <GraduationCap className="size-3.5 text-pink-primary" />
                Recent {founderSchool} graduate
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Woman-owned
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                4.5+ yr of experience
              </Badge>
            </div>

            <div className="lede space-y-4 text-slate">
              <p>
                I built {businessName} out of a simple realization: busy coastal
                families shouldn&apos;t have to choose between a clean vehicle and
                spending quality time together on the weekend.
              </p>
              <p>
                Traditional car washes waste precious Saturday hours, leave
                harsh chemical fumes inside family cabins, and strip away your
                free time. I knew there had to be an elevated, non-toxic
                alternative—one built around plant-derived formulas, immaculate
                detail, and a team you genuinely trust pulling into your
                driveway.
              </p>
              <p>
                We are building this neighborhood by neighborhood, taking
                vehicle care entirely off your to-do list so you can get your
                weekends back.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
