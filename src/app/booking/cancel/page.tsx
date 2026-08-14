import Link from "next/link";

export default function BookingCancelPage() {
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
          <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-burgundy/20 bg-pink-light sm:size-[4.5rem]">
            <span className="font-heading text-2xl text-burgundy sm:text-3xl">
              ✕
            </span>
          </div>

          <p className="mt-5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-burgundy">
            No charge made
          </p>
          <h1 className="mt-2 text-center font-heading text-[1.85rem] font-medium leading-tight tracking-tight text-charcoal sm:text-4xl">
            Checkout canceled
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-relaxed text-slate sm:text-base">
            Your Redondo Beach Saturday slot is still open. Pick up where you left off
            whenever you&apos;re ready.
          </p>

          <Link
            href="/#route-schedule"
            className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-burgundy to-[#e85a8a] text-sm font-semibold uppercase tracking-wide text-white shadow-[0_12px_30px_-10px_rgba(194,24,91,0.75)] transition-all hover:brightness-105"
          >
            Reserve again
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
        </div>
      </div>
    </main>
  );
}
