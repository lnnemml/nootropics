"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function UTMCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const utm = {
      utm_source:   searchParams.get("utm_source"),
      utm_medium:   searchParams.get("utm_medium"),
      utm_campaign: searchParams.get("utm_campaign"),
      utm_content:  searchParams.get("utm_content"),
      utm_term:     searchParams.get("utm_term"),
    };

    if (Object.values(utm).some(Boolean)) {
      sessionStorage.setItem("nora_utm", JSON.stringify(utm));
    }
  }, [searchParams]);

  return null;
}
