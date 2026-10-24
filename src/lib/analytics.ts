export type AnalyticsEvent =
  | "view_trial_landing"
  | "click_book_cta"
  | "booking_started"
  | "booking_submitted"
  | "booking_confirmed"
  | "click_whatsapp"
  | "view_packages";

export function track(event: AnalyticsEvent, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  // Dev stub only — no Umami / third-party placeholders in public HTML
  console.log("[analytics]", event, payload ?? {});
}
