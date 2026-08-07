"use client";

import { useEffect, useMemo, useState } from "react";
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
import { pricingTiers, getTierById, type TierId } from "@/lib/pricing-data";
import { createCheckoutSession } from "@/lib/checkout";
import { EmbeddedCheckoutModal } from "@/components/landing/embedded-checkout-modal";
import {
  addDays,
  addWeeks,
  format,
  getDay,
  set,
  startOfDay,
  type Day,
} from "date-fns";

type RouteId = "north-redondo" | "south-redondo" | "hermosa-manhattan";
type VehicleCount = 1 | 2 | 3;

type RouteOption = {
  id: RouteId;
  name: string;
  dayLabel: string;
  weekday: Day;
  slotsLeft: number | null;
  status: "open" | "waitlist";
  image: string;
};

type WindowOption = {
  id: string;
  date: Date;
  period: "morning" | "afternoon";
  label: string;
  hours: string;
  endsAt: Date;
};

const routes: RouteOption[] = [
  {
    id: "north-redondo",
    name: "North Redondo",
    dayLabel: "Saturdays",
    weekday: 6, // Saturday
    slotsLeft: 2,
    status: "open",
    image: "/route-north-redondo.jpg",
  },
  {
    id: "south-redondo",
    name: "South Redondo",
    dayLabel: "Sundays",
    weekday: 0, // Sunday
    slotsLeft: 3,
    status: "open",
    image: "/route-south-redondo.jpg",
  },
  {
    id: "hermosa-manhattan",
    name: "Hermosa / Manhattan",
    dayLabel: "Launching Soon",
    weekday: 4,
    slotsLeft: null,
    status: "waitlist",
    image: "/route-hermosa-manhattan.jpg",
  },
];

const vehicleOptions: {
  count: VehicleCount;
  title: string;
  subtitle: string;
}[] = [
  {
    count: 1,
    title: "1 Vehicle",
    subtitle: "Standard Rate ($100–$140)",
  },
  {
    count: 2,
    title: "2 Vehicles",
    subtitle: "Driveway Bundle (Save $20/visit on 2nd car)",
  },
  {
    count: 3,
    title: "3+ Vehicles",
    subtitle: "Multi-Car Fleet",
  },
];

const stepLabels = ["Route", "Vehicles", "Window", "Address"] as const;

const PERIODS = [
  {
    period: "morning" as const,
    label: "Morning",
    hours: "8:00 AM – 12:00 PM",
    endHour: 12,
  },
  {
    period: "afternoon" as const,
    label: "Afternoon",
    hours: "1:00 PM – 5:00 PM",
    endHour: 17,
  },
];

/** Next service day on/after today that still has at least one bookable window. */
function getNextServiceDay(weekday: Day, now: Date): Date {
  let day = startOfDay(now);

  for (let i = 0; i < 14; i++) {
    if (getDay(day) === weekday) {
      const afternoonEnds = set(day, {
        hours: 17,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
      if (now < afternoonEnds) return day;
    }
    day = addDays(day, 1);
  }

  // Fallback — should never happen
  return startOfDay(addDays(now, 7));
}

/** Always builds the next 2 future service days × morning/afternoon, dropping past windows. */
function buildWindows(weekday: Day, now: Date = new Date()): WindowOption[] {
  const first = getNextServiceDay(weekday, now);
  const serviceDays = [first, addWeeks(first, 2), addWeeks(first, 4)];

  const windows: WindowOption[] = [];

  for (const date of serviceDays) {
    const day = startOfDay(date);
    for (const p of PERIODS) {
      const endsAt = set(day, {
        hours: p.endHour,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
      if (now >= endsAt) continue;

      windows.push({
        id: `${format(day, "yyyy-MM-dd")}-${p.period}`,
        date: day,
        period: p.period,
        label: `${format(day, "EEE, MMM d")} · ${p.label}`,
        hours: p.hours,
        endsAt,
      });
    }
    if (windows.length >= 4) break;
  }

  return windows.slice(0, 4);
}

function calcVisitPricing(tiers: TierId[], vehicleCount: VehicleCount) {
  const selected = tiers.slice(0, vehicleCount).map((id, index) => {
    const tier = getTierById(id);
    return {
      index,
      id: tier.id,
      label: tier.name.replace(" Care", ""),
      price: tier.subscriptionPrice,
    };
  });
  const subtotal = selected.reduce((sum, v) => sum + v.price, 0);
  const bundleDiscount = vehicleCount >= 2 ? 20 : 0;
  const total = Math.max(0, subtotal - bundleDiscount);
  return { selected, subtotal, bundleDiscount, total };
}

export function RouteCalendar() {
  const [step, setStep] = useState(0);
  const [routeId, setRouteId] = useState<RouteId | null>(null);
  const [vehicleCount, setVehicleCount] = useState<VehicleCount>(1);
  const [tiers, setTiers] = useState<TierId[]>(["crossover"]);
  const [windowId, setWindowId] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waitlistDone, setWaitlistDone] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Refresh "now" whenever we land on the window step so dates never go stale.
  useEffect(() => {
    if (step === 2) {
      setNow(new Date());
    }
  }, [step, routeId]);

  const selectedRoute = routes.find((r) => r.id === routeId) ?? null;
  const windows = useMemo(
    () =>
      selectedRoute && selectedRoute.status === "open"
        ? buildWindows(selectedRoute.weekday, now)
        : [],
    [selectedRoute, now]
  );
  const selectedWindow = windows.find((w) => w.id === windowId) ?? null;

  // Drop selection if that window expired after a refresh.
  useEffect(() => {
    if (windowId && !windows.some((w) => w.id === windowId)) {
      setWindowId(null);
    }
  }, [windows, windowId]);
  const pricing = calcVisitPricing(tiers, vehicleCount);
  const visitTotal = pricing.total;

  const canNext =
    step === 0
      ? !!routeId
      : step === 1
        ? vehicleCount >= 1 && tiers.slice(0, vehicleCount).every(Boolean)
        : step === 2
          ? !!windowId || selectedRoute?.status === "waitlist"
          : address.trim().length > 3 && zip.trim().length >= 5;

  function syncTier(count: VehicleCount) {
    setVehicleCount(count);
    setTiers((prev) => {
      const fillWith = prev[0] ?? "crossover";
      const next = [...prev];
      while (next.length < count) next.push(fillWith);
      return next.slice(0, count);
    });
  }

  function updateTier(index: number, id: TierId) {
    setTiers((prev) => prev.map((t, i) => (i === index ? id : t)));
  }

  async function handlePrimary() {
    setError(null);

    if (step < 3) {
      if (!canNext) return;
      // Waitlist route: skip windows, jump toward address/confirm
      if (step === 0 && selectedRoute?.status === "waitlist") {
        setStep(3);
        return;
      }
      if (step === 1 && selectedRoute?.status === "waitlist") {
        setStep(3);
        return;
      }
      setStep((s) => s + 1);
      return;
    }

    if (!selectedRoute || !canNext) return;
    setLoading(true);
    try {
      if (selectedRoute.status === "waitlist") {
        const result = await createCheckoutSession({
          mode: "waitlist",
          routeId: selectedRoute.id,
          routeName: selectedRoute.name,
        });
        if (result.waitlist) setWaitlistDone(true);
        return;
      }

      if (!selectedWindow) return;

      const result = await createCheckoutSession({
        mode: "subscription",
        tierId: tiers[0] ?? "crossover",
        amountCents: visitTotal * 100,
        frequency: "bi-weekly",
        routeId: selectedRoute.id,
        routeName: `${selectedRoute.name} · ${selectedRoute.dayLabel}`,
        windowId: selectedWindow.id,
        windowLabel: `${selectedWindow.label} (${selectedWindow.hours})`,
        metadata: {
          address,
          zip,
          notes,
          vehicleCount: String(vehicleCount),
          visitTotal: String(visitTotal),
          vehicles: tiers
            .slice(0, vehicleCount)
            .map((id, i) => `${i + 1}:${id}`)
            .join("|"),
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

        <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-border/80 bg-white p-5 shadow-[0_20px_60px_-30px_rgba(194,24,91,0.35)] sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={waitlistDone ? "done" : step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {waitlistDone ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-dusty-rose/50">
                    <Check className="size-7 text-burgundy" />
                  </div>
                  <h3 className="text-2xl font-semibold text-charcoal">
                    You&apos;re on the waitlist
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-slate">
                    We&apos;ll text you when Hermosa / Manhattan Thursday slots
                    open.
                  </p>
                </div>
              ) : (
                <>
                  {step === 0 && (
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-charcoal">
                        Where should we service your vehicle?
                      </h3>
                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {routes
                          .filter((r) => r.status === "open")
                          .map((route) => (
                            <button
                              key={route.id}
                              type="button"
                              onClick={() => {
                                setRouteId(route.id);
                                setWindowId(null);
                              }}
                              className={cn(
                                "flex items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all",
                                routeId === route.id
                                  ? "border-burgundy bg-pink-light/70 ring-2 ring-burgundy/20"
                                  : "border-border bg-white hover:border-burgundy/40"
                              )}
                            >
                              <div
                                className="size-14 shrink-0 rounded-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${route.image})` }}
                              />
                              <div>
                                <p className="font-semibold text-charcoal">
                                  {route.name}
                                </p>
                                <p className="mt-0.5 text-sm text-slate">
                                  {route.slotsLeft} slots left
                                </p>
                              </div>
                            </button>
                          ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setRouteId("hermosa-manhattan");
                          setWindowId(null);
                        }}
                        className={cn(
                          "mt-4 flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all",
                          routeId === "hermosa-manhattan"
                            ? "border-burgundy bg-pink-light/50 ring-2 ring-burgundy/15"
                            : "border-dashed border-border bg-beige/40 opacity-80 hover:opacity-100"
                        )}
                      >
                        <div
                          className="size-14 shrink-0 rounded-full bg-cover bg-center grayscale"
                          style={{
                            backgroundImage: `url(/route-hermosa-manhattan.jpg)`,
                          }}
                        />
                        <div>
                          <p className="font-semibold text-charcoal">
                            Hermosa / Manhattan
                          </p>
                          <p className="mt-0.5 text-sm text-slate">
                            Launching Soon · Join waitlist
                          </p>
                        </div>
                      </button>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-charcoal">
                        How many vehicles are we caring for?
                      </h3>
                      <div className="mt-6 grid gap-3">
                        {vehicleOptions.map((option) => (
                          <button
                            key={option.count}
                            type="button"
                            onClick={() => syncTier(option.count)}
                            className={cn(
                              "flex items-center justify-between rounded-2xl border px-4 py-4 text-left transition-all",
                              vehicleCount === option.count
                                ? "border-burgundy bg-pink-light/70 ring-2 ring-burgundy/20"
                                : "border-border bg-white hover:border-burgundy/40"
                            )}
                          >
                            <div>
                              <p className="font-semibold text-charcoal">
                                {option.title}
                              </p>
                              <p className="mt-0.5 text-sm text-slate">
                                {option.subtitle}
                              </p>
                            </div>
                            {vehicleCount === option.count ? (
                              <span className="rounded-full bg-burgundy px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                                Selected
                              </span>
                            ) : null}
                          </button>
                        ))}
                      </div>

                      {vehicleCount >= 2 ? (
                        <div className="mt-6 space-y-4">
                          <p className="text-sm font-medium text-slate">
                            Select body type for each vehicle
                          </p>
                          {Array.from({ length: vehicleCount }).map((_, i) => (
                            <div key={i}>
                              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate/70">
                                Vehicle {i + 1}
                                {pricing.selected[i] ? (
                                  <span className="ml-2 normal-case tracking-normal text-burgundy">
                                    ${pricing.selected[i].price}
                                  </span>
                                ) : null}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {pricingTiers.map((tier) => (
                                  <button
                                    key={tier.id}
                                    type="button"
                                    onClick={() => updateTier(i, tier.id)}
                                    className={cn(
                                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                                      tiers[i] === tier.id
                                        ? "border-burgundy bg-burgundy text-white"
                                        : "border-border bg-white text-slate hover:border-burgundy/50"
                                    )}
                                  >
                                    {tier.name.replace(" Care", "")} · $
                                    {tier.subscriptionPrice}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="mt-6">
                          <p className="mb-2 text-sm font-medium text-slate">
                            Vehicle body type
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {pricingTiers.map((tier) => (
                              <button
                                key={tier.id}
                                type="button"
                                onClick={() => updateTier(0, tier.id)}
                                className={cn(
                                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                                  tiers[0] === tier.id
                                    ? "border-burgundy bg-burgundy text-white"
                                    : "border-border bg-white text-slate hover:border-burgundy/50"
                                )}
                              >
                                {tier.name.replace(" Care", "")} · $
                                {tier.subscriptionPrice}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-6 rounded-2xl border border-burgundy/20 bg-pink-light/50 px-4 py-3 text-sm">
                        {pricing.selected.map((v) => (
                          <div
                            key={`${v.index}-${v.id}`}
                            className="flex items-center justify-between py-1 text-charcoal"
                          >
                            <span>
                              Vehicle {v.index + 1} · {v.label}
                            </span>
                            <span className="font-medium">${v.price}</span>
                          </div>
                        ))}
                        {pricing.bundleDiscount > 0 ? (
                          <div className="flex items-center justify-between py-1 text-burgundy">
                            <span>Driveway bundle discount</span>
                            <span className="font-medium">
                              −${pricing.bundleDiscount}
                            </span>
                          </div>
                        ) : null}
                        <div className="mt-2 flex items-center justify-between border-t border-burgundy/15 pt-2 font-semibold text-charcoal">
                          <span>Per visit total</span>
                          <span>${pricing.total}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && selectedRoute?.status === "open" && (
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-charcoal">
                        Select your route launch window
                      </h3>
                      <p className="mt-2 text-sm text-slate">
                        {selectedRoute.name} · {selectedRoute.dayLabel}
                      </p>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {windows.map((window) => (
                          <button
                            key={window.id}
                            type="button"
                            onClick={() => setWindowId(window.id)}
                            className={cn(
                              "rounded-2xl border px-4 py-4 text-left transition-all",
                              windowId === window.id
                                ? "border-burgundy bg-pink-light/70 ring-2 ring-burgundy/20"
                                : "border-border bg-white hover:border-burgundy/40"
                            )}
                          >
                            <p className="font-semibold text-charcoal">
                              {format(window.date, "EEE, MMM d")}
                            </p>
                            <p className="mt-1 text-sm text-slate">
                              {window.period === "morning"
                                ? "Morning"
                                : "Afternoon"}{" "}
                              ({window.hours})
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-charcoal">
                        Where is your driveway located?
                      </h3>
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
                            placeholder="90278"
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
                              {selectedRoute?.name} Route
                              {selectedWindow
                                ? ` · ${format(selectedWindow.date, "EEE, MMM d")} (${selectedWindow.period === "morning" ? "Morning" : "Afternoon"})`
                                : ""}
                            </p>
                            {pricing.selected.map((v) => (
                              <p key={`${v.index}-${v.id}`} className="text-slate">
                                Vehicle {v.index + 1}: {v.label} — ${v.price}
                              </p>
                            ))}
                            {pricing.bundleDiscount > 0 ? (
                              <p className="text-burgundy">
                                Driveway bundle −${pricing.bundleDiscount}
                              </p>
                            ) : null}
                            <p className="font-semibold text-charcoal">
                              ${visitTotal}/visit
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

          {!waitlistDone ? (
            <div className="mt-8 flex flex-col gap-4 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate">
                  Step {Math.min(step + 1, 4)}: {stepLabels[Math.min(step, 3)]}
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
                    onClick={() =>
                      setStep((s) =>
                        selectedRoute?.status === "waitlist" && s === 3
                          ? 0
                          : Math.max(0, s - 1)
                      )
                    }
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
                      Opening checkout…
                    </>
                  ) : step < 3 ? (
                    <>
                      Next
                      <ChevronRight className="size-4" />
                    </>
                  ) : selectedRoute?.status === "waitlist" ? (
                    "Join Waitlist"
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
