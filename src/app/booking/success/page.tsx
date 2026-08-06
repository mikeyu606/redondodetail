import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-beige px-4">
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-dusty-rose/40">
          <CheckCircle2 className="size-7 text-burgundy" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-charcoal">
          You&apos;re on the route!
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate">
          We&apos;ll text you a reminder the day before your service with
          driveway timing and route details.
        </p>
        <Button asChild className="mt-6 w-full">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
