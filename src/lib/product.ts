export const product = {
  brandName: "Comfort Summer",
  name: "Tshirts",
  logoImage: "/products/Blue%20and%20White%20Minimalist%20Personal%20Logo.png",
  faviconImage: "/products/Blue%20and%20White%20Minimalist%20Personal%20Logo8.png",
  price: 699,
  currency: "Rs.",
  deliveryFee: 0,
  heroImage: "/products/hero-tshirt.png",
  images: [
    {
      src: "/products/hero-tshirt.png",
      alt: "Sporty navy, red, and white premium T-shirt",
    },
    {
      src: "/products/classic-white-tshirt.png",
      alt: "Classic white everyday T-shirt",
    },
    {
      src: "/products/grey-logo-tshirt.png",
      alt: "Grey premium cotton blend T-shirt",
    },
    {
      src: "/products/navy-tshirt.png",
      alt: "Minimal navy everyday T-shirt",
    },
  ],
  description:
    "Premium quality t-shirts designed for everyday comfort, effortless style, and all-day confidence. Made with soft, breathable fabric that feels great on the skin, these tees are perfect for casual wear, layering, or making a bold statement with minimal effort.",
  benefits: [
    "All-day comfort with soft, breathable fabric",
    "Easy everyday style for jeans, joggers, shorts, or jackets",
    "Premium feel with a clean modern fit",
    "Long-lasting stitching, shape, softness, and color",
    "Breathable and lightweight for warmer days",
    "Flattering fit that supports confidence in every wear",
    "Low maintenance and easy to style",
    "Great value for premium everyday quality",
  ],
  testimonials: [
    {
      quote:
        "Honestly didn’t expect the quality to be this good for the price. The fabric feels soft, fits perfectly, and still looks great after washing. Definitely ordering more.",
      name: "Suman K.",
      location: "Kathmandu",
    },
    {
      quote:
        "Super comfortable and easy to wear all day. The fit is clean, the material feels premium, and it goes with everything. One of the best t-shirts I’ve bought recently.",
      name: "Ritesh M.",
      location: "Pokhara",
    },
    {
      quote:
        "I bought one just to try it and ended up ordering two more. Great quality, great fit, and the price is totally worth it. Simple, stylish, and comfortable.",
      name: "Anish R.",
      location: "Lalitpur",
    },
  ],
  faqs: [
    {
      question: "What fabric are these t-shirts made of?",
      answer:
        "Our t-shirts are made from soft, breathable premium cotton blend fabric that feels comfortable on the skin and is perfect for everyday wear.",
    },
    {
      question: "Will the t-shirt shrink after washing?",
      answer:
        "No, the fabric is made to hold its shape well. Just follow the basic wash instructions and your t-shirt will stay soft, fitted, and comfortable after multiple washes.",
    },
    {
      question: "Is this t-shirt good for daily wear?",
      answer:
        "Yes, absolutely. These t-shirts are designed for everyday comfort whether you're going out, working, relaxing, or layering it with a jacket.",
    },
    {
      question: "How is the fitting?",
      answer:
        "The t-shirt has a modern regular fit that feels comfortable and looks flattering on all body types: not too tight, not too loose.",
    },
    {
      question: "Do you offer cash on delivery?",
      answer:
        "Yes, we offer Cash on Delivery all across Nepal for a smooth and hassle-free shopping experience.",
    },
  ],
};

export function formatPrice(amount: number) {
  return `${product.currency} ${amount.toLocaleString("en-NP")}`;
}
