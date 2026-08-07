"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "about" },
  { href: "#coastal-care", label: "coastal care" },
  { href: "#services", label: "services" },
  { href: "#transformations", label: "work" },
  { href: "#route-schedule", label: "routes" },
  { href: "#pricing", label: "pricing" },
  { href: "#promise", label: "promise" },
  { href: "#faq", label: "faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-charcoal/10 transition-all duration-300",
        scrolled ? "bg-beige/95 backdrop-blur-md" : "bg-beige"
      )}
    >
      <nav className="relative mx-auto flex h-14 max-w-7xl items-center px-4 sm:h-16 sm:px-6 lg:px-8">
        <div className="hidden flex-1 items-center gap-6 lg:flex">
          {navLinks.slice(0, 4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm lowercase text-charcoal transition-colors hover:text-burgundy"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="absolute left-1/2 z-10 -translate-x-1/2 font-brand text-[1.65rem] font-normal lowercase leading-none tracking-[-0.02em] text-charcoal sm:text-[1.85rem]"
        >
          redondo detail
        </Link>

        <div className="ml-auto flex flex-1 items-center justify-end gap-3">
          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.slice(4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm lowercase text-charcoal transition-colors hover:text-burgundy"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Button asChild className="hidden sm:inline-flex" size="sm">
            <Link href="#route-schedule">Book Slot</Link>
          </Button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-charcoal lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-charcoal/10 bg-beige lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-sm px-3 py-2.5 text-sm lowercase text-charcoal transition-colors hover:bg-dusty-rose/30"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-2 w-full">
                <Link href="#route-schedule" onClick={() => setMobileOpen(false)}>
                  Book Slot
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
