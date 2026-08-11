import Link from "next/link";
import { CalendarDays, Car, Check, MapPin } from "lucide-react";
import { format, parseISO } from "date-fns";
import { getStripe } from "@/lib/stripe";

type SessionSummary = {
  email?: string | null;
  fleet?: string;
  visitTotal?: string;
  firstVisit?: string;
  routeName?: string;
  windowLabel?: string;
};

async function getSessionSummary(
  sessionId?: string
): Promise<SessionSummary | null> {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) return null;

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    const meta = session.metadata ?? {};
    return {
      email: session.customer_details?.email ?? session.customer_email,
      fleet: meta.fleet,
      visitTotal: meta.visitTotal,
      firstVisit: meta.firstVisit,
      routeName: meta.routeName,
      windowLabel: meta.windowLabel,
    };
  } catch {
    return null;
  }
}

function formatVisitDate(value?: string) {
  if (!value) return null;
  try {
    return format(parseISO(value), "EEE, MMM d");
  } catch {
    return value;
  }
}

export default async function BookingSuccessPage({
  searchParams,
}: PageProps<"/booking/success">) {
  const { session_id: sessionId } = await searchParams;
  const summary = await getSessionSummary(
    typeof sessionId === "string" ? sessionId : undefined
  );
  const firstVisit = formatVisitDate(summary?.firstVisit);

  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-dusty-rose">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-white/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -right-16 size-80 rounded-full bg-burgundy/15 blur-3xl"
      />

      <header className="relative z-10 px-5 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8 sm:pt-8">
        <Link
          href="/"
          className="font-brand text-[1.35rem] lowercase leading-none tracking-[-0.02em] text-charcoal sm:text-[1.6rem]"
        >
          her driveway club
        </Link>
      </header>

      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
        <div className="w-full max-w-lg rounded-[1.75rem] border border-white/70 bg-white/95 p-6 shadow-[0_20px_60px_-30px_rgba(194,24,91,0.45)] backdrop-blur-sm sm:p-10">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-burgundy to-[#e85a8a] shadow-[0_12px_30px_-10px_rgba(194,24,91,0.75)] sm:size-[4.5rem]">
            <Check
              className="size-8 text-white sm:size-9"
              strokeWidth={2.75}
            />
          </div>

          <p className="mt-5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-burgundy">
            You&apos;re booked
          </p>
          <h1 className="mt-2 text-center font-heading text-[1.85rem] font-medium leading-tight tracking-tight text-charcoal sm:text-4xl">
            You&apos;re on the route
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-relaxed text-slate sm:text-base">
            We&apos;ll text you the day before with driveway timing. Sit back —
            your Saturday just got easier.
          </p>

          {summary?.fleet || firstVisit || summary?.visitTotal ? (
            <dl className="mt-7 space-y-3 rounded-2xl border border-burgundy/15 bg-pink-light/70 px-4 py-4 text-left sm:px-5">
              {firstVisit ? (
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 size-4 shrink-0 text-burgundy" />
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate">
                      First visit
                    </dt>
                    <dd className="text-sm font-medium text-charcoal">
                      {firstVisit} · every other Saturday
                    </dd>
                  </div>
                </div>
              ) : null}
              {summary?.fleet ? (
                <div className="flex items-start gap-3">
                  <Car className="mt-0.5 size-4 shrink-0 text-burgundy" />
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate">
                      Care plan
                    </dt>
                    <dd className="text-sm font-medium text-charcoal">
                      {summary.fleet}
                      {summary.visitTotal
                        ? ` — $${summary.visitTotal} every 2 weeks`
                        : ""}
                    </dd>
                  </div>
                </div>
              ) : null}
              {summary?.routeName ? (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-burgundy" />
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate">
                      Route
                    </dt>
                    <dd className="text-sm font-medium text-charcoal">
                      {summary.routeName}
                    </dd>
                  </div>
                </div>
              ) : null}
            </dl>
          ) : null}

          <Link
            href="/"
            className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-burgundy to-[#e85a8a] text-sm font-semibold uppercase tracking-wide text-white shadow-[0_12px_30px_-10px_rgba(194,24,91,0.75)] transition-all hover:brightness-105"
          >
            Back to home
          </Link>

          <p className="mt-5 text-center text-sm leading-relaxed text-slate">
            <span className="mr-1" aria-hidden>
              💬
            </span>
            Questions? Text us at{" "}
            <a
              href="sms:+14242487189"
              className="font-medium text-burgundy underline decoration-burgundy/30 underline-offset-2"
            >
              (424)-248-7189
            </a>
          </p>
          {summary?.email ? (
            <p className="mt-2 text-center text-xs text-slate/70">
              A receipt is on its way to {summary.email}
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
