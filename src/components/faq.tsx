"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { product } from "@/lib/product";

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-sand/80 rounded-[28px] border border-sand/80 bg-white shadow-premium">
      {product.faqs.map((faq, index) => (
        <div key={faq.question}>
          <button
            type="button"
            onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
            className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left font-black text-ink md:px-8"
          >
            <span>{faq.question}</span>
            <ChevronDown
              className={`h-5 w-5 flex-none text-sport transition ${openIndex === index ? "rotate-180" : ""}`}
            />
          </button>
          {openIndex === index ? (
            <p className="px-6 pb-6 text-sm leading-7 text-slate-600 md:px-8">{faq.answer}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
