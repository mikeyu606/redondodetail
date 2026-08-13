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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { submitBooking } from "@/lib/booking";
import { BOOKING_EVENT, openBooking } from "@/lib/open-booking";
import { pricingTiers, getTierById, type TierId } from "@/lib/pricing-data";
import { addDays, addWeeks, format, getDay, startOfDay } from "date-fns";

type CycleOption = {
  id: string;
  startDate: Date;
  label: string;
  detail: string;
};

const newportRoute = {
  id: "newport" as const,
  name: "Newport Beach",
  windowLabel: "Sat & Sun · 8 AM – 4 PM",
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
  "w-full rounded-xl border border-border bg-white px-4 py-3.5 text-sm text-charcoal outline-none ring-burgundy/20 placeholder:text-slate/50 focus:border-burgundy focus:ring-2";

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
      First visit · {label} · {newportRoute.windowLabel}
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
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <div className="mb-4">
        <span className="inline-flex items-center rounded-full bg-burgundy px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          Only {newportRoute.slotsLeft} slots left for {slotsMonth}
        </span>
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-charcoal sm:text-2xl">
        Which weekend day works for your first visit?
      </h3>
      <p className="mt-2 text-sm text-slate">
        {newportRoute.windowLabel} · Newport Beach.
      </p>

      <div className="mt-5 grid gap-3">
        {cycles.map((cycle) => {
          const selected = cycleId === cycle.id;
          return (
            <button
              key={cycle.id}
              type="button"
              onClick={() => onSelect(cycle.id)}
              className={cn(
                "rounded-2xl border px-4 py-4 text-left transition-all",
                selected
                  ? "border-burgundy bg-pink-light/70 ring-2 ring-burgundy/20"
                  : "border-border bg-white hover:border-burgundy/40"
              )}
            >
              <p className="font-semibold text-charcoal">{cycle.label}</p>
              <p className="mt-1 text-sm text-slate">8 AM – 4 PM arrival window</p>
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
  );
}

export function RouteCalendar() {
  const [open, setOpen] = useState(false);
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
    const openModal = () => setOpen(true);
    const onHash = () => {
      if (window.location.hash === "#route-schedule") setOpen(true);
    };
    window.addEventListener(BOOKING_EVENT, openModal);
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => {
      window.removeEventListener(BOOKING_EVENT, openModal);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

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
          <h2 className="font-heading text-4xl font-medium tracking-tight text-charcoal sm:text-5xl">
            Book Your First Driveway Reset
          </h2>
          <p className="mt-4 text-slate">
            Experience your first reset from $50—you are charged $0 today, and
            only pay after your service is complete.
          </p>
          <div className="mt-8">
            <Button
              className="h-12 rounded-full px-8"
              onClick={() => openBooking()}
            >
              Reserve Your Slot
            </Button>
          </div>
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[min(40rem,calc(100dvh-1.25rem))] w-[calc(100%-1.25rem)] max-w-lg translate-x-[-50%] flex-col gap-0 overflow-hidden p-0 sm:h-[min(42rem,calc(100dvh-3rem))] max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:top-auto max-sm:h-[min(92dvh,42rem)] max-sm:w-full max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-b-none max-sm:rounded-t-[1.75rem]">
          <DialogHeader className="shrink-0 border-b border-border/70 px-5 pb-4 pt-5 text-left sm:px-6">
            <DialogTitle className="pr-8 font-heading text-xl font-medium tracking-tight sm:text-2xl">
              Book Your First Reset
            </DialogTitle>
            <DialogDescription>
              $0 today · pay after service · from ${firstVisitPrice}
            </DialogDescription>
          </DialogHeader>

          <div ref={stepScrollRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
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
                    <h3 className="text-xl font-semibold tracking-tight text-charcoal">
                      How can we reach you?
                    </h3>
                    <StepContext label={selectedCycle.label} />
                    <div className="mt-6 space-y-4">
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
                    <h3 className="text-xl font-semibold tracking-tight text-charcoal">
                      What are we cleaning?
                    </h3>
                    <StepContext label={selectedCycle.label} />
                    <div className="mt-6 space-y-5">
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
                        <div className="grid gap-2.5">
                          {pricingTiers.map((tier) => {
                            const selected = vehicleType === tier.id;
                            return (
                              <button
                                key={tier.id}
                                type="button"
                                onClick={() => setVehicleType(tier.id)}
                                className={cn(
                                  "rounded-xl border px-4 py-3 text-left text-sm transition-all",
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
                    <h3 className="text-xl font-semibold tracking-tight text-charcoal">
                      Where is your driveway?
                    </h3>
                    <StepContext label={selectedCycle.label} />
                    <div className="mt-6 space-y-4">
                      <label className="block">
                        <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate">
                          Street Address
                        </span>
                        <input
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="1234 Blossom Ln, Newport Beach"
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
                    <p className="mt-5 rounded-2xl border border-burgundy/15 bg-pink-light/50 px-4 py-3 text-sm leading-relaxed text-slate">
                      <span className="font-medium text-charcoal">
                        ${firstVisitPrice} due after your reset.
                      </span>{" "}
                      Charged $0 today.
                    </p>
                  </div>
                ) : null}

                {step === CONFIRMATION_STEP && confirmed && selectedCycle ? (
                  <div className="py-2 text-center">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-burgundy to-[#e85a8a]">
                      <Check className="size-7 text-white" strokeWidth={2.75} />
                    </div>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-burgundy">
                      You&apos;re all set
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-charcoal">
                      Your first visit is booked
                    </h3>
                    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate">
                      We&apos;ll text you the day before. ${firstVisitPrice} is due
                      after service.
                    </p>
                    <dl className="mx-auto mt-6 space-y-3 rounded-2xl border border-burgundy/15 bg-pink-light/70 px-4 py-4 text-left">
                      <div className="flex items-start gap-3">
                        <CalendarDays className="mt-0.5 size-4 shrink-0 text-burgundy" />
                        <div>
                          <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate">
                            Visit
                          </dt>
                          <dd className="text-sm font-medium text-charcoal">
                            {selectedCycle.label} · {newportRoute.windowLabel}
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

          {step < CONFIRMATION_STEP ? (
            <div className="shrink-0 border-t border-border/70 bg-white px-5 py-4 sm:px-6">
              <p className="text-xs font-medium text-slate">
                Step {step + 1}: {stepLabels[step]}
              </p>
              <div className="relative mt-2 h-1.5 overflow-hidden rounded-full bg-border">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-burgundy to-[#f07a9a] transition-all duration-300"
                  style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                />
              </div>
              {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
              <div className="mt-4 flex gap-3">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-white px-4 text-sm font-semibold uppercase tracking-wide text-charcoal"
                  >
                    <ChevronLeft className="size-4" />
                    Back
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={handlePrimary}
                  disabled={!canNext || loading}
                  className="inline-flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-burgundy to-[#e85a8a] px-5 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_12px_30px_-10px_rgba(194,24,91,0.75)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Booking…
                    </>
                  ) : step === CONFIRMATION_STEP - 1 ? (
                    "Book My Visit"
                  ) : (
                    <>
                      Next
                      <ChevronRight className="size-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="shrink-0 border-t border-border/70 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-burgundy to-[#e85a8a] text-sm font-semibold uppercase tracking-wide text-white"
              >
                Done
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
