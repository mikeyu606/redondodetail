"use client";

export type BookingRequest = {
  name: string;
  phone: string;
  email?: string;
  vehicleMakeModel: string;
  vehicleType: "sedan" | "crossover" | "suv";
  address: string;
  zip: string;
  notes?: string;
  visitDate: string;
  visitLabel: string;
  firstVisitPrice?: string;
};

export async function submitBooking(payload: BookingRequest) {
  const res = await fetch("/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as { ok?: boolean; error?: string };

  if (!res.ok) {
    throw new Error(data.error || "Booking failed. Please try again.");
  }

  return data;
}
