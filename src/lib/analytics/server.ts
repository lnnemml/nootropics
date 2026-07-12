interface ServerEvent {
  eventName: string;
  eventId?: string;
  email?: string;
  value?: number;
  currency?: string;
  userAgent?: string;
  sourceUrl?: string;
  ip?: string;
}

async function hashEmail(email: string): Promise<string> {
  const data = new TextEncoder().encode(email.toLowerCase().trim());
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sendMetaCAPI(event: ServerEvent): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) return;

  const hashedEmail = event.email ? await hashEmail(event.email) : undefined;

  const payload = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: "website",
        event_source_url: event.sourceUrl,
        user_data: {
          em: hashedEmail ? [hashedEmail] : undefined,
          client_ip_address: event.ip,
          client_user_agent: event.userAgent,
        },
        custom_data: {
          value: event.value,
          currency: event.currency ?? "USD",
        },
      },
    ],
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v20.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      console.error("[Meta CAPI] Error:", response.status, await response.text());
    }
  } catch (error) {
    console.error("[Meta CAPI] Failed:", error);
  }
}

async function sendGA4Event(event: ServerEvent): Promise<void> {
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;
  if (!measurementId || !apiSecret) return;

  let clientId = `server.${Date.now()}`;
  if (event.email) {
    const hash = await hashEmail(event.email);
    clientId = `${hash.substring(0, 16)}.${Math.floor(Date.now() / 1000)}`;
  }

  const GA4_EVENT_MAP: Record<string, string> = {
    Purchase: "purchase",
    InitiateCheckout: "begin_checkout",
    Lead: "generate_lead",
    ViewContent: "view_item",
  };

  const payload = {
    client_id: clientId,
    events: [
      {
        name: GA4_EVENT_MAP[event.eventName] ?? event.eventName,
        params: {
          event_id: event.eventId,
          value: event.value,
          currency: event.currency ?? "USD",
          source: "server",
        },
      },
    ],
  };

  try {
    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      console.error("[GA4 MP] Error:", response.status);
    }
  } catch (error) {
    console.error("[GA4 MP] Failed:", error);
  }
}

export async function trackServerEvent(event: ServerEvent): Promise<void> {
  await Promise.allSettled([sendMetaCAPI(event), sendGA4Event(event)]);
}
