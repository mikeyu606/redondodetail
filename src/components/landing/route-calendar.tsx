"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { submitBooking } from "@/lib/booking";
import { pricingTiers, getTierById, type TierId } from "@/lib/pricing-data";
import { addDays, addWeeks, format, getDay, startOfDay } from "date-fns";

type CycleOption = {
  id: string;
  startDate: Date;
  label: string;
  detail: string;
};

const redondoRoute = {
  id: "redondo" as const,
  name: "Redondo Beach",
  windowLabel: "Saturdays & Sundays · 8 AM – 4 PM",
  slotsLeft: 4,
};

const stepLabels = [
  "Date & Time",
  "Your Info",
  "Your Vehicle",
  "Your Driveway",
  "Confirmation",
] as const;
const TOTAL_STEPS = stepLabels.length;
const CONFIRMATION_STEP = TOTAL_STEPS - 1;

const inputClass =
  "w-full rounded-xl border border-border bg-white px-4 py-3.5 text-base text-charcoal outline-none ring-burgundy/20 placeholder:text-slate/50 focus:border-burgundy focus:ring-2";

function nextWeekday(weekday: number, now: Date): Date {
  let day = startOfDay(now);
  while (getDay(day) !== weekday) {
    day = addDays(day, 1);
  }
  return day;
}

function toCycle(date: Date): CycleOption {
  return {
    id: format(date, "yyyy-MM-dd"),
    startDate: date,
    label: format(date, "EEE, MMM d"),
    detail: format(date, "MMMM d"),
  };
}

function buildCycleOptions(now: Date = new Date()): CycleOption[] {
  const saturday = nextWeekday(6, now);
  const sunday = nextWeekday(0, now);
  return [
    toCycle(saturday),
    toCycle(sunday),
    toCycle(addWeeks(saturday, 1)),
    toCycle(addWeeks(sunday, 1)),
  ].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}

function StepContext({ label }: { label: string }) {
  return (
    <p className="mt-2 text-sm text-slate">
      First visit · {label} · {redondoRoute.windowLabel}
    </p>
  );
}

function DateStep({
  cycles,
  cycleId,
  slotsMonth,
  onSelect,
}: {
  cycles: CycleOption[];
  cycleId: string | null;
  slotsMonth: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <div>
      <div className="mb-4">
        <span className="inline-flex items-center rounded-full bg-burgundy px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          Only {redondoRoute.slotsLeft} slots left for {slotsMonth}
        </span>
      </div>
      <h3 className="text-2xl font-semibold tracking-tight text-charcoal">
        Which weekend day works for your first visit?
      </h3>
      <p className="mt-2 text-sm text-slate">
        {redondoRoute.windowLabel} · Redondo Beach. Pick a Saturday or Sunday
        window and we&apos;ll handle the rest.
      </p>

      <div className="mt-5 grid gap-2">
        {cycles.map((cycle) => {
          const selected = cycleId === cycle.id;
          return (
            <button
              key={cycle.id}
              type="button"
              tabIndex={onSelect ? 0 : -1}
              onClick={onSelect ? () => onSelect(cycle.id) : undefined}
              className={cn(
                "flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-all",
                selected
                  ? "border-burgundy bg-pink-light/70 ring-2 ring-burgundy/20"
                  : "border-border bg-white hover:border-burgundy/40"
              )}
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-charcoal">{cycle.label}</p>
                <p className="text-xs text-slate">8 AM – 4 PM arrival window</p>
              </div>
              {selected ? (
                <span className="shrink-0 rounded-full bg-burgundy px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Selected
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function RouteCalendar() {
  const [step, setStep] = useState(0);
  const [cycleId, setCycleId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleMakeModel, setVehicleMakeModel] = useState("");
  const [vehicleType, setVehicleType] = useState<TierId>("suv");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const stepScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    stepScrollRef.current?.scrollTo({ top: 0 });
  }, [step]);

  const cycles = useMemo(() => buildCycleOptions(), []);
  const selectedCycle = cycles.find((c) => c.id === cycleId) ?? null;
  const slotsMonth = format(cycles[0]?.startDate ?? new Date(), "MMMM");
  const selectedTier = getTierById(vehicleType);
  const firstVisitPrice = selectedTier.subscriptionPrice;

  const canNext =
    step === 0
      ? !!cycleId
      : step === 1
        ? name.trim().length >= 2 && phone.replace(/\D/g, "").length >= 10
        : step === 2
          ? vehicleMakeModel.trim().length >= 2
          : step === 3
            ? address.trim().length > 3 && zip.trim().length >= 5
            : confirmed;

  async function handlePrimary() {
    setError(null);

    if (step < CONFIRMATION_STEP - 1) {
      if (!canNext) return;
      setStep((s) => s + 1);
      return;
    }

    if (step === CONFIRMATION_STEP - 1) {
      if (!selectedCycle || !canNext) return;
      setLoading(true);
      try {
        await submitBooking({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          vehicleMakeModel: vehicleMakeModel.trim(),
          vehicleType,
          address: address.trim(),
          zip: zip.trim(),
          notes: notes.trim() || undefined,
          visitDate: selectedCycle.id,
          visitLabel: selectedCycle.label,
          firstVisitPrice: String(firstVisitPrice),
        });
        setConfirmed(true);
        setStep(CONFIRMATION_STEP);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <section id="route-schedule" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            <span className="mr-1.5" aria-hidden>
              💳
            </span>
            Pay After Service
          </Badge>
          <h2 className="section-title text-charcoal">
            Book Your First Driveway Reset
          </h2>
          <p className="lede mt-4 text-slate">
            Select a Saturday or Sunday below. Experience your first reset from
            $50. You are charged $0 today, and only pay after your service is
            complete.
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl flex-col rounded-[1.75rem] border border-border/80 bg-white p-5 shadow-[0_20px_60px_-30px_rgba(194,24,91,0.35)] sm:p-8">
          <div className="relative">
            <div className="invisible pointer-events-none select-none" aria-hidden>
              <DateStep
                cycles={cycles}
                cycleId={cycleId}
                slotsMonth={slotsMonth}
              />
            </div>
            <div ref={stepScrollRef} className="absolute inset-0 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {step === 0 && (
                    <DateStep
                      cycles={cycles}
                      cycleId={cycleId}
                      slotsMonth={slotsMonth}
                      onSelect={setCycleId}
                    />
                  )}

                  {step === 1 && selectedCycle ? (
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-charcoal">
                        How can we reach you?
                      </h3>
                      <StepContext label={selectedCycle.label} />

                      <div className="mt-8 space-y-5">
                        <label className="block">
                          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate">
                            Your Name
                          </span>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Sarah M."
                            className={inputClass}
                          />
                        </label>
                        <label className="block">
                          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate">
                            Phone
                          </span>
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="tel"
                            placeholder="(424) 555-0123"
                            className={inputClass}
                          />
                        </label>
                        <label className="block">
                          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate">
                            Email (Optional)
                          </span>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="you@email.com"
                            className={inputClass}
                          />
                        </label>
                      </div>
                    </div>
                  ) : null}

                  {step === 2 && selectedCycle ? (
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-charcoal">
                        What are we cleaning?
                      </h3>
                      <StepContext label={selectedCycle.label} />

                      <div className="mt-8 space-y-6">
                        <label className="block">
                          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate">
                            Vehicle Make &amp; Model
                          </span>
                          <input
                            value={vehicleMakeModel}
                            onChange={(e) => setVehicleMakeModel(e.target.value)}
                            placeholder="e.g., Range Rover Sport"
                            className={inputClass}
                          />
                        </label>

                        <div>
                          <span className="mb-3 block text-xs font-medium uppercase tracking-wide text-slate">
                            Vehicle Type
                          </span>
                          <div className="grid gap-3">
                            {pricingTiers.map((tier) => {
                              const selected = vehicleType === tier.id;
                              return (
                                <button
                                  key={tier.id}
                                  type="button"
                                  onClick={() => setVehicleType(tier.id)}
                                  className={cn(
                                    "rounded-xl border px-4 py-3.5 text-left text-sm transition-all",
                                    selected
                                      ? "border-burgundy bg-pink-light/70 ring-2 ring-burgundy/20"
                                      : "border-border bg-white hover:border-burgundy/40"
                                  )}
                                >
                                  <span className="font-medium text-charcoal">
                                    {tier.name}
                                  </span>
                                  <span className="ml-2 text-slate">
                                    ${tier.subscriptionPrice} / bi-weekly
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {step === 3 && selectedCycle ? (
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-charcoal">
                        Where is your driveway?
                      </h3>
                      <StepContext label={selectedCycle.label} />

                      <div className="mt-8 space-y-5">
                        <label className="block">
                          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate">
                            Street Address
                          </span>
                          <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="1234 Catalina Ave, Redondo Beach"
                            className={inputClass}
                          />
                        </label>
                        <label className="block">
                          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate">
                            Zip Code
                          </span>
                          <input
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            placeholder="92660"
                            className={inputClass}
                          />
                        </label>
                        <label className="block">
                          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate">
                            Gate / Parking Notes (Optional)
                          </span>
                          <input
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Left side of driveway"
                            className={inputClass}
                          />
                        </label>
                      </div>

                      <p className="mt-8 rounded-2xl border border-burgundy/15 bg-pink-light/50 px-4 py-4 text-sm leading-relaxed text-slate">
                        <span className="font-medium text-charcoal">
                          ${firstVisitPrice} due after your reset.
                        </span>{" "}
                        You&apos;re charged $0 today. Please have outdoor water
                        and an outdoor outlet available on wash day.
                      </p>
                    </div>
                  ) : null}

                  {step === CONFIRMATION_STEP && confirmed && selectedCycle ? (
                    <div className="py-2 text-center">
                      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-burgundy to-[#e85a8a] shadow-[0_12px_30px_-10px_rgba(194,24,91,0.75)]">
                        <Check className="size-8 text-white" strokeWidth={2.75} />
                      </div>
                      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-burgundy">
                        You&apos;re all set
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl">
                        Your first visit is booked
                      </h3>
                      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate">
                        You&apos;re charged $0 today. We&apos;ll text you the day
                        before with your arrival window. ${firstVisitPrice} is due
                        after your service is complete.
                      </p>

                      <dl className="mx-auto mt-7 max-w-md space-y-3 rounded-2xl border border-burgundy/15 bg-pink-light/70 px-4 py-4 text-left sm:px-5">
                        <div className="flex items-start gap-3">
                          <CalendarDays className="mt-0.5 size-4 shrink-0 text-burgundy" />
                          <div>
                            <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate">
                              Visit
                            </dt>
                            <dd className="text-sm font-medium text-charcoal">
                              {selectedCycle.label} · {redondoRoute.windowLabel}
                            </dd>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Car className="mt-0.5 size-4 shrink-0 text-burgundy" />
                          <div>
                            <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate">
                              Vehicle
                            </dt>
                            <dd className="text-sm font-medium text-charcoal">
                              {vehicleMakeModel} · {selectedTier.name}
                            </dd>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="mt-0.5 size-4 shrink-0 text-burgundy" />
                          <div>
                            <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate">
                              Driveway
                            </dt>
                            <dd className="text-sm font-medium text-charcoal">
                              {address}, {zip}
                            </dd>
                          </div>
                        </div>
                      </dl>
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {step < CONFIRMATION_STEP ? (
            <div className="mt-5 flex shrink-0 flex-col gap-4 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate">
                  Step {step + 1}: {stepLabels[step]}
                </p>
                <div className="relative mt-2 h-1.5 max-w-xs overflow-hidden rounded-full bg-border">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-burgundy to-[#f07a9a] transition-all duration-300"
                    style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-5 text-sm font-semibold uppercase tracking-wide text-charcoal transition-colors hover:border-burgundy/40 hover:text-burgundy sm:flex-none"
                  >
                    <ChevronLeft className="size-4" />
                    Back
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={handlePrimary}
                  disabled={!canNext || loading}
                  className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-burgundy to-[#e85a8a] px-6 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_12px_30px_-10px_rgba(194,24,91,0.75)] transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40 sm:px-7"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Booking…
                    </>
                  ) : step === CONFIRMATION_STEP - 1 ? (
                    "Book My First Visit"
                  ) : (
                    <>
                      Next
                      <ChevronRight className="size-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : null}

          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
        </div>

        <p className="mx-auto mt-6 max-w-4xl text-center text-sm leading-relaxed text-slate sm:mt-8">
          <span className="mr-1.5" aria-hidden>
            💬
          </span>
          Have a question before booking? Text us directly at{" "}
          <a
            href="sms:+14242487189"
            className="font-medium text-burgundy underline decoration-burgundy/30 underline-offset-2 transition-colors hover:text-burgundy/80"
          >
            (424)-248-7189
          </a>
        </p>
      </div>
    </section>
  );
}
