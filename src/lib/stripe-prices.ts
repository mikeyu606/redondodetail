import type { TierId } from "@/lib/pricing-data";

const catalogPriceIds: Record<
  TierId,
  { subscription?: string; oneTime?: string }
> = {
  sedan: {
    subscription: process.env.STRIPE_PRICE_SEDAN_BIWEEKLY,
    oneTime: process.env.STRIPE_PRICE_SEDAN_ONETIME,
  },
  crossover: {
    subscription: process.env.STRIPE_PRICE_CROSSOVER_BIWEEKLY,
    oneTime: process.env.STRIPE_PRICE_CROSSOVER_ONETIME,
  },
  suv: {
    subscription: process.env.STRIPE_PRICE_SUV_BIWEEKLY,
    oneTime: process.env.STRIPE_PRICE_SUV_ONETIME,
  },
};

export function getCatalogPriceId(
  tierId: TierId,
  mode: "subscription" | "one-time"
) {
  const prices = catalogPriceIds[tierId];
  const priceId =
    mode === "subscription" ? prices.subscription : prices.oneTime;
  return priceId || undefined;
}
