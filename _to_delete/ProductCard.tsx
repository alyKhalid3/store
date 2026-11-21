import Link from "next/link";
import type { Product } from "@/lib/products";
import { BuyButton } from "./BuyButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
          {product.type}
        </span>
        {product.badge && <span className="text-xs text-muted">{product.badge}</span>}
      </div>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{product.short}</p>
      <ul className="mt-4 space-y-1.5 text-sm">
        {product.features.slice(0, 3).map((f) => (
          <li key={f} className="flex gap-2">
            <span className="text-accent">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between gap-3">
        <span className="text-2xl font-bold">${product.priceUsd}</span>
        <div className="flex items-center gap-3">
          <Link href={`/products/${product.slug}`} className="text-sm text-muted hover:text-foreground">
            Details
          </Link>
          <BuyButton product={product} />
        </div>
      </div>
    </div>
  );
}
