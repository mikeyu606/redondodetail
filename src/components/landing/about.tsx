"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Sparkles, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-config";

export function About() {
  const { founderName, founderSchool } = siteConfig;

  return (
    <section id="about" className="relative overflow-hidden bg-beige py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 top-0 size-80 rounded-full bg-pink-medium/30 blur-3xl" />
        <div className="absolute -left-20 bottom-0 size-96 rounded-full bg-pink-light blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-pink-medium/40 to-blush-deep/60 blur-sm" />
            <div className="relative overflow-hidden rounded-3xl border-2 border-pink-medium/50 bg-white shadow-lg shadow-pink-medium/20">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/me.png"
                  alt={`${founderName}, founder of Redondo Detail`}
                  fill
                  className="object-cover object-[center_20%]"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  priority={false}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pink-primary/80 via-pink-primary/40 to-transparent px-6 pb-5 pt-16">
                <p className="text-lg font-semibold text-white">{founderName}</p>
                <p className="text-sm text-white/85">
                  Founder, Redondo Detail · Recent {founderSchool} grad
                </p>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
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

            <h2 className="font-serif text-3xl tracking-tight text-charcoal sm:text-4xl">
              Hi, I&apos;m {founderName}!
            </h2>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="gap-1.5 px-3 py-1">
                <GraduationCap className="size-3.5 text-pink-primary" />
                Recent {founderSchool} graduate
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                South Bay local
              </Badge>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-slate sm:text-lg">
              <p>
                I founded Redondo Detail to bring a higher standard of care,
                convenience, and trust to South Bay driveways.
              </p>
              <p>
                As a local, I saw how tedious it was for busy families and
                professionals to keep their cars pristine without wasting
                precious weekend hours at traditional car washes—or worrying
                about who was pulling onto their property. We built Redondo
                Detail as a high-trust, boutique auto spa on wheels: seamless
                bi-weekly maintenance, extreme attention to hidden details
                (like door jambs and streak-free inner glass), and total peace
                of mind for your home.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-pink-medium/40 bg-white/80 px-5 py-4 shadow-sm">
              <Heart className="mt-0.5 size-5 shrink-0 fill-pink-primary/20 text-pink-primary" />
              <p className="text-base font-medium leading-relaxed text-charcoal">
                When we&apos;re in your driveway, your vehicle is treated like
                our own.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
