import "./types";

type EventParams = Record<string, string | number | boolean | undefined>;

const META_EVENT_MAP: Record<string, string> = {
  checkout_started: "InitiateCheckout",
  order_placed: "Purchase",
  product_viewed: "ViewContent",
  email_subscribed: "Lead",
};

export function trackEvent(
  eventName: string,
  params?: EventParams,
  eventId?: string
): void {
  if (typeof window === "undefined") return;

  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      event_id: eventId,
      ...params,
    });
  }

  if (typeof window.fbq === "function") {
    const metaEvent = META_EVENT_MAP[eventName] ?? eventName;
    const metaParams = params ? { ...params } : {};
    if (eventId) {
      window.fbq("track", metaEvent, metaParams, { eventID: eventId });
    } else {
      window.fbq("track", metaEvent, metaParams);
    }
  }

  if (typeof window.clarity === "function") {
    window.clarity("set", eventName, params ? JSON.stringify(params) : "true");
  }
}

export function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}
