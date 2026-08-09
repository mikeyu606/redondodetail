"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Sparkles, GraduationCap } from "lucide-react";
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
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-pink-medium/40 to-blush-deep/60 blur-sm" />
            <div className="relative overflow-hidden rounded-3xl border-2 border-pink-medium/50 bg-white shadow-lg shadow-pink-medium/20">
              <div className="relative aspect-square w-full">
                <Image
                  src="/founder-sophie.png"
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

            <h2 className="font-heading text-4xl font-medium tracking-tight text-charcoal sm:text-5xl">
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
                Launching in Newport
              </Badge>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-slate sm:text-lg">
              <p>
                {businessName} is a woman-owned, white-glove doorstep concierge
                resetting family SUVs so busy parents get their weekends back.
              </p>
              <p>
                I started this because every car-wash option felt the same: a
                guy with a hose, a long line, and another Saturday gone. Coastal
                families deserve something easier—and someone they actually
                trust pulling into the driveway.
              </p>
              <p>
                We&apos;re building it the founder way: high energy, local, and
                personal. One of our girls comes out, washes your car
                bi-weekly, and leaves the interior looking brand new—on
                auto-pay, like DoorDash for your driveway.
              </p>
              <p>
                Launching in Newport Beach coastal zips first, then expanding
                route by route (and yes—pool routes are on the roadmap once
                you&apos;re hooked).
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-pink-medium/40 bg-white/80 px-5 py-4 shadow-sm">
              <Heart className="mt-0.5 size-5 shrink-0 fill-pink-primary/20 text-pink-primary" />
              <p className="text-base font-medium leading-relaxed text-charcoal">
                Women supporting women—because when every competitor is another
                guy with a sprayer, memorability matters.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
