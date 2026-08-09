export type TierId = "sedan" | "crossover" | "suv";

export type PricingTier = {
  id: TierId;
  name: string;
  /** Charged per bi-weekly visit */
  subscriptionPrice: number;
  oneTimePrice: number;
  description: string;
  popular: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "sedan",
    name: "Sedan / Coupe",
    subscriptionPrice: 70,
    oneTimePrice: 95,
    description: "Daily drivers & compact cars",
    popular: false,
  },
  {
    id: "crossover",
    name: "Crossover / Mid-SUV",
    subscriptionPrice: 80,
    oneTimePrice: 110,
    description: "Family crossovers & mid-size SUVs",
    popular: false,
  },
  {
    id: "suv",
    name: "Full SUV / Family",
    subscriptionPrice: 90,
    oneTimePrice: 125,
    description: "Full-size SUVs — our $180/mo club favorite",
    popular: true,
  },
];

export const pricingFeatures = [
  "Exterior hand wash & rinse",
  "Interior vacuum, wipe-down & glass",
  "Wheels, tires & door jambs",
  "100% non-toxic & pet-safe products",
  "1% of income goes to cleaning our coasts",
  "Bi-weekly auto-pay — pause anytime",
];

export function getTierById(id: TierId) {
  return pricingTiers.find((t) => t.id === id)!;
}

export function getTierPrice(
  tier: PricingTier,
  billing: "subscription" | "one-time"
) {
  return billing === "subscription" ? tier.subscriptionPrice : tier.oneTimePrice;
}

/** Approximate monthly total for bi-weekly visits */
export function getMonthlyEstimate(visitPrice: number) {
  return visitPrice * 2;
}
