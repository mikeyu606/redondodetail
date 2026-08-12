import { NextResponse } from "next/server";

type BookingBody = {
  name?: string;
  phone?: string;
  email?: string;
  vehicleMakeModel?: string;
  vehicleType?: string;
  address?: string;
  zip?: string;
  notes?: string;
  visitDate?: string;
  visitLabel?: string;
  firstVisitPrice?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingBody;

    const name = body.name?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const vehicleMakeModel = body.vehicleMakeModel?.trim() ?? "";
    const address = body.address?.trim() ?? "";
    const zip = body.zip?.trim() ?? "";
    const visitDate = body.visitDate?.trim() ?? "";

    if (name.length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json(
        { error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }
    if (vehicleMakeModel.length < 2) {
      return NextResponse.json(
        { error: "Please enter your vehicle make and model." },
        { status: 400 }
      );
    }
    if (address.length < 4) {
      return NextResponse.json({ error: "Please enter your address." }, { status: 400 });
    }
    if (zip.length < 5) {
      return NextResponse.json({ error: "Please enter your zip code." }, { status: 400 });
    }
    if (!visitDate) {
      return NextResponse.json({ error: "Please select a Saturday." }, { status: 400 });
    }

    // TODO: forward to CRM, email, or SMS when ready
    console.info("[booking] first visit", {
      name,
      phone,
      email: body.email?.trim() || null,
      vehicleMakeModel,
      vehicleType: body.vehicleType,
      address,
      zip,
      notes: body.notes?.trim() || null,
      visitDate,
      visitLabel: body.visitLabel,
      firstVisitPrice: body.firstVisitPrice,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[booking]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
