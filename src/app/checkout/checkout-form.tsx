"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, LockKeyhole, PackageCheck } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { formatPrice, product } from "@/lib/product";

type FieldErrors = Partial<Record<"fullName" | "phone" | "email" | "location", string>>;

function getNumber(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const selected = useMemo(() => {
    const quantity = Math.max(1, Math.floor(getNumber(searchParams.get("quantity"), 1)));
    const pricePerPiece = getNumber(searchParams.get("price"), product.price);
    return {
      productName: searchParams.get("product") || product.name,
      quantity,
      pricePerPiece,
      totalPrice: quantity * pricePerPiece,
    };
  }, [searchParams]);

  function validate(formData: FormData) {
    const nextErrors: FieldErrors = {};
    const fullName = String(formData.get("fullName") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const location = String(formData.get("location") || "").trim();

    if (!fullName) nextErrors.fullName = "Name is required";
    if (!phone) nextErrors.phone = "Phone number is required";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Valid email is required";
    if (!location) nextErrors.location = "Location is required";

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);
    setError("");

    if (!validate(formData)) return;

    setIsSubmitting(true);

    const payload = {
      fullName: String(formData.get("fullName") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      location: String(formData.get("location") || "").trim(),
      ...selected,
    };

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Order submission failed. Please try again.");
      }

      const params = new URLSearchParams({
        product: selected.productName,
        quantity: String(selected.quantity),
        total: String(selected.totalPrice),
        orderId: result.order.orderId,
      });

      router.push(`/thank-you?${params.toString()}`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Order submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-sport">
          <ArrowLeft className="h-4 w-4" />
          Back to product
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-start">
          <form onSubmit={submitOrder} className="rounded-[30px] border border-sand bg-white p-6 shadow-premium md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-sport">Secure COD checkout</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-5xl">Confirm your order</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Fill in your delivery details. Product and price are automatically carried from your selection.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Field name="fullName" label="Full Name" error={fieldErrors.fullName} />
              <Field name="phone" label="Phone Number" error={fieldErrors.phone} />
              <Field name="email" label="Email Address" type="email" error={fieldErrors.email} />
              <Field
                name="location"
                label="Exact Location"
                placeholder="Kindly share your exact location"
                error={fieldErrors.location}
              />
            </div>

            <div className="mt-8 grid gap-5 rounded-3xl bg-cream p-5 md:grid-cols-2">
              <ReadOnlyField label="Product Name" value={selected.productName} />
              <ReadOnlyField label="Quantity" value={String(selected.quantity)} />
              <ReadOnlyField label="Price Per Piece" value={formatPrice(selected.pricePerPiece)} />
              <ReadOnlyField label="Total Price" value={formatPrice(selected.totalPrice)} highlight />
            </div>

            {error ? (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-sport px-6 py-3 text-sm font-black text-white shadow-lg shadow-red-900/20 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting Order...
                </>
              ) : (
                "Order Now"
              )}
            </button>
          </form>

          <aside className="rounded-[30px] bg-ink p-6 text-white shadow-premium md:p-8">
            <PackageCheck className="h-10 w-10 text-sand" />
            <h2 className="mt-5 text-3xl font-black">Order summary</h2>
            <div className="mt-6 space-y-4">
              <SummaryRow label="Product" value={selected.productName} />
              <SummaryRow label="Quantity" value={selected.quantity} />
              <SummaryRow label="Price per piece" value={formatPrice(selected.pricePerPiece)} />
              <SummaryRow label="Delivery" value="Free" />
              <SummaryRow label="Payment method" value="Cash On Delivery" />
              <div className="border-t border-white/12 pt-4">
                <SummaryRow label="Total" value={formatPrice(selected.totalPrice)} strong />
              </div>
            </div>
            <div className="mt-7 rounded-3xl bg-white/8 p-4">
              <div className="flex items-start gap-3">
                <LockKeyhole className="mt-0.5 h-5 w-5 text-sand" />
                <p className="text-sm leading-6 text-white/76">
                  Your order details are sent securely to the business email and Google Spreadsheet from the server.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-ink">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-2xl border border-sand bg-white px-4 text-ink outline-none transition focus:border-sport focus:ring-4 focus:ring-sport/10"
      />
      {error ? <span className="mt-2 block text-sm font-semibold text-red-700">{error}</span> : null}
    </label>
  );
}

function ReadOnlyField({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className={`mt-1 text-lg font-black ${highlight ? "text-sport" : "text-ink"}`}>{value}</p>
    </div>
  );
}

function SummaryRow({ label, value, strong = false }: { label: string; value: string | number; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-white/62">{label}</span>
      <span className={strong ? "text-2xl font-black text-white" : "text-sm font-bold text-white"}>{value}</span>
    </div>
  );
}
