"use client";

import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { cn } from "@/lib/utils";

function SideLabel({
  children,
  side,
}: {
  children: string;
  side: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-3 z-20 rounded-full bg-charcoal/70 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-sm",
        side === "left" ? "left-3" : "right-3"
      )}
    >
      {children}
    </div>
  );
}

export function CompareVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-full w-full min-w-full overflow-hidden bg-charcoal",
        className
      )}
    >
      <ReactCompareSlider
        onlyHandleDraggable
        itemOne={
          <div className="relative h-full w-full">
            <ReactCompareSliderImage
              src="/hero-before.png"
              alt="Before detail condition"
              style={{ objectFit: "cover", objectPosition: "center center" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <SideLabel side="left">Before</SideLabel>
          </div>
        }
        itemTwo={
          <div className="relative h-full w-full">
            <ReactCompareSliderImage
              src="/hero-after.png"
              alt="After detail finish"
              style={{ objectFit: "cover", objectPosition: "center center" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <SideLabel side="right">After</SideLabel>
          </div>
        }
        className="!h-full !w-full min-w-full"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
