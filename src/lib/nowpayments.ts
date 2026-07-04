const API_BASE = "https://api.nowpayments.io/v1";

export interface NowPaymentsInvoice {
  id: string;
  invoice_url: string;
}

export async function createInvoice(params: {
  orderId: string;
  orderNumber: string;
  amountUsd: number;
  successUrl: string;
  cancelUrl: string;
  ipnCallbackUrl: string;
}): Promise<NowPaymentsInvoice> {
  const res = await fetch(`${API_BASE}/invoice`, {
    method: "POST",
    headers: {
      "x-api-key": process.env.NOWPAYMENTS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_amount:        params.amountUsd,
      price_currency:      "usd",
      order_id:            params.orderNumber,
      order_description:   `NORA — NeuroDrive × ${params.orderId}`,
      success_url:         params.successUrl,
      cancel_url:          params.cancelUrl,
      ipn_callback_url:    params.ipnCallbackUrl,
      is_fixed_rate:       true,
      is_fee_paid_by_user: false,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`NowPayments API error ${res.status}: ${body}`);
  }

  return res.json();
}
