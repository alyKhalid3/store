import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { bundle, getProduct, products } from "@/lib/products";
import { BuyButton, TrustLine } from "@/components/BuyButton";
import { TerminalDemo } from "@/components/TerminalDemo";

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
  if (!product || product.type === "Bundle") notFound();

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pb-28 pt-10 lg:pb-20">
        <Link href="/#products" className="text-sm text-ink-soft hover:text-ink">
          ‹ All products
        </Link>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <p className="text-sm font-medium text-amber-deep">{product.type}</p>
            <h1 className="mt-2 font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[52px]">
              {product.name}
            </h1>
            <p className="mt-5 max-w-[60ch] text-xl leading-relaxed text-ink-soft">{product.short}</p>

            <div className="mt-10">
              <TerminalDemo lines={product.demo} title="Claude Code" />
            </div>

            <p className="mt-10 max-w-[65ch] text-lg leading-relaxed">{product.description}</p>

            <h2 className="mt-12 font-display text-2xl font-semibold">What it does</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {product.features.map((f) => (
                <li key={f} className="rounded-xl border border-line bg-white p-4">{f}</li>
              ))}
            </ul>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="font-display text-xl font-semibold">Made for</h2>
                <ul className="mt-3 space-y-2 text-ink-soft">
                  {product.forWho.map((w) => <li key={w}>✓ {w}</li>)}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold">Not for</h2>
                <ul className="mt-3 space-y-2 text-ink-soft">
                  {product.notFor.map((w) => <li key={w}>✕ {w}</li>)}
                </ul>
              </div>
            </div>

            <h2 className="mt-12 font-display text-2xl font-semibold">Installing after you buy</h2>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-term p-5 font-mono text-[13.5px] leading-7 text-[#dbe6f3]">
              {product.install.join("\n")}
            </pre>

            <div className="mt-12 rounded-2xl bg-ink p-7 text-white">
              <p className="font-display text-xl font-semibold">Want all {products.length} products?</p>
              <p className="mt-1 text-[#b9c8da]">
                The complete kit is ${bundle.priceUsd} instead of ${bundle.compareAtUsd}.
              </p>
              <Link href="/#bundle" className="mt-4 inline-block font-medium text-amber underline-offset-4 hover:underline">
                See the complete kit
              </Link>
            </div>
          </div>

          {/* Purchase panel follows you on desktop */}
          <aside className="hidden h-fit rounded-2xl border border-line bg-white p-7 lg:sticky lg:top-24 lg:block">
            <p className="font-display text-5xl font-semibold">${product.priceUsd}</p>
            <p className="mt-1 text-ink-soft">One-time. Saves {product.saves}.</p>
            <div className="mt-6">
              <BuyButton product={product} size="lg" full />
            </div>
            <TrustLine className="mt-4" />
            <h2 className="mt-7 font-semibold">Included</h2>
            <ul className="mt-2 space-y-1.5 text-[15px] text-ink-soft">
              {product.includes.map((i) => <li key={i}>{i}</li>)}
            </ul>
            <p className="mt-7 border-t border-line pt-5 text-sm text-ink-soft">
              14-day guarantee: it works for you, or you get your money back.{" "}
              <Link href="/refund" className="underline underline-offset-2">Details</Link>
            </p>
          </aside>
        </div>
      </div>

      {/* Mobile buy bar: the button is always one tap away */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-5 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-display text-2xl font-semibold leading-none">${product.priceUsd}</p>
            <p className="text-xs text-ink-soft">One-time, 14-day refund</p>
          </div>
          <BuyButton product={product} />
        </div>
      </div>
    </>
  );
}
