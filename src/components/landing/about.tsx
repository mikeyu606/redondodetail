"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Sparkles, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-config";

export function About() {
  const { founderName, founderSchool } = siteConfig;

  return (
    <section id="about" className="relative overflow-hidden bg-white py-20 sm:py-28">
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
                  src="/founder-mia.png"
                  alt={`${founderName}, founder of Redondo Detail`}
                  fill
                  className="object-cover object-[center_15%]"
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

            <h2 className="font-heading text-4xl font-medium tracking-tight text-charcoal sm:text-5xl">
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
                We believe that stepping into a pristine vehicle sets the tone
                for your entire day—and that a great car is an asset worth
                preserving.
              </p>
              <p>
                As a lifelong car enthusiast, I founded Redondo Detail out of a
                genuine passion for fine automobiles and a frustration with how
                quickly coastal salt, sun, and harsh drive-thru brushes ruin
                them.
              </p>
              <p>
                I saw how tedious it was for busy locals to keep their vehicles
                immaculate without wasting precious weekend hours at traditional
                car washes—or worrying about who was pulling onto their
                property.
              </p>
              <p>
                We built this service to give South Bay drivers a higher
                standard of care: precision, paint-safe preservation and
                effortless bi-weekly maintenance right in your driveway. Because
                when you love what you drive, keeping it showroom-ready should
                feel completely seamless.
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
