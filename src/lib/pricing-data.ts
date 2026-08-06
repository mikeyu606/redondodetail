export type TierId = "sedan" | "crossover" | "suv";

export type PricingTier = {
  id: TierId;
  name: string;
  subscriptionPrice: number;
  oneTimePrice: number;
  description: string;
  popular: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "sedan",
    name: "Sedan / Coupe Care",
    subscriptionPrice: 100,
    oneTimePrice: 125,
    description: "Perfect for daily drivers & compact luxury",
    popular: false,
  },
  {
    id: "crossover",
    name: "Crossover / Mid-SUV",
    subscriptionPrice: 120,
    oneTimePrice: 150,
    description: "Ideal for family crossovers & mid-size SUVs",
    popular: true,
  },
  {
    id: "suv",
    name: "Full SUV / Truck",
    subscriptionPrice: 140,
    oneTimePrice: 175,
    description: "Full-size SUVs, trucks & larger vehicles",
    popular: false,
  },
];

export const pricingFeatures = [
  "Hand wash & touchless blow dry",
  "Deep door & trunk jambs cleaned",
  "AC vent dusting & console restoration",
  "Interior glass haze removal",
  "Satin tire dressing & brake dust clean",
  "Stripe automated bi-weekly billing",
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
