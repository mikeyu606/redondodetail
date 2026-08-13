"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  MapPin,
  User,
  ClipboardCheck,
  CalendarDays,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getTierById,
  getVehicleVisitPrice,
  pricingTiers,
  type TierId,
} from "@/lib/pricing-data";
import { RedondoPromise } from "@/components/landing/redondo-promise";
import { cn } from "@/lib/utils";
import { createCheckoutSession } from "@/lib/checkout";
import { EmbeddedCheckoutModal } from "@/components/landing/embedded-checkout-modal";

export type BillingMode = "subscription" | "one-time";

type VehicleEntry = {
  tierId: TierId;
  nickname: string;
};

type BookingWizardProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  billing: BillingMode;
  initialTierId: TierId;
};

type Frequency = "bi-weekly" | "monthly";
type PreferredDay = "tuesday" | "thursday" | "either";

const stepMeta = {
  subscription: [
    { icon: Car, label: "Vehicles" },
    { icon: Car, label: "Details" },
    { icon: CalendarDays, label: "Schedule" },
    { icon: User, label: "Contact" },
    { icon: ClipboardCheck, label: "Review" },
  ],
  "one-time": [
    { icon: Car, label: "Vehicles" },
    { icon: Car, label: "Details" },
    { icon: User, label: "Contact" },
    { icon: ClipboardCheck, label: "Review" },
  ],
};

function createVehicles(count: number, defaultTier: TierId): VehicleEntry[] {
  return Array.from({ length: count }, () => ({
    tierId: defaultTier,
    nickname: "",
  }));
}

export function BookingWizard({
  open,
  onOpenChange,
  billing,
  initialTierId,
}: BookingWizardProps) {
  const steps = stepMeta[billing];
  const [step, setStep] = useState(0);

  const [vehicleCount, setVehicleCount] = useState(1);
  const [vehicles, setVehicles] = useState<VehicleEntry[]>(() =>
    createVehicles(1, initialTierId)
  );
  const [frequency, setFrequency] = useState<Frequency>("bi-weekly");
  const [preferredDay, setPreferredDay] = useState<PreferredDay>("either");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [notes, setNotes] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setStep(0);
      setVehicleCount(1);
      setVehicles(createVehicles(1, initialTierId));
      setFrequency("bi-weekly");
      setPreferredDay("either");
    }
  }, [open, initialTierId]);

  useEffect(() => {
    setVehicles((prev) => {
      if (vehicleCount === prev.length) return prev;
      if (vehicleCount > prev.length) {
        return [
          ...prev,
          ...createVehicles(vehicleCount - prev.length, initialTierId),
        ];
      }
      return prev.slice(0, vehicleCount);
    });
  }, [vehicleCount, initialTierId]);

  const isLastStep = step === steps.length - 1;
  const isFirstStep = step === 0;

  const perVisitTotal = vehicles.reduce(
    (sum, v, i) =>
      sum + getVehicleVisitPrice(getTierById(v.tierId), billing, i),
    0
  );

  const monthlyEstimate =
    billing === "subscription"
      ? frequency === "bi-weekly"
        ? perVisitTotal * 2
        : perVisitTotal
      : perVisitTotal;

  function canProceed(): boolean {
    if (step === 0) return vehicleCount >= 1;
    if (step === 1) return vehicles.every((v) => v.tierId);
    if (billing === "subscription" && step === 2) return true;
    const contactStep = billing === "subscription" ? 3 : 2;
    if (step === contactStep) {
      return (
        name.trim().length > 1 &&
        phone.trim().length >= 10 &&
        email.includes("@") &&
        address.trim().length > 3 &&
        zip.trim().length >= 5
      );
    }
    return true;
  }

  async function handleNext() {
    if (!isLastStep) {
      setStep((s) => s + 1);
      return;
    }

    setCheckoutError(null);
    setCheckoutLoading(true);
    try {
      const result = await createCheckoutSession({
        mode: billing,
        tierId: vehicles[0]?.tierId ?? initialTierId,
        quantity: vehicleCount > 1 ? 1 : vehicleCount,
        amountCents: vehicleCount > 1 ? perVisitTotal * 100 : undefined,
        frequency: billing === "subscription" ? frequency : undefined,
        customerEmail: email,
        customerName: name,
        metadata: {
          phone,
          address,
          city,
          zip,
          notes,
          preferredDay,
          vehicles: vehicles
            .map((v, i) => `${v.nickname || `Vehicle ${i + 1}`}:${v.tierId}`)
            .join("|"),
          perVisitTotal: String(perVisitTotal),
          extraVehicleDiscount: vehicleCount > 1 ? "50-percent" : "none",
        },
      });

      if (!result.waitlist) {
        setClientSecret(result.clientSecret);
        setCheckoutOpen(true);
      }
    } catch (error) {
      setCheckoutError(
        error instanceof Error ? error.message : "Checkout failed. Try again."
      );
    } finally {
      setCheckoutLoading(false);
    }
  }

  function handleBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function updateVehicle(index: number, patch: Partial<VehicleEntry>) {
    setVehicles((prev) =>
      prev.map((v, i) => (i === index ? { ...v, ...patch } : v))
    );
  }

  const contactStep = billing === "subscription" ? 3 : 2;
  const reviewStep = billing === "subscription" ? 4 : 3;

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto border-pink-medium/40 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {billing === "subscription"
              ? "Start Your Subscription"
              : "Book a One-Time Wash"}
          </DialogTitle>
          <DialogDescription>
            Tell us about your vehicles and we&apos;ll get you on the route.
          </DialogDescription>
        </DialogHeader>

        {/* Progress */}
        <div className="flex items-center justify-between gap-2">
          {steps.map((s, i) => (
            <div key={s.label} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full items-center">
                {i > 0 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1",
                      i <= step ? "bg-pink-primary" : "bg-pink-light"
                    )}
                  />
                )}
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                    i <= step
                      ? "bg-burgundy text-white"
                      : "bg-pink-light text-slate"
                  )}
                >
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1",
                      i < step ? "bg-pink-primary" : "bg-pink-light"
                    )}
                  />
                )}
              </div>
              <span className="hidden text-[10px] text-slate sm:block">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
            className="space-y-5 py-2"
          >
            {/* Step 0: Vehicle count */}
            {step === 0 && (
              <div className="space-y-4">
                <p className="text-sm font-medium text-charcoal">
                  How many vehicles would you like on your plan?
                </p>
                <div className="flex items-center justify-center gap-6 rounded-2xl border border-pink-medium/40 bg-pink-soft/50 py-8">
                  <button
                    type="button"
                    onClick={() => setVehicleCount((c) => Math.max(1, c - 1))}
                    className="flex size-11 items-center justify-center rounded-full border border-pink-medium/50 bg-white text-charcoal transition-colors hover:bg-pink-light disabled:opacity-40"
                    disabled={vehicleCount <= 1}
                    aria-label="Decrease vehicle count"
                  >
                    <Minus className="size-4" />
                  </button>
                  <div className="text-center">
                    <span className="text-5xl font-bold text-pink-primary">
                      {vehicleCount}
                    </span>
                    <p className="mt-1 text-sm text-slate">
                      {vehicleCount === 1 ? "vehicle" : "vehicles"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVehicleCount((c) => Math.min(6, c + 1))}
                    className="flex size-11 items-center justify-center rounded-full border border-pink-medium/50 bg-white text-charcoal transition-colors hover:bg-pink-light disabled:opacity-40"
                    disabled={vehicleCount >= 6}
                    aria-label="Increase vehicle count"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <p className="text-center text-xs text-slate">
                  Multi-vehicle households save time — each vehicle is billed at
                  its own size tier.
                </p>
                {[2, 3, 4].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setVehicleCount(n)}
                    className={cn(
                      "w-full rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                      vehicleCount === n
                        ? "border-pink-primary bg-pink-light text-pink-primary"
                        : "border-pink-medium/40 bg-white text-charcoal hover:bg-pink-soft"
                    )}
                  >
                    {n} vehicles
                  </button>
                ))}
              </div>
            )}

            {/* Step 1: Vehicle details */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-sm font-medium text-charcoal">
                  What size is each vehicle?
                </p>
                {vehicles.map((vehicle, index) => (
                  <div
                    key={index}
                    className="space-y-3 rounded-xl border border-pink-medium/40 bg-pink-soft/40 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-charcoal">
                        Vehicle {index + 1}
                      </span>
                      <Badge variant="secondary">
                        ${getVehicleVisitPrice(getTierById(vehicle.tierId), billing, index)}
                        {billing === "subscription" ? "/visit" : ""}
                        {billing === "subscription" && index > 0
                          ? " · 50% off every visit"
                          : ""}
                      </Badge>
                    </div>
                    <input
                      type="text"
                      placeholder='Nickname (optional) — e.g. "Work SUV"'
                      value={vehicle.nickname}
                      onChange={(e) =>
                        updateVehicle(index, { nickname: e.target.value })
                      }
                      className="w-full rounded-lg border border-pink-medium/40 bg-white px-3 py-2 text-sm text-charcoal placeholder:text-slate/60 focus:border-pink-primary focus:outline-none focus:ring-2 focus:ring-pink-primary/20"
                    />
                    <div className="grid gap-2">
                      {pricingTiers.map((tier) => (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() =>
                            updateVehicle(index, { tierId: tier.id })
                          }
                          className={cn(
                            "rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
                            vehicle.tierId === tier.id
                              ? "border-pink-primary bg-pink-light text-charcoal"
                              : "border-pink-medium/30 bg-white text-slate hover:border-pink-primary/40"
                          )}
                        >
                          <span className="font-medium">{tier.name}</span>
                          <span className="ml-2 text-xs text-slate">
                            ${getVehicleVisitPrice(tier, billing, index)}
                            {billing === "subscription" ? "/visit" : " one-time"}
                            {billing === "subscription" && index > 0
                              ? " · 50% off every visit"
                              : ""}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 2 (subscription): Schedule */}
            {billing === "subscription" && step === 2 && (
              <div className="space-y-5">
                <div>
                  <p className="mb-3 text-sm font-medium text-charcoal">
                    How often should we visit?
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {(
                      [
                        {
                          value: "bi-weekly" as const,
                          label: "Bi-Weekly",
                          sub: "Every 2 weeks · Best value",
                        },
                        {
                          value: "monthly" as const,
                          label: "Monthly",
                          sub: "Once a month",
                        },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFrequency(opt.value)}
                        className={cn(
                          "rounded-xl border p-4 text-left transition-colors",
                          frequency === opt.value
                            ? "border-pink-primary bg-pink-light"
                            : "border-pink-medium/40 bg-white hover:bg-pink-soft"
                        )}
                      >
                        <p className="font-semibold text-charcoal">
                          {opt.label}
                        </p>
                        <p className="text-xs text-slate">{opt.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-sm font-medium text-charcoal">
                    Preferred route day
                  </p>
                  <div className="grid gap-2">
                    {(
                      [
                        {
                          value: "tuesday" as const,
                          label: "Saturdays & Sundays — Newport Beach",
                        },
                        {
                          value: "thursday" as const,
                          label: "Sundays — Palos Verdes",
                        },
                        {
                          value: "either" as const,
                          label: "Either day works for me",
                        },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setPreferredDay(opt.value)}
                        className={cn(
                          "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                          preferredDay === opt.value
                            ? "border-pink-primary bg-pink-light font-medium text-charcoal"
                            : "border-pink-medium/40 bg-white text-slate hover:bg-pink-soft"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Contact step */}
            {step === contactStep && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-charcoal">
                  Where should we show up?
                </p>
                <Field label="Full name" value={name} onChange={setName} />
                <Field label="Phone" value={phone} onChange={setPhone} type="tel" />
                <Field label="Email" value={email} onChange={setEmail} type="email" />
                <Field label="Street address" value={address} onChange={setAddress} />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="City" value={city} onChange={setCity} />
                  <Field label="ZIP code" value={zip} onChange={setZip} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate">
                    Gate code or special instructions (optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    placeholder="Driveway access, gate code, etc."
                    className="w-full rounded-lg border border-pink-medium/40 bg-white px-3 py-2 text-sm text-charcoal placeholder:text-slate/60 focus:border-pink-primary focus:outline-none focus:ring-2 focus:ring-pink-primary/20"
                  />
                </div>
              </div>
            )}

            {/* Review step */}
            {step === reviewStep && (
              <div className="space-y-4">
                <div className="rounded-xl border border-pink-medium/40 bg-pink-soft/50 p-4">
                  <p className="mb-3 text-sm font-semibold text-charcoal">
                    Your vehicles ({vehicleCount})
                  </p>
                  <ul className="space-y-2">
                    {vehicles.map((v, i) => {
                      const tier = getTierById(v.tierId);
                      const price = getVehicleVisitPrice(tier, billing, i);
                      return (
                        <li
                          key={i}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-charcoal">
                            {v.nickname || `Vehicle ${i + 1}`} · {tier.name}
                            {billing === "subscription" && i > 0 ? (
                              <span className="ml-1.5 text-xs text-burgundy">
                                50% off every visit
                              </span>
                            ) : null}
                          </span>
                          <span className="font-medium text-pink-primary">
                            ${price}
                            {billing === "subscription" ? "/visit" : ""}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-3 border-t border-pink-medium/30 pt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">Per visit total</span>
                      <span className="font-semibold text-charcoal">
                        ${perVisitTotal}
                      </span>
                    </div>
                    {billing === "subscription" && (
                      <div className="mt-1 flex justify-between text-sm">
                        <span className="text-slate">
                          Est. monthly ({frequency})
                        </span>
                        <span className="font-semibold text-pink-primary">
                          ~${monthlyEstimate}/mo
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {billing === "subscription" && (
                  <div className="flex items-start gap-2 rounded-xl bg-pink-light/60 px-4 py-3 text-sm text-slate">
                    <CalendarDays className="mt-0.5 size-4 shrink-0 text-pink-primary" />
                    <span>
                      {frequency === "bi-weekly" ? "Bi-weekly" : "Monthly"}{" "}
                      visits · Preferred day:{" "}
                      {preferredDay === "either"
                        ? "Flexible"
                        : preferredDay === "tuesday"
                          ? "Tuesdays"
                          : "Thursdays"}
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-2 rounded-xl bg-pink-light/60 px-4 py-3 text-sm text-slate">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-pink-primary" />
                  <span>
                    {address}, {city} {zip}
                    <br />
                    {name} · {phone}
                  </span>
                </div>

                <RedondoPromise variant="compact" />

                <p className="text-xs text-slate">
                  Secure payment opens in-page with Stripe Embedded Checkout.
                  Pause, reschedule, or cancel anytime — zero hidden fees.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer nav */}
        <div className="flex items-center justify-between gap-3 border-t border-pink-medium/30 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            disabled={isFirstStep}
            className={cn(isFirstStep && "invisible")}
          >
            <ChevronLeft className="size-4" />
            Back
          </Button>
          <Button type="button" onClick={handleNext} disabled={!canProceed() || checkoutLoading}>
            {isLastStep ? (
              checkoutLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Opening checkout…
                </>
              ) : (
                "Continue to Checkout"
              )
            ) : (
              <>
                Next
                <ChevronRight className="size-4" />
              </>
            )}
          </Button>
        </div>
        {checkoutError ? (
          <p className="text-center text-sm text-red-600">{checkoutError}</p>
        ) : null}
      </DialogContent>
    </Dialog>
    <EmbeddedCheckoutModal
      open={checkoutOpen}
      clientSecret={clientSecret}
      onClose={() => {
        setCheckoutOpen(false);
        setClientSecret(null);
      }}
    />
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-pink-medium/40 bg-white px-3 py-2 text-sm text-charcoal focus:border-pink-primary focus:outline-none focus:ring-2 focus:ring-pink-primary/20"
      />
    </div>
  );
}
