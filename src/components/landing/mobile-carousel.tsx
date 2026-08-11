import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MobileCarouselProps = {
  children: ReactNode;
  className?: string;
  /** Desktop grid classes, e.g. md:grid-cols-3 md:gap-8 */
  desktopClassName?: string;
};

/**
 * Native horizontal snap carousel on mobile; grid from md up.
 * No JS scroll hijacking — that was making sideways swipes lift the page.
 */
export function MobileCarousel({
  children,
  className,
  desktopClassName,
}: MobileCarouselProps) {
  return (
    <div
      className={cn(
        "-mx-4 flex gap-4 px-4 pb-3",
        "max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:overflow-y-hidden",
        "max-md:overscroll-x-contain max-md:[-webkit-overflow-scrolling:touch]",
        "max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden",
        "md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0",
        desktopClassName,
        className
      )}
    >
      {children}
    </div>
  );
}
