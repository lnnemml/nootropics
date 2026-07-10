import { useEffect, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

let loadPromise: Promise<void> | null = null;

function ensureLoaded(apiKey: string): Promise<void> {
  if (!loadPromise) {
    setOptions({ key: apiKey, v: "weekly" });
    loadPromise = importLibrary("places").then(() => undefined);
  }
  return loadPromise;
}

export function useGooglePlaces(): { isLoaded: boolean } {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey) return;

    ensureLoaded(apiKey).then(() => setIsLoaded(true)).catch(() => {});
  }, []);

  return { isLoaded };
}
