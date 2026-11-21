import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, products } from "@/lib/products";
import { BuyButton, TrustLine } from "@/components/BuyButton";
import { TerminalDemo } from "@/components/TerminalDemo";
import { ReelVideo } from "@/components/ReelVideo";

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
    <>
      <div className="mx-auto max-w-6xl px-6 pb-28 pt-10 lg:pb-20">
        <Link href="/" className="text-sm text-ink-soft hover:text-ink">
          ‹ Home
        </Link>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <p className="text-sm font-medium text-amber-deep">{product.type}</p>
            <h1 className="mt-2 font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[52px]">
              {product.name}
            </h1>
            <p className="mt-5 max-w-[60ch] text-xl leading-relaxed text-ink-soft">{product.short}</p>

            <div className="mt-10">
              {product.video ? (
                <figure className="rounded-2xl border border-line bg-white px-6 py-10">
                  <ReelVideo src={product.video.src} poster={product.video.poster} label={`${product.name} demo reel`} />
                  <figcaption className="mt-4 text-center text-sm text-ink-soft">{product.video.caption}</figcaption>
                </figure>
              ) : product.demo ? (
                <TerminalDemo lines={product.demo} title="Claude Code" />
              ) : null}
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

            <h2 className="mt-12 font-display text-2xl font-semibold">You&apos;ll need</h2>
            <ul className="mt-3 space-y-2 text-ink-soft">
              {product.requirements.map((r) => <li key={r}>• {r}</li>)}
            </ul>

            <h2 className="mt-12 font-display text-2xl font-semibold">Installing after you buy</h2>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-term p-5 font-mono text-[13.5px] leading-7 text-[#dbe6f3]">
              {product.install.join("\n")}
            </pre>
          </div>

          {/* Purchase panel follows you on desktop */}
          <aside className="hidden h-fit rounded-2xl border border-line bg-white p-7 lg:sticky lg:top-24 lg:block">
            <p className="font-display text-5xl font-semibold">${product.priceUsd}</p>
            <p className="mt-1 text-ink-soft">One-time payment.</p>
            <div className="mt-6">
              <BuyButton product={product} size="lg" full />
            </div>
            <TrustLine className="mt-4" />
            <h2 className="mt-7 font-semibold">Included</h2>
            <ul className="mt-2 space-y-1.5 text-[15px] text-ink-soft">
              {product.includes.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </aside>
        </div>
      </div>

      {/* Mobile buy bar: the button is always one tap away */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-5 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-display text-2xl font-semibold leading-none">${product.priceUsd}</p>
            <p className="text-xs text-ink-soft">One-time payment</p>
          </div>
          <BuyButton product={product} />
        </div>
      </div>
    </>
  );
}
