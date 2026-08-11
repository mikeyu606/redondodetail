"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookingWizard, type BillingMode } from "@/components/landing/booking-wizard";
import { MobileCarousel } from "@/components/landing/mobile-carousel";
import {
  pricingTiers,
  pricingFeatures,
  getMonthlyEstimate,
  type TierId,
} from "@/lib/pricing-data";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [billing, setBilling] = useState<BillingMode>("subscription");
  const [wizardOpen, setWizardOpen] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState<TierId>("suv");

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
              Bi-Weekly Membership
            </h2>
            <p className="mt-4 text-slate">
              Automated driveway care for busy families. Pause or cancel anytime.
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

          <div className="mx-auto mt-10 max-w-3xl px-1 text-center">
            <p className="inline-flex rounded-full border border-pink-medium/60 bg-pink-light/70 px-4 py-2 text-sm leading-snug text-charcoal">
              🍎 Community Care: 1% of every active membership goes directly to
              local Newport Beach PTAs &amp; schools.
            </p>
          </div>

          <MobileCarousel className="mt-8" desktopClassName="md:grid-cols-3 md:gap-6">
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
                  className="flex w-[82vw] max-w-sm shrink-0 snap-center md:w-auto md:max-w-none"
                >
                  <Card
                    className={cn(
                      "relative flex h-full w-full flex-col bg-white transition-all duration-300 hover:border-pink-primary/40 hover:shadow-md hover:shadow-pink-medium/10",
                      tier.popular &&
                        "border-pink-primary/50 ring-1 ring-pink-primary/20"
                    )}
                  >
                    <CardHeader className="text-center">
                      <div className="mb-3 flex h-7 items-center justify-center">
                        {tier.popular ? (
                          <Badge className="px-3 py-1">
                            <Sparkles className="mr-1 size-3" />
                            Most Popular
                          </Badge>
                        ) : null}
                      </div>
                      <CardTitle className="text-lg">{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-charcoal">
                          ${price}
                        </span>
                        <span className="text-slate">
                          {billing === "subscription" ? " / bi-weekly" : " one-time"}
                        </span>
                      </div>
                      <p
                        className={cn(
                          "mt-1 text-xs text-pink-primary",
                          billing !== "subscription" && "invisible"
                        )}
                      >
                        Billed every 2 weeks • Pause or skip anytime
                      </p>
                      <p
                        className={cn(
                          "mt-0.5 text-xs text-slate/70",
                          billing !== "subscription" && "invisible"
                        )}
                      >
                        (~${getMonthlyEstimate(price)}/mo equivalent)
                      </p>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col pt-0">
                      <ul className="flex-1 space-y-3">
                        {pricingFeatures.map((feature) => (
                          <li
                            key={feature.label}
                            className={cn(
                              "flex items-start gap-2.5 text-sm",
                              feature.subscriptionOnly &&
                                billing === "one-time" &&
                                "line-through opacity-40"
                            )}
                          >
                            <Check className="mt-0.5 size-4 shrink-0 text-pink-primary" />
                            <span>
                              <span className="font-semibold text-charcoal">
                                {feature.label}:
                              </span>{" "}
                              <span className="text-slate">{feature.detail}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="mt-6 w-full"
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
          </MobileCarousel>

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
