import { BadgeCheck, Shield } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type RedondoPromiseProps = {
  variant?: "compact" | "card" | "banner";
  className?: string;
};

export function RedondoPromise({
  variant = "card",
  className,
}: RedondoPromiseProps) {
  const { title, text } = siteConfig.promise;

  if (variant === "compact") {
    return (
      <p
        className={cn(
          "flex items-start gap-2 text-sm leading-relaxed text-slate",
          className
        )}
      >
        <BadgeCheck className="mt-0.5 size-4 shrink-0 text-burgundy" />
        <span>
          <strong className="font-semibold text-charcoal">{title}:</strong>{" "}
          {text}
        </span>
      </p>
    );
  }

  if (variant === "banner") {
    return (
      <section
        id="promise"
        className={cn("bg-white py-14 sm:py-16", className)}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-dusty-rose/50">
            <Shield className="size-6 text-burgundy" />
          </div>
          <h2 className="text-3xl font-semibold text-burgundy sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-burgundy/80 sm:text-lg">
            &ldquo;{text}&rdquo;
          </p>
        </div>
      </section>
    );
  }

  return (
    <div
      className={cn(
        "rounded-sm border border-border bg-beige px-5 py-4 sm:px-6 sm:py-5",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-dusty-rose/40">
          <BadgeCheck className="size-5 text-burgundy" />
        </div>
        <div>
          <p className="font-semibold text-charcoal">{title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate sm:text-base">
            &ldquo;{text}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
