"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/layout/Container";

// ── Field primitives ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary">
      {children}
    </p>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
};

function Field({ label, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary"
      >
        {label}
      </label>
      <input
        id={id}
        className="border border-border rounded-[2px] px-3.5 py-2.5 font-sans text-[15px] bg-card text-primary placeholder:text-secondary focus:outline-none focus:border-accent transition-colors"
        {...props}
      />
    </div>
  );
}

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  id: string;
};

function TextArea({ label, id, ...props }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary"
      >
        {label}
      </label>
      <textarea
        id={id}
        className="border border-border rounded-[2px] px-3.5 py-2.5 font-sans text-[15px] bg-card text-primary placeholder:text-secondary focus:outline-none focus:border-accent transition-colors resize-none"
        {...props}
      />
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormFields {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  stateRegion: string;
  country: string;
  note: string;
}

type PaymentMethod = "crypto" | "manual";

// ── PaymentOption ─────────────────────────────────────────────────────────────

interface PaymentOptionProps {
  value: string;
  selected: boolean;
  disabled?: boolean;
  onSelect: () => void;
  label: string;
  description: string;
  badge?: { text: string; variant: "accent" | "muted" };
}

function PaymentOption({
  selected,
  disabled,
  onSelect,
  label,
  description,
  badge,
}: PaymentOptionProps) {
  const cardBase =
    "border rounded-[2px] p-4 flex items-start gap-3 transition-colors";
  const cardState = disabled
    ? "border-border opacity-40 cursor-not-allowed"
    : selected
      ? "border-accent bg-card cursor-pointer"
      : "border-border cursor-pointer hover:border-[rgba(46,58,60,0.35)]";

  return (
    <div
      className={`${cardBase} ${cardState}`}
      onClick={!disabled ? onSelect : undefined}
    >
      <div
        className={`mt-0.5 shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
          selected && !disabled ? "border-accent" : "border-border"
        }`}
      >
        {selected && !disabled && (
          <div className="w-2 h-2 rounded-full bg-accent" />
        )}
      </div>

      <div className="flex flex-col gap-0.5 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-sans text-[14px] font-medium text-primary">
            {label}
          </span>
          {badge && (
            <span
              className={`font-mono text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-[2px] ${
                badge.variant === "accent"
                  ? "bg-accent/10 text-accent"
                  : "bg-raised text-secondary border border-border"
              }`}
            >
              {badge.text}
            </span>
          )}
        </div>
        <p className="font-sans text-[13px] text-secondary leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
}

// ── OrderSummary ──────────────────────────────────────────────────────────────

interface OrderSummaryProps {
  qty: 1 | 2 | 3;
  setQty: (n: 1 | 2 | 3) => void;
  paymentMethod: PaymentMethod;
  basePrice: number;
  bundleSaving: number;
  cryptoDiscount: number;
  total: number;
  promoCode: string;
  setPromoCode: (v: string) => void;
}

function OrderSummary({
  qty,
  setQty,
  paymentMethod,
  basePrice,
  bundleSaving,
  cryptoDiscount,
  total,
  promoCode,
  setPromoCode,
}: OrderSummaryProps) {
  return (
    <div className="bg-card border border-border rounded-[2px] p-5 flex flex-col gap-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-secondary">
        Order summary
      </p>

      {/* Product card */}
      <div className="flex items-start gap-3">
        <Image
          src="/neurodrive_without_bg.png"
          alt="NeuroDrive"
          width={48}
          height={72}
          className="object-contain shrink-0"
        />
        <div className="flex flex-col gap-2 flex-1">
          <p className="font-sans text-[14px] font-medium text-ink">
            NeuroDrive
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-secondary">
            30 ml · 80 mg/ml · ~30 day supply
          </p>

          <div className="flex gap-1">
            {([1, 2, 3] as const).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setQty(n)}
                className={`w-8 h-8 rounded-[2px] font-mono text-[12px] border transition-colors ${
                  qty === n
                    ? "border-accent bg-accent text-white"
                    : "border-border text-secondary hover:border-accent/60"
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          {bundleSaving > 0 && (
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-accent">
              Save ${bundleSaving} on bundle
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Promo code */}
      <div className="flex gap-2">
        <input
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Promo code"
          className="flex-1 border border-border rounded-[2px] px-3 py-2 font-sans text-[13px] bg-page text-primary placeholder:text-secondary focus:outline-none focus:border-accent transition-colors"
        />
        <button
          type="button"
          onClick={() => {
            /* TODO: validate against backend */
          }}
          className="px-3 py-2 border border-border rounded-[2px] font-mono text-[11px] uppercase tracking-[0.1em] text-secondary hover:border-accent/50 transition-colors whitespace-nowrap"
        >
          Apply
        </button>
      </div>

      <div className="border-t border-border" />

      {/* Price breakdown */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-baseline">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-secondary">
            Subtotal
          </span>
          <span className="font-sans text-[14px] text-primary">
            ${basePrice}
          </span>
        </div>

        {bundleSaving > 0 && (
          <div className="flex justify-between items-baseline">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-secondary">
              Bundle discount
            </span>
            <span className="font-sans text-[14px] text-secondary">
              –${bundleSaving}
            </span>
          </div>
        )}

        {paymentMethod === "crypto" && (
          <div className="flex justify-between items-baseline">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
              Crypto discount (10%)
            </span>
            <span className="font-sans text-[14px] text-accent">
              –${cryptoDiscount}
            </span>
          </div>
        )}

        <div className="flex justify-between items-baseline">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-secondary">
            Shipping
          </span>
          <span className="font-sans text-[14px] text-accent font-medium">
            Free
          </span>
        </div>

        <div className="border-t border-border my-1" />

        <div className="flex justify-between items-baseline">
          <span className="font-sans text-[15px] font-semibold text-ink">
            Total
          </span>
          <span className="font-sans text-[20px] font-semibold text-ink">
            ${total}
          </span>
        </div>
      </div>

      {/* Trust signals */}
      <div className="flex flex-col gap-1.5 pt-1">
        {[
          "Free worldwide shipping",
          "≥98% purity · NMR-verified",
          "Legal in US · CA · EU",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <span className="text-accent text-[12px] leading-none">✓</span>
            <span className="font-mono text-[10px] text-secondary">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Confirmation ──────────────────────────────────────────────────────────────

function Confirmation({
  name,
  email,
  qty,
  total,
  paymentMethod,
}: {
  name: string;
  email: string;
  qty: number;
  total: number;
  paymentMethod: PaymentMethod;
}) {
  const paymentMsg =
    paymentMethod === "crypto"
      ? `A NowPayments invoice will be sent to ${email} within the same business day.`
      : `We'll contact ${email} to arrange payment within the same business day.`;

  return (
    <div className="flex flex-col items-center text-center gap-8 py-16">
      <span className="flex items-center gap-[4px]">
        <span className="block h-[9px] w-[9px] rounded-full bg-accent" />
        <span className="block h-[9px] w-[9px] rounded-full bg-accent-bright" />
      </span>

      <div className="flex flex-col gap-3">
        <h2
          className="font-sans font-semibold tracking-[-0.02em] text-ink"
          style={{ fontSize: "clamp(28px, 2.5vw, 34px)" }}
        >
          {"Order received."}
        </h2>
        <p className="font-sans text-[16px] leading-relaxed text-secondary max-w-[420px]">
          {paymentMsg}
        </p>
      </div>

      <div className="w-full border border-border rounded-[2px] p-6 flex flex-col gap-5 text-left">
        <SectionLabel>{"Order summary"}</SectionLabel>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-secondary">
              Name
            </p>
            <p className="font-sans text-[15px] text-primary font-medium">
              {name}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-secondary">
              Email
            </p>
            <p className="font-sans text-[15px] text-primary font-medium">
              {email}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-secondary">
              Quantity
            </p>
            <p className="font-sans text-[15px] text-primary font-medium">
              {qty}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-secondary">
              Total
            </p>
            <p className="font-sans text-[15px] text-primary font-medium">
              ${total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CheckoutInner ─────────────────────────────────────────────────────────────

function CheckoutInner() {
  const searchParams = useSearchParams();
  const qtyParam = searchParams.get("qty");
  const initialQty: 1 | 2 | 3 =
    ([1, 2, 3] as const).find((n) => String(n) === qtyParam) ?? 1;

  const [form, setForm] = useState<FormFields>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    stateRegion: "",
    country: "",
    note: "",
  });
  const [qty, setQty] = useState<1 | 2 | 3>(initialQty);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("crypto");
  const [promoCode, setPromoCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const PRICES: Record<1 | 2 | 3, number> = { 1: 120, 2: 220, 3: 300 };
  const BUNDLE_SAVINGS: Record<1 | 2 | 3, number> = { 1: 0, 2: 20, 3: 60 };

  const basePrice = PRICES[qty];
  const bundleSaving = BUNDLE_SAVINGS[qty];
  const cryptoDiscount =
    paymentMethod === "crypto" ? Math.round(basePrice * 0.1) : 0;
  const total = basePrice - cryptoDiscount;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Order submitted:", { ...form, qty, paymentMethod, total });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Container>
        <div className="mx-auto max-w-[1080px] py-12 md:py-[80px]">
          <Confirmation
            name={form.name}
            email={form.email}
            qty={qty}
            total={total}
            paymentMethod={paymentMethod}
          />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mx-auto max-w-[1080px] py-12 md:py-[80px]">
        <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.14em] text-secondary">
          Checkout
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">
          {/* ORDER SUMMARY — source-first (mobile top), desktop right */}
          <div className="lg:order-last lg:sticky lg:top-[88px]">
            <OrderSummary
              qty={qty}
              setQty={(n) => setQty(n)}
              paymentMethod={paymentMethod}
              basePrice={basePrice}
              bundleSaving={bundleSaving}
              cryptoDiscount={cryptoDiscount}
              total={total}
              promoCode={promoCode}
              setPromoCode={(v) => setPromoCode(v)}
            />
          </div>

          {/* FORM — source-second (mobile bottom), desktop left */}
          <div className="lg:order-first">
            <form onSubmit={handleSubmit} className="flex flex-col">
              {/* Contact */}
              <div className="border-t border-border pt-6 pb-7 flex flex-col gap-4">
                <SectionLabel>{"Contact"}</SectionLabel>
                <Field
                  label="Full name"
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
                <Field
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
                <Field
                  label="Phone"
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                />
              </div>

              {/* Shipping address */}
              <div className="border-t border-border pt-6 pb-7 flex flex-col gap-4">
                <SectionLabel>{"Shipping address"}</SectionLabel>
                <Field
                  label="Address"
                  id="address"
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="Street address"
                  autoComplete="address-line1"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="City"
                    id="city"
                    name="city"
                    type="text"
                    value={form.city}
                    onChange={handleChange}
                    required
                    autoComplete="address-level2"
                  />
                  <Field
                    label="Postal code"
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    value={form.postalCode}
                    onChange={handleChange}
                    required
                    autoComplete="postal-code"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="State / Region"
                    id="stateRegion"
                    name="stateRegion"
                    type="text"
                    value={form.stateRegion}
                    onChange={handleChange}
                    placeholder="NY (optional)"
                    autoComplete="address-level1"
                  />
                  <Field
                    label="Country"
                    id="country"
                    name="country"
                    type="text"
                    value={form.country}
                    onChange={handleChange}
                    required
                    autoComplete="country-name"
                  />
                </div>
              </div>

              {/* Payment method */}
              <div className="border-t border-border pt-6 pb-7 flex flex-col gap-3">
                <SectionLabel>{"Payment method"}</SectionLabel>
                <PaymentOption
                  value="crypto"
                  selected={paymentMethod === "crypto"}
                  onSelect={() => setPaymentMethod("crypto")}
                  label="Crypto via NowPayments"
                  description="BTC, ETH, USDC, and 150+ currencies"
                  badge={{ text: "Save 10%", variant: "accent" }}
                />
                <PaymentOption
                  value="manual"
                  selected={paymentMethod === "manual"}
                  onSelect={() => setPaymentMethod("manual")}
                  label="Manual arrangement"
                  description={"We'll contact you by email — PayPal, SEPA/SWIFT, Western Union, and more"}
                />
                <PaymentOption
                  value="card"
                  selected={false}
                  disabled={true}
                  onSelect={() => {}}
                  label="Card online"
                  description="Not yet available"
                  badge={{ text: "Coming soon", variant: "muted" }}
                />
              </div>

              {/* Note */}
              <div className="border-t border-border pt-6 pb-7 flex flex-col gap-4">
                <SectionLabel>{"Note (optional)"}</SectionLabel>
                <TextArea
                  label=""
                  id="note"
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  rows={2}
                  aria-label="Note"
                  placeholder={
                    paymentMethod === "crypto"
                      ? "Any special instructions for your order…"
                      : "Preferred payment method, best time to reach you, etc."
                  }
                />
              </div>

              {/* Submit */}
              <div className="border-t border-border pt-6 flex flex-col gap-3">
                <button
                  type="submit"
                  className="w-full rounded-[2px] bg-ink px-6 py-3 font-sans text-[15px] font-medium text-page transition-opacity hover:opacity-80"
                >
                  {paymentMethod === "crypto"
                    ? "Request crypto invoice →"
                    : "Submit order →"}
                </button>
                <p className="text-center font-mono text-[10px] uppercase tracking-[0.1em] text-secondary">
                  {"Free shipping · NMR-verified · Legal in US · CA · EU"}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

// ── Page (Suspense wrapper required by useSearchParams) ───────────────────────

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-secondary">
          Loading...
        </div>
      }
    >
      <CheckoutInner />
    </Suspense>
  );
}
