"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookingWizard, type BillingMode } from "@/components/landing/booking-wizard";
import {
  pricingTiers,
  pricingFeatures,
  type TierId,
} from "@/lib/pricing-data";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [billing, setBilling] = useState<BillingMode>("subscription");
  const [wizardOpen, setWizardOpen] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState<TierId>("crossover");

  function openWizard(tierId: TierId) {
    setSelectedTierId(tierId);
    setWizardOpen(true);
  }

  return (
    <>
      <section id="pricing" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-4xl font-medium tracking-tight text-charcoal sm:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-slate">
              Subscribe for the best rate and never think about scheduling again.
            </p>

            <div className="mt-8 inline-flex rounded-full border border-pink-medium/50 bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setBilling("subscription")}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                  billing === "subscription"
                    ? "bg-burgundy text-white shadow-sm"
                    : "text-slate hover:text-charcoal"
                )}
              >
                Bi-Weekly Subscription
                <span className="ml-1.5 text-xs opacity-90">Save 20%</span>
              </button>
              <button
                type="button"
                onClick={() => setBilling("one-time")}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                  billing === "one-time"
                    ? "bg-pink-light text-charcoal shadow-sm"
                    : "text-slate hover:text-charcoal"
                )}
              >
                One-Time Wash
              </button>
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {pricingTiers.map((tier, i) => {
              const price =
                billing === "subscription"
                  ? tier.subscriptionPrice
                  : tier.oneTimePrice;

              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Card
                    className={cn(
                      "relative h-full bg-white transition-all duration-300 hover:border-pink-primary/40 hover:shadow-md hover:shadow-pink-medium/10",
                      tier.popular &&
                        "border-pink-primary/50 ring-1 ring-pink-primary/20"
                    )}
                  >
                    <CardHeader className="text-center">
                      {tier.popular && (
                        <div className="mb-4 flex justify-center">
                          <Badge className="px-3 py-1">
                            <Sparkles className="mr-1 size-3" />
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      <CardTitle className="text-lg">{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-charcoal">
                          ${price}
                        </span>
                        <span className="text-slate">
                          {billing === "subscription" ? "/visit" : " one-time"}
                        </span>
                      </div>
                      {billing === "subscription" && (
                        <p className="mt-1 text-xs text-pink-primary">
                          Billed automatically every 2 weeks
                        </p>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {pricingFeatures.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2.5 text-sm text-slate"
                          >
                            <Check className="mt-0.5 size-4 shrink-0 text-pink-primary" />
                            <span
                              className={cn(
                                feature.includes("bi-weekly billing") &&
                                  billing === "one-time" &&
                                  "line-through opacity-40"
                              )}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full"
                        variant={tier.popular ? "default" : "secondary"}
                        onClick={() => openWizard(tier.id)}
                      >
                        {billing === "subscription"
                          ? "Start Subscription"
                          : "Book One-Time Wash"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      <BookingWizard
        open={wizardOpen}
        onOpenChange={setWizardOpen}
        billing={billing}
        initialTierId={selectedTierId}
      />
    </>
  );
}
