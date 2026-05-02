"use client";

import { Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { CtaLink } from "@/components/cta-link";
import { formatPrice, product } from "@/lib/product";

export function OrderPanel() {
  const [quantity, setQuantity] = useState(1);
  const total = quantity * product.price;

  return (
    <div className="rounded-[28px] border border-sand/70 bg-white p-6 shadow-premium md:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-leaf">{product.brandName}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-ink md:text-4xl">{product.name}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600">{product.description}</p>

      <div className="mt-6 grid gap-3">
        {product.benefits.slice(0, 5).map((benefit) => (
          <div key={benefit} className="flex items-start gap-3 text-sm font-semibold text-ink">
            <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-leaf" />
            <span>{benefit}</span>
          </div>
        ))}
      </div>

      <div className="mt-7 rounded-2xl bg-cream p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-600">Price per piece</p>
            <p className="text-3xl font-black text-sport">{formatPrice(product.price)}</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
            <Truck className="h-4 w-4 text-leaf" />
            <span className="text-sm font-bold text-ink">Free delivery</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="text-sm font-bold text-ink">Quantity</span>
          <div className="flex items-center overflow-hidden rounded-full border border-sand bg-white">
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="grid h-11 w-11 place-items-center text-navy transition hover:bg-cream"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="grid h-11 min-w-12 place-items-center font-black text-ink">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((value) => value + 1)}
              className="grid h-11 w-11 place-items-center text-navy transition hover:bg-cream"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-sand pt-5">
          <span className="font-bold text-ink">Total</span>
          <span className="text-2xl font-black text-ink">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <CtaLink quantity={quantity} label="Purchase Now" />
        <CtaLink quantity={quantity} label="Buy Now" className="bg-ink hover:bg-navy" />
      </div>
    </div>
  );
}
