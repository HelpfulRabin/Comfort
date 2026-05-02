import Image from "next/image";
import { BadgeCheck, Headphones, PackageCheck, Shirt, Sparkles, Truck } from "lucide-react";
import { CtaLink } from "@/components/cta-link";
import { Faq } from "@/components/faq";
import { OrderPanel } from "@/components/order-panel";
import { ProductGallery } from "@/components/product-gallery";
import { formatPrice, product } from "@/lib/product";

const trustItems = [
  { icon: PackageCheck, label: "Cash on Delivery" },
  { icon: Truck, label: "Fast delivery" },
  { icon: Headphones, label: "Customer support" },
  { icon: BadgeCheck, label: "Easy order process" },
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-cream" />
        <div className="relative mx-auto grid min-h-[92vh] max-w-7xl items-center gap-10 px-5 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="py-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-3 py-2 pr-5">
              <span className="relative block h-12 w-12 overflow-hidden rounded-full bg-white">
                <Image
                  src={product.logoImage}
                  alt={`${product.brandName} logo`}
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
              </span>
              <span className="text-sm font-bold text-cream">{product.brandName} premium everyday essential</span>
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
              Premium T-shirts made for comfort, style, and confidence.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">{product.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink label="Purchase Now" />
              <CtaLink label="Order Now" className="bg-white text-ink hover:bg-cream" />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {trustItems.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/8 p-4">
                  <item.icon className="h-5 w-5 text-sand" />
                  <p className="mt-3 text-sm font-bold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl pb-8 lg:pb-0">
            <div className="relative aspect-square overflow-hidden rounded-[34px] bg-cream shadow-premium">
              <Image
                src={product.heroImage}
                alt="Comfort Summer premium sporty T-shirt"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-contain p-5"
              />
            </div>
            <div className="absolute -bottom-2 left-6 right-6 rounded-3xl bg-white p-4 text-ink shadow-premium">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-500">Starting price</p>
                  <p className="text-3xl font-black text-sport">{formatPrice(product.price)}</p>
                </div>
                <p className="rounded-full bg-leaf px-4 py-2 text-sm font-black text-white">COD Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-20 sm:px-6 lg:px-8" id="showcase">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-sport">Product showcase</p>
              <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-ink md:text-5xl">
                Choose your quantity and place your COD order in seconds.
              </h2>
            </div>
            <CtaLink label="Order Now" />
          </div>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <ProductGallery />
            <OrderPanel />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-leaf">Why buy this product</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-5xl">
              Everyday quality that works as hard as you do.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.benefits.map((benefit) => (
              <div key={benefit} className="rounded-3xl border border-sand/70 bg-cream p-6">
                <Sparkles className="h-6 w-6 text-sport" />
                <p className="mt-4 font-black leading-6 text-ink">{benefit}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <CtaLink label="Buy Now" />
          </div>
        </div>
      </section>

      <section className="bg-ink px-5 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-sand">Customer stories</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Trusted by everyday wearers.</h2>
            </div>
            <Shirt className="hidden h-16 w-16 text-sport md:block" />
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {product.testimonials.map((testimonial) => (
              <figure key={testimonial.name} className="rounded-3xl border border-white/10 bg-white/8 p-6">
                <blockquote className="text-base leading-7 text-white/84">&quot;{testimonial.quote}&quot;</blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-5">
                  <p className="font-black">{testimonial.name}</p>
                  <p className="text-sm text-white/62">{testimonial.location}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-sport">FAQ</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-5xl">
              Answers before you order.
            </h2>
          </div>
          <Faq />
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[34px] bg-ink p-8 text-center text-white shadow-premium md:p-14">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-sand">Cash on delivery available</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
            Ready to upgrade your everyday T-shirt?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/76">
            Order now for {formatPrice(product.price)} with free delivery and pay only when your order arrives.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CtaLink label="Purchase Now" />
            <CtaLink label="Order Now" className="bg-white text-ink hover:bg-cream" />
          </div>
        </div>
      </section>
    </main>
  );
}
