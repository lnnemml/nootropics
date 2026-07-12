declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
    fbq: (...args: unknown[]) => void;
    clarity: (...args: unknown[]) => void;
  }
}

export {};
