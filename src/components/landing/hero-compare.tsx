"use client";

import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { cn } from "@/lib/utils";

export function CompareVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-full w-full min-w-full overflow-hidden bg-charcoal",
        className
      )}
    >
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src="/hero-before.png"
            alt="Before detail condition"
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="/hero-after.png"
            alt="After detail finish"
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
        }
        className="!h-full !w-full min-w-full"
        style={{ width: "100%", height: "100%" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      <div className="absolute left-3 top-3 rounded-full bg-charcoal/65 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/95 backdrop-blur-sm">
        Before
      </div>
      <div className="absolute right-3 top-3 rounded-full bg-charcoal/65 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/95 backdrop-blur-sm">
        After
      </div>
    </div>
  );
}
