"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const metadata = {
  title: "Contact | NORA",
  description:
    "Questions about an order, the research, or the science behind a compound — reach the NORA team directly.",
};

// ── Primitives ────────────────────────────────────────────────────────────────

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

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  id: string;
  children: React.ReactNode;
};

function Select({ label, id, children, ...props }: SelectProps) {
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
        className="border border-border rounded-[2px] px-3.5 py-2.5 font-sans text-[15px] bg-card text-primary focus:outline-none focus:border-accent transition-colors"
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

// ── Confirmation ──────────────────────────────────────────────────────────────

function Confirmation({ email }: { email: string }) {
  return (
    <div className="flex flex-col gap-6 py-8">
      <span className="flex items-center gap-[4px]">
        <span className="block h-[9px] w-[9px] rounded-full bg-accent" />
        <span className="block h-[9px] w-[9px] rounded-full bg-accent-bright" />
      </span>

      <div className="flex flex-col gap-3">
        <h2 className="font-sans font-semibold tracking-[-0.02em] text-ink text-[24px] md:text-[28px]">
          Message sent.
        </h2>
        <p className="font-sans text-[15px] leading-relaxed text-secondary max-w-[380px]">
          {"We'll be in touch at "}
          <span className="text-primary font-medium">{email}</span>
          {" within one business day."}
        </p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface ContactForm {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Contact form:", form);
    setSubmitted(true);
  }

  return (
    <Container>
      <div className="mx-auto max-w-[1040px] py-[80px] md:py-[104px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left column — info */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-[88px]">
            <div>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
                Contact
              </p>
              <h1 className="mb-5 font-sans font-semibold leading-[1.08] tracking-[-0.025em] text-ink text-[28px] md:text-[clamp(34px,3vw,42px)]">
                {"We read every message."}
              </h1>
              <p className="font-sans text-[15px] leading-relaxed text-secondary">
                {"Questions about an order, the science behind a compound, or the research — reach out below."}
              </p>
            </div>

            {/* Contact categories */}
            <div className="flex flex-col border-t border-border">
              {[
                {
                  label: "Orders",
                  body: "Shipping, order status, payment coordination.",
                },
                {
                  label: "Research",
                  body: "Mechanism questions, clinical data, compound sourcing.",
                },
                {
                  label: "Press",
                  body: "Media inquiries and partnership proposals.",
                },
              ].map(({ label, body }) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 border-b border-border py-4"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-secondary">
                    {label}
                  </p>
                  <p className="font-sans text-[14px] leading-relaxed text-secondary">
                    {body}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct email */}
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-secondary">
                Direct
              </p>
              <Link
                href="mailto:hello@noraalliance.com"
                className="font-sans text-[14px] text-ink underline-offset-2 hover:underline"
              >
                hello@noraalliance.com
              </Link>
            </div>
          </div>

          {/* Right column — form or confirmation */}
          <div>
            {submitted ? (
              <Confirmation email={form.email} />
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

                <Select
                  label="Topic"
                  id="topic"
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option value="order">Order inquiry</option>
                  <option value="research">Research question</option>
                  <option value="press">Press / media</option>
                  <option value="other">Other</option>
                </Select>

                <TextArea
                  label="Message"
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="What's on your mind?"
                />

                <button
                  type="submit"
                  className="w-full rounded-[2px] bg-ink px-6 py-3 font-sans text-[15px] font-medium text-page transition-opacity hover:opacity-80"
                >
                  {"Send message →"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </Container>
  );
}
