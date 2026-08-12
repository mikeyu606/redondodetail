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
    description: "Full-size SUVs — our $90 bi-weekly favorite",
    popular: true,
  },
];

export const pricingFeatures = [
  {
    label: "Exterior & Wheels Reset",
    detail: "Hand wash, pH-balanced foam rinse, and tire dressing",
  },
  {
    label: "Full Interior Cabin Care",
    detail: "Deep vacuum, streak-free glass, and door jamb wipe",
  },
  {
    label: "100% Non-Toxic & Pet-Safe",
    detail: "Plant-derived formulas with zero synthetic chemical fumes",
  },
  {
    label: "2 Bi-Weekly Visits / Month",
    detail: "Direct driveway service—pause or skip anytime",
    subscriptionOnly: true,
  },
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
