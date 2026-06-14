"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  reg: number;
  blurb: string;
};

export type Line = { product: Product; qty: number };

type CartCtx = {
  lines: Line[];
  count: number;
  subtotal: number;
  open: boolean;
  lastAdded: string | null;
  add: (p: Product) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const add = useCallback((p: Product) => {
    setLines((prev) => {
      const found = prev.find((l) => l.product.id === p.id);
      if (found) {
        return prev.map((l) =>
          l.product.id === p.id ? { ...l, qty: l.qty + 1 } : l
        );
      }
      return [...prev, { product: p, qty: 1 }];
    });
    setLastAdded(p.name);
    setOpen(true);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.product.id === id ? { ...l, qty: Math.max(0, qty) } : l))
        .filter((l) => l.qty > 0)
    );
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.product.id !== id));
  }, []);

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.qty * l.product.price, 0);
    return {
      lines,
      count,
      subtotal,
      open,
      lastAdded,
      add,
      setQty,
      remove,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
    };
  }, [lines, open, lastAdded, add, setQty, remove]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
