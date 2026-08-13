export const BOOKING_EVENT = "hdc:open-booking";

export function openBooking() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(BOOKING_EVENT));
}
