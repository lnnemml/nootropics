import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact | NORA",
  description:
    "Questions about an order, the research, or the science behind a compound — reach the NORA team directly.",
};

export default function ContactPage() {
  return <ContactClient />;
}
