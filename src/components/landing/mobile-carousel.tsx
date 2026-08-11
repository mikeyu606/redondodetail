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
 * Horizontal snap carousel on mobile; normal grid/flow from md up.
 * Forwards vertical wheel/trackpad scroll to the page so hover doesn't trap scroll.
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

    const onWheel = (e: WheelEvent) => {
      if (window.matchMedia("(min-width: 768px)").matches) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      window.scrollBy({ top: e.deltaY, left: 0 });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "-mx-4 flex touch-pan-x snap-x snap-proximity gap-4 overflow-x-auto px-4 pb-3",
        "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0 md:touch-auto",
        desktopClassName,
        className
      )}
    >
      {children}
    </div>
  );
}
