import type { Product } from "@/lib/products";

export function BuyButton({ product, full = false }: { product: Product; full?: boolean }) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition";
  const width = full ? " w-full" : "";

  if (!product.polarProductId) {
    return (
      <span className={`${base}${width} cursor-not-allowed border border-border text-muted`}>
        Coming soon
      </span>
    );
  }

  // GET /checkout?products=<id> → Polar hosted checkout
  return (
    <a
      href={`/checkout?products=${encodeURIComponent(product.polarProductId)}`}
      className={`${base}${width} bg-accent text-black hover:brightness-110`}
    >
      Buy for ${product.priceUsd}
    </a>
  );
}
