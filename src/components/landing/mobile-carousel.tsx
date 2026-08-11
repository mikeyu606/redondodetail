"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MobileCarouselProps = {
  children: ReactNode;
  className?: string;
  /** Desktop grid classes, e.g. md:grid-cols-3 md:gap-8 */
  desktopClassName?: string;
};

/**
 * Horizontal snap carousel on mobile; normal grid from md up.
 * Vertical page scroll is preserved (overflow-x alone creates a scrollport
 * that otherwise eats wheel/trackpad and can feel "stuck").
 */
export function MobileCarousel({
  children,
  className,
  desktopClassName,
}: MobileCarouselProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isMobileCarousel = () =>
      window.matchMedia("(max-width: 767px)").matches;

    const onWheel = (e: WheelEvent) => {
      if (!isMobileCarousel()) return;
      // Horizontal gesture — let the carousel handle it
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      // Vertical intent — move the page instead of trapping in the row
      e.preventDefault();
      const scroller = document.scrollingElement ?? document.documentElement;
      scroller.scrollTop += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        // Mobile: side-scroll only. Do NOT use touch-pan-x — it blocks vertical page scroll.
        "-mx-4 flex gap-4 px-4 pb-3",
        "max-md:snap-x max-md:snap-proximity max-md:overflow-x-auto max-md:overscroll-x-contain",
        "max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden",
        // Desktop: normal grid, no scrollport
        "md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0",
        desktopClassName,
        className
      )}
    >
      {children}
    </div>
  );
}
