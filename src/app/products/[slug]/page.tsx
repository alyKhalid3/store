import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, products } from "@/lib/products";
import { BuyButton } from "@/components/BuyButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return product ? { title: product.name, description: product.short } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <Link href="/#products" className="text-sm text-muted hover:text-foreground">← All products</Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div>
          <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">{product.type}</span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{product.description}</p>

          <h2 className="mt-10 text-xl font-semibold">What it does</h2>
          <ul className="mt-4 space-y-2">
            {product.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-accent">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl font-semibold">Install after purchase</h2>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-surface p-4 font-mono text-sm leading-7">
            {product.install.join("\n")}
          </pre>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-surface p-6 lg:sticky lg:top-6">
          <p className="text-3xl font-bold">${product.priceUsd}</p>
          <p className="mt-1 text-sm text-muted">One-time payment · USD · free updates</p>
          <div className="mt-6">
            <BuyButton product={product} full />
          </div>
          <h3 className="mt-6 text-sm font-semibold">Includes</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {product.includes.map((i) => <li key={i}>• {i}</li>)}
          </ul>
          <p className="mt-6 text-xs text-muted">
            14-day refund if it doesn&apos;t work as described. <Link href="/refund" className="underline">Policy</Link>
          </p>
        </aside>
      </div>
    </div>
  );
}
