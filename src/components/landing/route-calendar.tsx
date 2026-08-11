"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Lock,
  MapPin,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { createCheckoutSession } from "@/lib/checkout";
import { EmbeddedCheckoutModal } from "@/components/landing/embedded-checkout-modal";
import { addDays, addWeeks, format, getDay, startOfDay } from "date-fns";

type RouteId = "newport";
type VehicleCount = 1 | 2 | 3;

type RouteOption = {
  id: RouteId;
  name: string;
  windowLabel: string;
  /** 0 = Sunday … 6 = Saturday */
  weekday: number;
  slotsLeft: number | null;
  status: "open" | "waitlist";
  image: string;
};

type CycleOption = {
  id: string;
  startDate: Date;
  label: string;
  detail: string;
};

const routes: RouteOption[] = [
  {
    id: "newport",
    name: "Newport Beach",
    windowLabel: "Saturdays · 8 AM – 4 PM",
    weekday: 6,
    slotsLeft: 4,
    status: "open",
    image: "/route-north-redondo.jpg",
  },
];

const fleetOptions: {
  count: VehicleCount;
  title: string;
  visitPrice: number;
  monthlyPrice: number;
  savings?: number;
}[] = [
  {
    count: 1,
    title: "1 Vehicle",
    visitPrice: 90,
    monthlyPrice: 180,
  },
  {
    count: 2,
    title: "2 Vehicles",
    visitPrice: 160,
    monthlyPrice: 320,
    savings: 20,
  },
  {
    count: 3,
    title: "3+ Vehicles",
    visitPrice: 225,
    monthlyPrice: 450,
    savings: 30,
  },
];

const stepLabels = ["Route", "Vehicles", "Schedule", "Address"] as const;

function getFleetPricing(count: VehicleCount) {
  return fleetOptions.find((o) => o.count === count)!;
}

/** Next two route weekdays — customer picks which bi-weekly cycle to start on. */
function buildCycleOptions(weekday: number, now: Date = new Date()): CycleOption[] {
  let day = startOfDay(now);
  while (getDay(day) !== weekday) {
    day = addDays(day, 1);
  }

  const first = day;
  const second = addWeeks(first, 1);
  const dayName = format(first, "EEEE");

  return [
    {
      id: format(first, "yyyy-MM-dd"),
      startDate: first,
      label: format(first, "EEE, MMM d"),
      detail: `Start ${format(first, "MMMM d")} · then every other ${dayName}`,
    },
    {
      id: format(second, "yyyy-MM-dd"),
      startDate: second,
      label: format(second, "EEE, MMM d"),
      detail: `Start ${format(second, "MMMM d")} · then every other ${dayName}`,
    },
  ];
}

export function RouteCalendar() {
  const [step, setStep] = useState(0);
  const [routeId, setRouteId] = useState<RouteId | null>("newport");
  const [vehicleCount, setVehicleCount] = useState<VehicleCount>(1);
  const [cycleId, setCycleId] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waitlistDone, setWaitlistDone] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const selectedRoute = routes.find((r) => r.id === routeId) ?? null;
  const fleet = getFleetPricing(vehicleCount);
  const visitTotal = fleet.visitPrice;

  const cycles = useMemo(
    () =>
      selectedRoute && selectedRoute.status === "open"
        ? buildCycleOptions(selectedRoute.weekday)
        : [],
    [selectedRoute]
  );
  const selectedCycle = cycles.find((c) => c.id === cycleId) ?? null;

  const canNext =
    step === 0
      ? !!routeId
      : step === 1
        ? vehicleCount >= 1
        : step === 2
          ? !!cycleId
          : address.trim().length > 3 && zip.trim().length >= 5;

  async function handlePrimary() {
    setError(null);

    if (step < 3) {
      if (!canNext || !selectedRoute) return;

      if (step === 0 && selectedRoute.status === "waitlist") {
        setLoading(true);
        try {
          const result = await createCheckoutSession({
            mode: "waitlist",
            routeId: selectedRoute.id,
            routeName: selectedRoute.name,
          });
          if (result.waitlist) setWaitlistDone(true);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
          setLoading(false);
        }
        return;
      }

      setStep((s) => s + 1);
      return;
    }

    if (!selectedRoute || !selectedCycle || !canNext) return;
    setLoading(true);
    try {
      const result = await createCheckoutSession({
        mode: "subscription",
        tierId: "suv",
        amountCents: visitTotal * 100,
        frequency: "bi-weekly",
        routeId: selectedRoute.id,
        routeName: `${selectedRoute.name} · ${selectedRoute.windowLabel}`,
        windowId: selectedCycle.id,
        windowLabel: selectedCycle.detail,
        metadata: {
          address,
          zip,
          notes,
          vehicleCount: String(vehicleCount),
          visitTotal: String(visitTotal),
          monthlyEstimate: String(fleet.monthlyPrice),
          fleet: fleet.title,
          firstVisit: selectedCycle.id,
          cadence: "every-other-saturday",
        },
      });

      if (!result.waitlist) {
        setClientSecret(result.clientSecret);
        setCheckoutOpen(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="route-schedule" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            <CalendarDays className="mr-1.5 size-3.5" />
            Reserve Your Slot
          </Badge>
          <h2 className="font-heading text-4xl font-medium tracking-tight text-charcoal sm:text-5xl">
            Lock In Your Bi-Weekly Care
          </h2>
          <p className="mt-4 text-slate">
            Four quick steps. Secure checkout with Stripe.
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl flex-col rounded-[1.75rem] border border-border/80 bg-white p-5 shadow-[0_20px_60px_-30px_rgba(194,24,91,0.35)] sm:p-8">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={waitlistDone ? "done" : step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {waitlistDone ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-dusty-rose/50">
                      <Check className="size-7 text-burgundy" />
                    </div>
                    <h3 className="text-2xl font-semibold text-charcoal">
                      You&apos;re on the waitlist
                    </h3>
                    <p className="mx-auto mt-3 max-w-md text-slate">
                      We&apos;ll text you when {selectedRoute?.name ?? "your area"}{" "}
                      opens. Newport Beach is live now.
                    </p>
                  </div>
                ) : (
                  <>
                    {step === 0 && (
                      <div>
                        <h3 className="text-2xl font-semibold tracking-tight text-charcoal">
                          Where should we service your vehicle?
                        </h3>
                        <p className="mt-2 text-sm text-slate">
                          Currently serving Newport Beach Saturdays, 8 AM – 4 PM.
                        </p>

                        <div className="mt-6 space-y-3">
                          {routes.map((route) => {
                            const selected = routeId === route.id;
                            const open = route.status === "open";
                            return (
                              <button
                                key={route.id}
                                type="button"
                                onClick={() => {
                                  setRouteId(route.id);
                                  setWaitlistDone(false);
                                  setCycleId(null);
                                }}
                                className={cn(
                                  "flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all",
                                  selected
                                    ? open
                                      ? "border-burgundy bg-pink-light/70 ring-2 ring-burgundy/20"
                                      : "border-burgundy bg-pink-light/50 ring-2 ring-burgundy/15"
                                    : open
                                      ? "border-border bg-white hover:border-burgundy/40"
                                      : "border-dashed border-border bg-beige/40 opacity-80 hover:opacity-100"
                                )}
                              >
                                <div
                                  className={cn(
                                    "size-14 shrink-0 rounded-full bg-cover bg-center",
                                    !open && "grayscale"
                                  )}
                                  style={{
                                    backgroundImage: `url(${route.image})`,
                                  }}
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="font-semibold text-charcoal">
                                    {route.name}
                                  </p>
                                  <p className="mt-0.5 text-sm text-slate">
                                    {open
                                      ? `${route.windowLabel} · ${route.slotsLeft} slots left`
                                      : `${route.windowLabel} · Join waitlist`}
                                  </p>
                                </div>
                                {selected ? (
                                  <span
                                    className={cn(
                                      "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white",
                                      open ? "bg-burgundy" : "bg-charcoal/50"
                                    )}
                                  >
                                    {open ? "Selected" : "Waitlist"}
                                  </span>
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {step === 1 && selectedRoute?.status === "open" && (
                      <div>
                        <h3 className="text-2xl font-semibold tracking-tight text-charcoal">
                          How many vehicles?
                        </h3>
                        <p className="mt-2 text-sm text-slate">
                          {selectedRoute.name} · {selectedRoute.windowLabel}
                        </p>

                        <div className="mt-6 grid gap-3">
                          {fleetOptions.map((option) => {
                            const selected = vehicleCount === option.count;
                            return (
                              <button
                                key={option.count}
                                type="button"
                                onClick={() => setVehicleCount(option.count)}
                                className={cn(
                                  "rounded-2xl border px-4 py-4 text-left transition-all",
                                  selected
                                    ? "border-burgundy bg-pink-light/70 ring-2 ring-burgundy/20"
                                    : "border-border bg-white hover:border-burgundy/40"
                                )}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="font-semibold text-charcoal">
                                      {option.title}
                                    </p>
                                    <p className="mt-1 text-sm text-charcoal">
                                      <span className="font-semibold text-burgundy">
                                        ${option.visitPrice} / visit
                                      </span>
                                      <span className="text-slate">
                                        {" "}
                                        · Billed bi-weekly at $
                                        {option.monthlyPrice}/mo
                                      </span>
                                    </p>
                                    {option.savings ? (
                                      <p className="mt-1 text-xs font-medium text-burgundy">
                                        Save ${option.savings}/visit
                                      </p>
                                    ) : null}
                                  </div>
                                  {selected ? (
                                    <span className="rounded-full bg-burgundy px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                                      Selected
                                    </span>
                                  ) : null}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {step === 2 && selectedRoute?.status === "open" && (
                      <div>
                        <h3 className="text-2xl font-semibold tracking-tight text-charcoal">
                          Which Saturday starts your bi-weekly cycle?
                        </h3>
                        <p className="mt-2 text-sm text-slate">
                          We&apos;ll come every other Saturday, 8 AM – 4 PM, from
                          your chosen start date.
                        </p>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          {cycles.map((cycle) => {
                            const selected = cycleId === cycle.id;
                            return (
                              <button
                                key={cycle.id}
                                type="button"
                                onClick={() => setCycleId(cycle.id)}
                                className={cn(
                                  "rounded-2xl border px-4 py-5 text-left transition-all",
                                  selected
                                    ? "border-burgundy bg-pink-light/70 ring-2 ring-burgundy/20"
                                    : "border-border bg-white hover:border-burgundy/40"
                                )}
                              >
                                <p className="font-semibold text-charcoal">
                                  {cycle.label}
                                </p>
                                <p className="mt-1 text-sm text-slate">
                                  Then every other{" "}
                                  {format(cycle.startDate, "EEEE")}
                                </p>
                                {selected ? (
                                  <span className="mt-3 inline-block rounded-full bg-burgundy px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                                    Selected
                                  </span>
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {step === 3 && selectedRoute?.status === "open" && (
                      <div>
                        <h3 className="text-2xl font-semibold tracking-tight text-charcoal">
                          Where is your driveway located?
                        </h3>
                        <p className="mt-2 text-sm text-slate">
                          Last step — then secure checkout with Stripe.
                        </p>

                        <div className="mt-6 space-y-4">
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate">
                              Street Address
                            </span>
                            <input
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="1234 Blossom Ln"
                              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal outline-none ring-burgundy/20 placeholder:text-slate/50 focus:border-burgundy focus:ring-2"
                            />
                          </label>
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate">
                              Zip Code
                            </span>
                            <input
                              value={zip}
                              onChange={(e) => setZip(e.target.value)}
                              placeholder="92660"
                              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal outline-none ring-burgundy/20 placeholder:text-slate/50 focus:border-burgundy focus:ring-2"
                            />
                          </label>
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate">
                              Parking / Gate Notes (Optional)
                            </span>
                            <input
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              placeholder="e.g., Left side of driveway"
                              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal outline-none ring-burgundy/20 placeholder:text-slate/50 focus:border-burgundy focus:ring-2"
                            />
                          </label>
                        </div>

                        <div className="mt-6 rounded-2xl border border-burgundy/20 bg-pink-light/60 px-4 py-3 text-sm text-charcoal">
                          <div className="flex items-start gap-3">
                            <MapPin className="mt-0.5 size-4 shrink-0 text-burgundy" />
                            <div className="min-w-0 flex-1 space-y-1">
                              <p className="font-medium">
                                {selectedRoute.name} · {selectedRoute.windowLabel}
                              </p>
                              {selectedCycle ? (
                                <p className="text-slate">
                                  First visit {selectedCycle.label} · every other
                                  Saturday
                                </p>
                              ) : null}
                              <p className="text-slate">
                                {fleet.title} — ${visitTotal}/visit
                              </p>
                              <p className="font-semibold text-charcoal">
                                ${fleet.monthlyPrice}/mo bi-weekly billing
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {!waitlistDone ? (
            <div className="mt-8 flex flex-col gap-4 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate">
                  Step {step + 1}: {stepLabels[step]}
                </p>
                <div className="relative mt-2 h-1.5 max-w-xs overflow-hidden rounded-full bg-border">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-burgundy to-[#f07a9a] transition-all duration-300"
                    style={{ width: `${((step + 1) / 4) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex w-full items-center gap-3 sm:w-auto">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-white px-5 text-sm font-semibold uppercase tracking-wide text-charcoal transition-colors hover:border-burgundy/40 hover:text-burgundy sm:flex-none"
                  >
                    <ChevronLeft className="size-4" />
                    Back
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={handlePrimary}
                  disabled={!canNext || loading}
                  className={cn(
                    "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-burgundy to-[#e85a8a] px-7 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_12px_30px_-10px_rgba(194,24,91,0.75)] transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
                  )}
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      {selectedRoute?.status === "waitlist" && step === 0
                        ? "Joining…"
                        : "Opening checkout…"}
                    </>
                  ) : step < 3 ? (
                    selectedRoute?.status === "waitlist" && step === 0 ? (
                      "Join Waitlist"
                    ) : (
                      <>
                        Next
                        <ChevronRight className="size-4" />
                      </>
                    )
                  ) : (
                    <>
                      <Lock className="size-4" />
                      Lock In Slot — Proceed to Payment
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : null}

          {error ? (
            <p className="mt-3 text-sm text-red-600">{error}</p>
          ) : null}
        </div>
      </div>

      <EmbeddedCheckoutModal
        open={checkoutOpen}
        clientSecret={clientSecret}
        onClose={() => {
          setCheckoutOpen(false);
          setClientSecret(null);
        }}
      />
    </section>
  );
}
