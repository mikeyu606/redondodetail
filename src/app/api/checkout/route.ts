import { NextResponse } from "next/server";
import { getStripe, getSiteUrl } from "@/lib/stripe";
import { getCatalogPriceId } from "@/lib/stripe-prices";
import { getTierById, type TierId } from "@/lib/pricing-data";

export const runtime = "nodejs";

type CheckoutBody = {
  mode: "subscription" | "one-time" | "waitlist";
  tierId?: TierId;
  quantity?: number;
  amountCents?: number;
  frequency?: "bi-weekly" | "monthly";
  routeId?: string;
  routeName?: string;
  windowId?: string;
  windowLabel?: string;
  customerEmail?: string;
  customerName?: string;
  metadata?: Record<string, string>;
};

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        {
          error:
            "Stripe is not configured. Add STRIPE_SECRET_KEY to your environment.",
        },
        { status: 500 }
      );
    }

    const body = (await request.json()) as CheckoutBody;

    if (body.mode === "waitlist") {
      return NextResponse.json({
        ok: true,
        waitlist: true,
        message:
          "You're on the waitlist. We'll text you when Thursday slots open.",
      });
    }

    const tierId = body.tierId ?? "sedan";
    const tier = getTierById(tierId);
    const isSubscription = body.mode === "subscription";
    const unitAmount =
      body.amountCents ??
      (isSubscription ? tier.subscriptionPrice : tier.oneTimePrice) * 100;
    const quantity = body.amountCents ? 1 : Math.max(1, body.quantity ?? 1);

    const siteUrl = getSiteUrl();
    const productName = isSubscription
      ? `${tier.name} · Bi-Weekly Driveway Clean`
      : `${tier.name} · One-Time Driveway Clean`;

    const description = [
      body.routeName,
      body.windowLabel,
      body.frequency === "monthly" ? "Monthly" : "Every 2 weeks",
    ]
      .filter(Boolean)
      .join(" · ");

    const metadata: Record<string, string> = {
      tierId,
      billing: body.mode,
      frequency: body.frequency ?? (isSubscription ? "bi-weekly" : "one-time"),
      ...(body.routeId ? { routeId: body.routeId } : {}),
      ...(body.routeName ? { routeName: body.routeName } : {}),
      ...(body.windowId ? { windowId: body.windowId } : {}),
      ...(body.windowLabel ? { windowLabel: body.windowLabel } : {}),
      ...(body.customerName ? { customerName: body.customerName } : {}),
      ...body.metadata,
    };

    const catalogPriceId = getCatalogPriceId(
      tierId,
      isSubscription ? "subscription" : "one-time"
    );
    const catalogUnitAmount =
      (isSubscription ? tier.subscriptionPrice : tier.oneTimePrice) * 100;
    const useCatalogPrice =
      !!catalogPriceId &&
      body.frequency !== "monthly" &&
      (body.amountCents == null || body.amountCents === catalogUnitAmount);

    const session = await getStripe().checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: isSubscription ? "subscription" : "payment",
      customer_email: body.customerEmail || undefined,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      return_url: `${siteUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      metadata,
      ...(isSubscription
        ? {
            subscription_data: {
              metadata,
            },
          }
        : {
            payment_intent_data: {
              metadata,
              description: description || undefined,
            },
          }),
      line_items: [
        useCatalogPrice
          ? { price: catalogPriceId, quantity }
          : {
              quantity,
              price_data: {
                currency: "usd",
                unit_amount: unitAmount,
                product_data: {
                  name: productName,
                  description: description || tier.description,
                },
                ...(isSubscription
                  ? {
                      recurring: {
                        interval: "week" as const,
                        interval_count: body.frequency === "monthly" ? 4 : 2,
                      },
                    }
                  : {}),
              },
            },
      ],
    });

    if (!session.client_secret) {
      return NextResponse.json(
        { error: "Unable to create embedded Stripe Checkout session." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      clientSecret: session.client_secret,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("[checkout]", error);
    const message =
      error instanceof Error ? error.message : "Checkout failed. Try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
