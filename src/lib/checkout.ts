"use client";

export type CheckoutRequest = {
  mode: "subscription" | "one-time" | "waitlist";
  tierId?: "sedan" | "crossover" | "suv";
  quantity?: number;
  /** Override unit amount in cents (after discounts / multi-car totals). */
  amountCents?: number;
  frequency?: "bi-weekly" | "monthly";
  routeId?: string;
  routeName?: string;
  windowId?: string;
  windowLabel?: string;
  customerEmail?: string;
  customerName?: string;
  metadata?: Record<string, string>;
};

export type CheckoutResult =
  | { waitlist: true; message?: string }
  | { waitlist: false; clientSecret: string; sessionId: string };

export async function createCheckoutSession(
  payload: CheckoutRequest
): Promise<CheckoutResult> {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as {
    clientSecret?: string;
    sessionId?: string;
    waitlist?: boolean;
    message?: string;
    error?: string;
  };

  if (!res.ok) {
    throw new Error(data.error || "Checkout failed. Please try again.");
  }

  if (data.waitlist) {
    return { waitlist: true, message: data.message };
  }

  if (!data.clientSecret || !data.sessionId) {
    throw new Error("No embedded checkout session returned from Stripe.");
  }

  return {
    waitlist: false,
    clientSecret: data.clientSecret,
    sessionId: data.sessionId,
  };
}

/** @deprecated use createCheckoutSession + EmbeddedCheckoutModal */
export async function startCheckout(payload: CheckoutRequest) {
  return createCheckoutSession(payload);
}
