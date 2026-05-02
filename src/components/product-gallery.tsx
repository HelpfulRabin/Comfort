"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { product } from "@/lib/product";
import { useState } from "react";

export function ProductGallery() {
  const [index, setIndex] = useState(0);
  const active = product.images[index];

  function go(direction: number) {
    setIndex((current) => (current + direction + product.images.length) % product.images.length);
  }

  return (
    <div className="relative">
      <div className="relative aspect-square overflow-hidden rounded-[28px] border border-sand/70 bg-cream shadow-premium">
        <Image
          src={active.src}
          alt={active.alt}
          fill
          sizes="(max-width: 768px) 100vw, 48vw"
          className="object-contain p-5"
        />
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous product image"
          className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy shadow-md transition hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next product image"
          className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy shadow-md transition hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {product.images.map((image, imageIndex) => (
          <button
            type="button"
            key={image.src}
            onClick={() => setIndex(imageIndex)}
            aria-label={`Show ${image.alt}`}
            className={`relative aspect-square overflow-hidden rounded-2xl border bg-white transition ${
              imageIndex === index ? "border-sport ring-4 ring-sport/15" : "border-sand/70"
            }`}
          >
            <Image src={image.src} alt="" fill sizes="120px" className="object-contain p-2" />
          </button>
        ))}
      </div>
    </div>
  );
}
