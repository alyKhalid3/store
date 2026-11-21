import type { Product } from "@/lib/products";

type Props = { product: Product; size?: "md" | "lg"; full?: boolean; label?: string };

export function BuyButton({ product, size = "md", full = false, label }: Props) {
  const pad = size === "lg" ? "px-7 py-4 text-base" : "px-5 py-2.5 text-sm";
  const base = `inline-flex items-center justify-center rounded-lg font-semibold transition ${pad} ${full ? "w-full" : ""}`;

  if (!product.polarProductId) {
    return (
      <span className={`${base} cursor-not-allowed border border-line bg-white text-ink-soft`}>
        Coming soon
      </span>
    );
  }

  // GET /checkout?products=<id> → Polar hosted checkout
  return (
    <a
      href={`/checkout?products=${encodeURIComponent(product.polarProductId)}`}
      className={`${base} bg-ink text-white shadow-[inset_0_-3px_0_var(--amber)] hover:bg-[#163a63]`}
    >
      {label ?? `Get it for $${product.priceUsd}`}
    </a>
  );
}

export function TrustLine({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm text-ink-soft ${className}`}>
      One-time payment, secure checkout by Polar. Cards, Apple Pay and Google Pay.
    </p>
  );
}
