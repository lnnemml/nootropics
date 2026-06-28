"use client";

import { useEffect, useState } from "react";

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="7.5" cy="7.5" r="2.5" />
      <line x1="7.5" y1="1" x2="7.5" y2="2.5" />
      <line x1="7.5" y1="12.5" x2="7.5" y2="14" />
      <line x1="1" y1="7.5" x2="2.5" y2="7.5" />
      <line x1="12.5" y1="7.5" x2="14" y2="7.5" />
      <line x1="2.75" y1="2.75" x2="3.82" y2="3.82" />
      <line x1="11.18" y1="11.18" x2="12.25" y2="12.25" />
      <line x1="12.25" y1="2.75" x2="11.18" y2="3.82" />
      <line x1="3.82" y1="11.18" x2="2.75" y2="12.25" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M12.5 9.5A5.5 5.5 0 0 1 5.5 2.5a5.5 5.5 0 1 0 7 7Z" />
    </svg>
  );
}

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(isDark);
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  // Reserve space before mount so nav doesn't shift
  if (!mounted) {
    return <span className="block h-7 w-7" />;
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-7 w-7 items-center justify-center rounded text-secondary transition-colors hover:text-primary"
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
