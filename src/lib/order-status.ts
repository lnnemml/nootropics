export const STATUS_LABELS: Record<string, string> = {
  pending_payment_instructions: "Processing",
  awaiting_payment:             "Awaiting payment",
  paid:                         "Paid",
  fulfilled:                    "Shipped",
  cancelled:                    "Cancelled",
};

export const STATUS_COLORS: Record<string, string> = {
  pending_payment_instructions: "text-amber-500",
  awaiting_payment:             "text-yellow-500",
  paid:                         "text-green-600",
  fulfilled:                    "text-teal-600",
  cancelled:                    "text-ink/30",
};
