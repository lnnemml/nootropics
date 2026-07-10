"use client";

import { useState, useEffect, useRef, forwardRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { submitOrder } from "@/app/actions/submitOrder";
import { isValidPhoneNumber, getCountryCallingCode } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import { useGooglePlaces } from "@/hooks/useGooglePlaces";

// ── Country data ──────────────────────────────────────────────────────────────

const PRIMARY_MARKETS = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "NL", name: "Netherlands" },
  { code: "AU", name: "Australia" },
];

const OTHER_COUNTRIES = [
  { code: "AR", name: "Argentina" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BR", name: "Brazil" },
  { code: "BG", name: "Bulgaria" },
  { code: "CN", name: "China" },
  { code: "CL", name: "Chile" },
  { code: "CO", name: "Colombia" },
  { code: "HR", name: "Croatia" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "EG", name: "Egypt" },
  { code: "EE", name: "Estonia" },
  { code: "FI", name: "Finland" },
  { code: "GE", name: "Georgia" },
  { code: "GR", name: "Greece" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JP", name: "Japan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KR", name: "South Korea" },
  { code: "LV", name: "Latvia" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MY", name: "Malaysia" },
  { code: "MT", name: "Malta" },
  { code: "MX", name: "Mexico" },
  { code: "MD", name: "Moldova" },
  { code: "ME", name: "Montenegro" },
  { code: "MK", name: "North Macedonia" },
  { code: "NO", name: "Norway" },
  { code: "NZ", name: "New Zealand" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "RO", name: "Romania" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "RS", name: "Serbia" },
  { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "ZA", name: "South Africa" },
  { code: "ES", name: "Spain" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "TW", name: "Taiwan" },
  { code: "TH", name: "Thailand" },
  { code: "TR", name: "Turkey" },
  { code: "VN", name: "Vietnam" },
].sort((a, b) => a.name.localeCompare(b.name));

// ── Validation helpers ────────────────────────────────────────────────────────

const POSTAL_PATTERNS: Partial<Record<string, RegExp>> = {
  US: /^\d{5}(-\d{4})?$/,
  CA: /^[A-Z]\d[A-Z][ -]?\d[A-Z]\d$/i,
  GB: /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i,
  AU: /^\d{4}$/,
  DE: /^\d{5}$/,
  FR: /^\d{5}$/,
  UA: /^\d{5}$/,
  NL: /^\d{4}\s?[A-Z]{2}$/i,
};

const STATE_COUNTRIES = ["US", "CA", "AU", "MX", "BR", "IN"];

function getStateLabel(country: string): string {
  if (country === "US" || country === "AU") return "State";
  if (country === "CA") return "Province";
  return "State/Region";
}

function getCallingCode(country: string): string | null {
  try {
    return String(getCountryCallingCode(country as CountryCode));
  } catch {
    return null;
  }
}

function validatePhoneValue(phone: string, country: string): string | undefined {
  if (!phone.trim() || !country) return undefined;
  try {
    return isValidPhoneNumber(phone, country as CountryCode)
      ? undefined
      : "Invalid phone number for this country";
  } catch {
    return undefined;
  }
}

// ── Field primitives ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary">
      {children}
    </p>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="font-mono text-[10px] text-red-500 mt-0.5">{message}</p>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  error?: string;
};

const Field = forwardRef<HTMLInputElement, InputProps>(
  function Field({ label, id, error, ...props }, ref) {
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
          ref={ref}
          className={`border rounded-[2px] px-3.5 py-2.5 font-sans text-[15px] bg-card text-primary placeholder:text-secondary focus:outline-none transition-colors ${
            error ? "border-red-400 focus:border-red-400" : "border-border focus:border-accent"
          }`}
          {...props}
        />
        <FieldError message={error} />
      </div>
    );
  }
);

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
};

function SelectField({ label, id, error, children, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary"
      >
        {label}
      </label>
      <select
        id={id}
        className={`border rounded-[2px] px-3.5 py-2.5 font-sans text-[15px] bg-card text-primary focus:outline-none transition-colors appearance-none ${
          error ? "border-red-400 focus:border-red-400" : "border-border focus:border-accent"
        }`}
        {...props}
      >
        {children}
      </select>
      <FieldError message={error} />
    </div>
  );
}

interface PhoneFieldProps {
  value: string;
  callingCode: string | null;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

function PhoneField({ value, callingCode, error, onChange, onBlur }: PhoneFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="phone"
        className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary"
      >
        Phone
      </label>
      <div className="flex">
        {callingCode && (
          <span className="flex items-center border border-border border-r-0 rounded-l-[2px] px-3 bg-raised font-mono text-[13px] text-secondary select-none whitespace-nowrap">
            +{callingCode}
          </span>
        )}
        <input
          id="phone"
          name="phone"
          type="tel"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required
          autoComplete="tel"
          placeholder={callingCode ? "" : "+1 555 000 0000"}
          className={`flex-1 border rounded-[2px] px-3.5 py-2.5 font-sans text-[15px] bg-card text-primary placeholder:text-secondary focus:outline-none transition-colors ${
            callingCode ? "rounded-l-none border-l-0 focus:border-l focus:pl-[13px]" : ""
          } ${
            error ? "border-red-400 focus:border-red-400" : "border-border focus:border-accent"
          }`}
        />
      </div>
      <FieldError message={error} />
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

interface FormErrors {
  phone?: string;
  postalCode?: string;
}

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
          name="promoCode"
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [qty, setQty] = useState<1 | 2 | 3>(initialQty);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("crypto");
  const [utm, setUtm] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("nora_utm");
      if (stored) setUtm(JSON.parse(stored));
    } catch {}
  }, []);
  const [promoCode, setPromoCode] = useState("");

  const PRICES: Record<1 | 2 | 3, number> = { 1: 120, 2: 220, 3: 300 };
  const BUNDLE_SAVINGS: Record<1 | 2 | 3, number> = { 1: 0, 2: 20, 3: 60 };

  const basePrice = PRICES[qty];
  const bundleSaving = BUNDLE_SAVINGS[qty];
  const cryptoDiscount =
    paymentMethod === "crypto" ? Math.round(basePrice * 0.1) : 0;
  const total = basePrice - cryptoDiscount;

  const callingCode = form.country ? getCallingCode(form.country) : null;

  const addressRef = useRef<HTMLInputElement>(null);
  // Persists the Autocomplete instance — guards against React Strict Mode double-invoke
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const { isLoaded } = useGooglePlaces();

  useEffect(() => {
    if (!isLoaded || !addressRef.current || autocompleteRef.current) return;

    autocompleteRef.current = new google.maps.places.Autocomplete(
      addressRef.current,
      { types: ["address"] }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (!place?.address_components) return;

      let streetNumber = "";
      let route = "";
      let city = "";
      let state = "";
      let postalCode = "";
      let country = "";

      for (const comp of place.address_components) {
        if (comp.types.includes("street_number"))               streetNumber = comp.long_name;
        if (comp.types.includes("route"))                       route        = comp.long_name;
        if (comp.types.includes("locality"))                    city         = comp.long_name;
        if (comp.types.includes("administrative_area_level_1")) state        = comp.short_name;
        if (comp.types.includes("postal_code"))                 postalCode   = comp.long_name;
        if (comp.types.includes("country"))                     country      = comp.short_name.toUpperCase();
      }

      // Set the address input directly — it is uncontrolled, so React won't fight us
      if (addressRef.current) {
        addressRef.current.value = [streetNumber, route].filter(Boolean).join(" ");
      }

      setForm((prev) => ({
        ...prev,
        city,
        stateRegion: STATE_COUNTRIES.includes(country) ? state : "",
        postalCode,
        country,
      }));
      setErrors({});
    });
  }, [isLoaded]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the field's validation error as the user types
    if (name === "phone" || name === "postalCode") {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newCountry = e.target.value;
    setForm((prev) => ({
      ...prev,
      country: newCountry,
      // Clear state/region when switching to a country that doesn't use it
      stateRegion: STATE_COUNTRIES.includes(newCountry) ? prev.stateRegion : "",
    }));
    // Re-evaluate phone validity in new country context
    const phoneError = form.phone.trim()
      ? validatePhoneValue(form.phone, newCountry)
      : undefined;
    setErrors({ phone: phoneError });
  }

  function handlePhoneBlur() {
    const phoneError = validatePhoneValue(form.phone, form.country);
    setErrors((prev) => ({ ...prev, phone: phoneError }));
  }

  function handlePostalBlur() {
    const pattern = POSTAL_PATTERNS[form.country];
    if (!pattern || !form.postalCode.trim()) {
      setErrors((prev) => ({ ...prev, postalCode: undefined }));
      return;
    }
    setErrors((prev) => ({
      ...prev,
      postalCode: pattern.test(form.postalCode.trim())
        ? undefined
        : "Invalid postal code format",
    }));
  }

  function runValidation(): boolean {
    const phoneError = validatePhoneValue(form.phone, form.country);
    const pattern = POSTAL_PATTERNS[form.country];
    const postalError =
      pattern && form.postalCode.trim() && !pattern.test(form.postalCode.trim())
        ? "Invalid postal code format"
        : undefined;
    setErrors({ phone: phoneError, postalCode: postalError });
    return !phoneError && !postalError;
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
            <form
              action={submitOrder}
              onSubmit={(e) => {
                if (!runValidation()) e.preventDefault();
              }}
              className="flex flex-col"
            >
              <input type="hidden" name="qty" value={String(qty)} />
              <input type="hidden" name="paymentMethod" value={paymentMethod} />
              <input type="hidden" name="utmSource"   value={utm.utm_source   ?? ""} />
              <input type="hidden" name="utmMedium"   value={utm.utm_medium   ?? ""} />
              <input type="hidden" name="utmCampaign" value={utm.utm_campaign ?? ""} />
              <input type="hidden" name="utmContent"  value={utm.utm_content  ?? ""} />
              <input type="hidden" name="utmTerm"     value={utm.utm_term     ?? ""} />

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
                <PhoneField
                  value={form.phone}
                  callingCode={callingCode}
                  error={errors.phone}
                  onChange={handleChange}
                  onBlur={handlePhoneBlur}
                />
              </div>

              {/* Shipping address */}
              <div className="border-t border-border pt-6 pb-7 flex flex-col gap-4">
                <SectionLabel>{"Shipping address"}</SectionLabel>

                {/* Country first */}
                <SelectField
                  label="Country"
                  id="country"
                  name="country"
                  value={form.country}
                  onChange={handleCountryChange}
                  required
                  autoComplete="country"
                >
                  <option value="">Select country…</option>
                  <optgroup label="Primary markets">
                    {PRIMARY_MARKETS.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="All countries">
                    {OTHER_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </optgroup>
                </SelectField>

                <Field
                  ref={addressRef}
                  label="Address"
                  id="address"
                  name="address"
                  type="text"
                  onChange={handleChange}
                  required
                  placeholder="Street address"
                  autoComplete="off"
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
                    onBlur={handlePostalBlur}
                    required
                    autoComplete="postal-code"
                    error={errors.postalCode}
                  />
                </div>

                {/* State/Province — only for relevant countries */}
                {STATE_COUNTRIES.includes(form.country) && (
                  <Field
                    label={getStateLabel(form.country)}
                    id="stateRegion"
                    name="stateRegion"
                    type="text"
                    value={form.stateRegion}
                    onChange={handleChange}
                    autoComplete="address-level1"
                  />
                )}
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
