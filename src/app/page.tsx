import { products } from "@/lib/products";
import { site } from "@/lib/site";
import { ProductCard } from "@/components/ProductCard";

const steps = [
  { title: "Buy once", text: "Secure checkout in USD. Cards, Apple Pay and Google Pay accepted." },
  { title: "Get instant access", text: "You're invited to the private plugin repo, or receive a license key, by email." },
  { title: "Install in Claude Code", text: "Add the marketplace and install with two commands. Updates arrive with /plugin update." },
];

const faqs = [
  {
    q: "What do I need to use these?",
    a: "Claude Code (or a Claude plan that supports plugins and skills). Each product page lists its exact requirements.",
  },
  {
    q: "How do I receive my purchase?",
    a: "Right after payment you get an email with either an invite to the private GitHub repository or a license key, depending on the product.",
  },
  {
    q: "Do I get updates?",
    a: "Yes. All updates to a product you bought are free — run /plugin update in Claude Code.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes, within 14 days if the product doesn't work as described. See the refund policy.",
  },
  {
    q: "Do you build custom plugins?",
    a: `Yes — email ${site.contactEmail} with what your team needs.`,
  },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-20">
        <p className="mb-4 font-mono text-sm text-accent">/plugin install</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {site.tagline}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{site.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#products" className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-black hover:brightness-110">
            Browse products
          </a>
          <a href="#how" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-surface">
            How it works
          </a>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-20">
        <h2 className="mb-6 text-2xl font-semibold">Products</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section id="how" className="scroll-mt-20 border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-8 text-2xl font-semibold">How it works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title}>
                <span className="font-mono text-sm text-accent">0{i + 1}</span>
                <h3 className="mt-2 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-6 py-20">
        <h2 className="mb-6 text-2xl font-semibold">FAQ</h2>
        <div className="divide-y divide-border rounded-2xl border border-border">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none font-medium marker:hidden">
                <span className="mr-2 text-accent group-open:hidden">+</span>
                <span className="mr-2 hidden text-accent group-open:inline">−</span>
                {f.q}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
