import Link from "next/link";
import { CheckCircle2, Home } from "lucide-react";
import { formatPrice, product } from "@/lib/product";

type ThankYouPageProps = {
  searchParams: Promise<{
    product?: string;
    quantity?: string;
    total?: string;
    orderId?: string;
  }>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const productName = params.product || product.name;
  const quantity = Number(params.quantity) || 1;
  const total = Number(params.total) || quantity * product.price;

  return (
    <main className="grid min-h-screen place-items-center bg-cream px-5 py-10 sm:px-6 lg:px-8">
      <section className="w-full max-w-3xl rounded-[34px] border border-sand bg-white p-7 text-center shadow-premium md:p-12">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-leaf/12">
          <CheckCircle2 className="h-11 w-11 text-leaf" />
        </div>
        <p className="mt-7 text-sm font-black uppercase tracking-[0.24em] text-sport">Order received</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-5xl">Thank you for your order!</h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
          Our sales representative will call you soon to confirm your order.
        </p>

        <div className="mx-auto mt-8 max-w-xl rounded-3xl bg-cream p-5 text-left">
          {params.orderId ? <Row label="Order ID" value={params.orderId} /> : null}
          <Row label="Product ordered" value={productName} />
          <Row label="Quantity" value={quantity} />
          <Row label="Total price" value={formatPrice(total)} strong />
          <Row label="Payment method" value="Cash On Delivery" />
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-black text-white transition hover:bg-navy"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </section>
    </main>
  );
}

function Row({ label, value, strong = false }: { label: string; value: string | number; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-sand/70 py-3 last:border-0">
      <span className="text-sm font-bold text-slate-500">{label}</span>
      <span className={strong ? "text-lg font-black text-sport" : "text-sm font-black text-ink"}>{value}</span>
    </div>
  );
}
