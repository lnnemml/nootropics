"use client";

import { useState } from "react";

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
      <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary">
        {label}
      </label>
      <input
        id={id}
        className="border border-border rounded px-3.5 py-2.5 font-sans text-[15px] bg-card text-primary placeholder:text-secondary focus:outline-none focus:border-accent transition-colors"
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
      <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary">
        {label}
      </label>
      <textarea
        id={id}
        className="border border-border rounded px-3.5 py-2.5 font-sans text-[15px] bg-card text-primary placeholder:text-secondary focus:outline-none focus:border-accent transition-colors resize-none"
        {...props}
      />
    </div>
  );
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  id: string;
  children: React.ReactNode;
};

function Select({ label, id, children, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary">
        {label}
      </label>
      <select
        id={id}
        className="border border-border rounded px-3.5 py-2.5 font-sans text-[15px] bg-card text-primary focus:outline-none focus:border-accent transition-colors"
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

// ── Confirmation screen ───────────────────────────────────────────────────────

function Confirmation({
  name,
  email,
  product,
  quantity,
}: {
  name: string;
  email: string;
  product: string;
  quantity: string;
}) {
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
          {"Payment isn't processed yet — someone will email you with payment details within the same business day."}
        </p>
      </div>

      <div className="w-full border border-border rounded p-6 flex flex-col gap-5 text-left">
        <SectionLabel>{"Order summary"}</SectionLabel>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-secondary">{"Name"}</p>
            <p className="font-sans text-[15px] text-primary font-medium">{name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-secondary">{"Email"}</p>
            <p className="font-sans text-[15px] text-primary font-medium">{email}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-secondary">{"Product"}</p>
            <p className="font-sans text-[15px] text-primary font-medium">
              {product === "neurodrive" ? "NeuroDrive" : product}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-secondary">{"Qty"}</p>
            <p className="font-sans text-[15px] text-primary font-medium">{quantity}</p>
          </div>
        </div>
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary">
        {"A confirmation has been sent to your email."}
      </p>
    </div>
  );
}

// ── Form state ────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  product: string;
  quantity: string;
  note: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  product: "neurodrive",
  quantity: "1",
  note: "",
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Order submitted:", form);
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-[640px] w-full px-6 py-14 md:py-[80px]">
      {submitted ? (
        <Confirmation
          name={form.name}
          email={form.email}
          product={form.product}
          quantity={form.quantity}
        />
      ) : (
        <>
          {/* Heading */}
          <div className="mb-8">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-secondary">
              {"Order"}
            </p>
            <h1
              className="font-sans font-semibold tracking-[-0.02em] text-ink"
              style={{ fontSize: "clamp(28px, 2.5vw, 34px)" }}
            >
              {"Place your order"}
            </h1>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-secondary">
              {"No payment collected now — we'll follow up by email with details within the same business day."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Contact */}
            <div className="border-t border-border pt-6 pb-8 flex flex-col gap-4">
              <SectionLabel>{"Contact"}</SectionLabel>
              <Field
                label="Full name"
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Jane Smith"
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
                placeholder="jane@example.com"
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
                placeholder="+1 555 000 0000"
                autoComplete="tel"
              />
            </div>

            {/* Shipping */}
            <div className="border-t border-border pt-6 pb-8 flex flex-col gap-4">
              <SectionLabel>{"Shipping address"}</SectionLabel>
              <Field
                label="Address line 1"
                id="addressLine1"
                name="addressLine1"
                type="text"
                value={form.addressLine1}
                onChange={handleChange}
                required
                placeholder="123 Main St"
                autoComplete="address-line1"
              />
              <Field
                label="Address line 2 (optional)"
                id="addressLine2"
                name="addressLine2"
                type="text"
                value={form.addressLine2}
                onChange={handleChange}
                placeholder="Apt 4B"
                autoComplete="address-line2"
              />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="City"
                  id="city"
                  name="city"
                  type="text"
                  value={form.city}
                  onChange={handleChange}
                  required
                  placeholder="New York"
                  autoComplete="address-level2"
                />
                <Field
                  label="State / Province"
                  id="state"
                  name="state"
                  type="text"
                  value={form.state}
                  onChange={handleChange}
                  required
                  placeholder="NY"
                  autoComplete="address-level1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Postal code"
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  value={form.postalCode}
                  onChange={handleChange}
                  required
                  placeholder="10001"
                  autoComplete="postal-code"
                />
                <Field
                  label="Country"
                  id="country"
                  name="country"
                  type="text"
                  value={form.country}
                  onChange={handleChange}
                  required
                  placeholder="United States"
                  autoComplete="country-name"
                />
              </div>
            </div>

            {/* Order */}
            <div className="border-t border-border pt-6 pb-8 flex flex-col gap-4">
              <SectionLabel>{"Your order"}</SectionLabel>
              <Select
                label="Product"
                id="product"
                name="product"
                value={form.product}
                onChange={handleChange}
              >
                <option value="neurodrive">
                  {"NeuroDrive — Sublingual Bromantane Drops"}
                </option>
              </Select>
              <Select
                label="Quantity"
                id="quantity"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={String(n)}>
                    {n}
                  </option>
                ))}
              </Select>
            </div>

            {/* Note */}
            <div className="border-t border-border pt-6 pb-8 flex flex-col gap-4">
              <SectionLabel>{"Note (optional)"}</SectionLabel>
              <TextArea
                label="Anything we should know"
                id="note"
                name="note"
                value={form.note}
                onChange={handleChange}
                rows={3}
                placeholder={"Preferred payment method, best time to reach you, etc."}
              />
            </div>

            {/* Submit */}
            <div className="border-t border-border pt-6 flex flex-col gap-3">
              <button
                type="submit"
                className="w-full rounded bg-ink px-6 py-3 font-sans text-[15px] font-medium text-page transition-opacity hover:opacity-80"
              >
                {"Place order"}
              </button>
              <p className="text-center font-mono text-[10px] uppercase tracking-[0.12em] text-secondary">
                {"No payment collected now · we'll follow up by email"}
              </p>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
