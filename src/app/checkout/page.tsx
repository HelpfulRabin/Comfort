import { Suspense } from "react";
import { CheckoutForm } from "@/app/checkout/checkout-form";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <CheckoutForm />
    </Suspense>
  );
}
