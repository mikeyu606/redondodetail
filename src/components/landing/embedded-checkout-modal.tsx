"use client";

import { useCallback } from "react";
import { createPortal } from "react-dom";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { X } from "lucide-react";
import { getStripeBrowser } from "@/lib/stripe-browser";
import { cn } from "@/lib/utils";

type EmbeddedCheckoutModalProps = {
  open: boolean;
  clientSecret: string | null;
  onClose: () => void;
};

export function EmbeddedCheckoutModal({
  open,
  clientSecret,
  onClose,
}: EmbeddedCheckoutModalProps) {
  const fetchClientSecret = useCallback(async () => {
    if (!clientSecret) {
      throw new Error("Missing checkout client secret.");
    }
    return clientSecret;
  }, [clientSecret]);

  if (!open || !clientSecret || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-end justify-center bg-charcoal/50 p-0 sm:items-center sm:p-6">
      <div
        className={cn(
          "relative flex max-h-[94svh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-charcoal">
              Secure checkout
            </p>
            <p className="text-xs text-slate">Powered by Stripe</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate transition-colors hover:bg-beige hover:text-charcoal"
            aria-label="Close checkout"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-3 sm:px-4">
          <EmbeddedCheckoutProvider
            stripe={getStripeBrowser()}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout className="w-full" />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </div>,
    document.body
  );
}
