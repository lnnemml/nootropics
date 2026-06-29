"use client";

import { useState, useEffect, useCallback } from "react";

export interface CartItem {
  slug: string;
  qty: number;
}

export interface UseCartReturn {
  items: CartItem[];
  itemCount: number;
  addItem: (slug: string) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
}

const STORAGE_KEY = "nora-cart";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore write failures (private browsing storage quotas, etc.)
  }
}

export function useCart(): UseCartReturn {
  // Start empty to match server render — populated from localStorage on mount.
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(loadCart());
  }, []);

  const addItem = useCallback((slug: string) => {
    setItems((prev) => {
      const next = prev.some((i) => i.slug === slug)
        ? prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { slug, qty: 1 }];
      saveCart(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.slug !== slug);
      saveCart(next);
      return next;
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((prev) => {
      let next: CartItem[];
      if (qty <= 0) {
        next = prev.filter((i) => i.slug !== slug);
      } else if (prev.some((i) => i.slug === slug)) {
        next = prev.map((i) => (i.slug === slug ? { ...i, qty } : i));
      } else {
        next = [...prev, { slug, qty }];
      }
      saveCart(next);
      return next;
    });
  }, []);

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  return { items, itemCount, addItem, removeItem, setQty };
}
