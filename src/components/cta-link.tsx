import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { product } from "@/lib/product";

type CtaLinkProps = {
  quantity?: number;
  label?: string;
  className?: string;
};

export function CtaLink({ quantity = 1, label = "Order Now", className = "" }: CtaLinkProps) {
  const total = quantity * product.price;
  const href = `/checkout?product=${encodeURIComponent(product.name)}&quantity=${quantity}&price=${product.price}&total=${total}`;

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sport px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/20 transition hover:-translate-y-0.5 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-sport/25 ${className}`}
    >
      {label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}
