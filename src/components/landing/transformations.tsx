"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type WorkCard = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  objectPosition?: string;
  overlayCopy?: string;
};

const workCards: WorkCard[] = [
  {
    id: "door-jamb",
    title: "Door Jamb Reset",
    subtitle: "north redondo detail day",
    image:
      "https://images.unsplash.com/photo-1619642751034-611fe542faeb?w=1400&q=80&auto=format&fit=crop",
    objectPosition: "center",
    overlayCopy: "Hidden grease and dust fully reset.",
  },
  {
    id: "brand-finish",
    title: "Gloss + Trim Finish",
    subtitle: "manhattan beach evening route",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1400&q=80&auto=format&fit=crop",
    objectPosition: "center 38%",
    overlayCopy: "Gloss restored with streak-free clarity.",
  },
  {
    id: "badge-detail",
    title: "Badge + Hood Detail",
    subtitle: "precision finish on dark paint",
    image:
      "https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?w=1400&q=80&auto=format&fit=crop",
    objectPosition: "center 58%",
    overlayCopy: "Fine dust and film removed around emblems.",
  },
  {
    id: "door-jamb-repeat",
    title: "Seam + Hinge Precision",
    subtitle: "hermosa beach weekly maintenance",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80&auto=format&fit=crop",
    objectPosition: "58% center",
    overlayCopy: "Sand and salt lifted from hidden seams.",
  },
];

export function Transformations() {
  const [activeId, setActiveId] = useState(workCards[1].id);

  return (
    <section id="transformations" className="bg-beige py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
            Work &amp; Transformations
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate sm:text-lg">
            From beach days to school pickups, see how we keep South Bay
            vehicles spotless between the moments that matter.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto pb-4">
          <div className="flex min-w-max snap-x snap-mandatory gap-4 sm:gap-5">
            {workCards.map((card, index) => (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
                onClick={() => setActiveId(card.id)}
                className={cn(
                  "shrink-0 snap-center cursor-pointer transition-all duration-300",
                  activeId === card.id
                    ? "w-[285px] sm:w-[350px]"
                    : "w-[230px] sm:w-[270px]"
                )}
              >
                <div
                  className={cn(
                    "relative aspect-[3/4] overflow-hidden rounded-xl bg-pink-soft shadow-sm transition-all duration-300",
                    activeId === card.id
                      ? "ring-2 ring-burgundy/40 shadow-lg shadow-burgundy/20"
                      : "ring-1 ring-border/80"
                  )}
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className={cn(
                      "object-cover transition duration-300",
                      activeId === card.id
                        ? "scale-[1.02] saturate-110"
                        : "saturate-75"
                    )}
                    style={{ objectPosition: card.objectPosition ?? "center" }}
                    sizes="(max-width: 640px) 250px, 290px"
                  />
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t via-transparent to-transparent transition-opacity duration-300",
                      activeId === card.id
                        ? "from-black/35 opacity-100"
                        : "from-black/55 opacity-85"
                    )}
                  />
                  {card.overlayCopy ? (
                    <p className="absolute left-3 top-3 max-w-[75%] text-xs leading-relaxed text-white/95 drop-shadow-sm">
                      {card.overlayCopy}
                    </p>
                  ) : null}
                </div>
                <div className="pt-3 text-center">
                  <p
                    className={cn(
                      "text-base font-medium transition-colors",
                      activeId === card.id ? "text-burgundy" : "text-charcoal"
                    )}
                  >
                    {card.title}
                  </p>
                  <p className="mt-1 text-sm lowercase text-slate">
                    {card.subtitle}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
