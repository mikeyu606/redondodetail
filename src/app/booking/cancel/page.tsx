import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BookingCancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-beige px-4">
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-charcoal">
          Checkout canceled
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate">
          No charge was made. Your neighborhood slot is still available — pick up
          where you left off whenever you&apos;re ready.
        </p>
        <Button asChild className="mt-6 w-full">
          <Link href="/#route-schedule">Reserve again</Link>
        </Button>
      </div>
    </main>
  );
}
