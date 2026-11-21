import Link from "next/link";
import { bundle, products } from "@/lib/products";
import { site } from "@/lib/site";
import { TerminalDemo } from "@/components/TerminalDemo";
import { BuyButton, TrustLine } from "@/components/BuyButton";

const [featured, ...rest] = products;

const faqs = [
  {
    q: "What do I need to use these?",
    a: "Claude Code, or a Claude plan that supports plugins and skills. Each product page lists anything extra, such as n8n for the automation kit.",
  },
  {
    q: "How is this different from writing a prompt myself?",
    a: "A skill is a tested workflow: instructions, templates, examples and checks that Claude loads only when they're needed. You'd spend days writing and testing the same thing, and you'd still be missing the edge cases these were refined on.",
  },
  {
    q: "How do I get my purchase?",
    a: "Right after payment you get an email with an invite to the private GitHub repository, or a license key for the MCP server. Installing takes two commands.",
  },
  {
    q: "Do updates cost extra?",
    a: "No. Updates to anything you bought are free for as long as the product is maintained. Run /plugin update in Claude Code.",
  },
  {
    q: "What if it doesn't work for me?",
    a: "Email within 14 days. I'll help you set it up, and if it still doesn't do what the page says, you get a full refund.",
  },
  {
    q: "Can you build a custom skill for my team?",
    a: `Yes. Email ${site.contactEmail} with what you need.`,
  },
];

export default function Home() {
  const saving = (bundle.compareAtUsd ?? 0) - bundle.priceUsd;

  return (
    <>
      {/* Hero: the product working is the pitch */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1fr_1.05fr] lg:pt-24">
          <div>
            <h1 className="font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[64px]">
              Stop prompting.
              <br />
              Install the workflow.
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-soft">{site.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#products"
                className="rounded-lg bg-ink px-6 py-3.5 font-semibold text-white shadow-[inset_0_-3px_0_var(--amber)] hover:bg-[#163a63]"
              >
                See the plugins
              </Link>
              <span className="text-ink-soft">
                From <strong className="text-ink">${Math.min(...products.map((p) => p.priceUsd))}</strong>, one-time
              </span>
            </div>
            <ul className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6 text-sm">
              <li>
                <p className="font-display text-xl font-semibold">2 min</p>
                <p className="text-ink-soft">to install</p>
              </li>
              <li>
                <p className="font-display text-xl font-semibold">Free</p>
                <p className="text-ink-soft">lifetime updates</p>
              </li>
              <li>
                <p className="font-display text-xl font-semibold">14 days</p>
                <p className="text-ink-soft">refund window</p>
              </li>
            </ul>
          </div>
          <div className="lg:-mr-6">
            <TerminalDemo lines={featured.demo} title="Claude Code" />
            <p className="mt-3 text-center text-sm text-ink-soft">
              Example session with the {featured.name}. It saves about {featured.saves}.
            </p>
          </div>
        </div>
      </section>

      {/* Featured product, sold properly */}
      <section id="products" className="scroll-mt-16">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 rounded-2xl border border-line bg-white p-8 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-sm font-medium text-amber-deep">Most popular</p>
              <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">{featured.name}</h2>
              <p className="mt-4 max-w-xl text-lg text-ink-soft">{featured.short}</p>
              <ul className="mt-7 space-y-3">
                {featured.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-between rounded-xl bg-paper p-7">
              <div>
                <p className="font-display text-5xl font-semibold">${featured.priceUsd}</p>
                <p className="mt-1 text-ink-soft">Pay once. Saves {featured.saves}.</p>
                <ul className="mt-6 space-y-1.5 text-[15px] text-ink-soft">
                  {featured.includes.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
              <div className="mt-8 space-y-3">
                <BuyButton product={featured} size="lg" full />
                <Link href={`/products/${featured.slug}`} className="block text-center text-sm font-medium underline-offset-4 hover:underline">
                  See how it works
                </Link>
              </div>
            </div>
          </div>

          {/* The rest: a list, not a wall of identical cards */}
          <div className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white">
            {rest.map((p) => (
              <div key={p.slug} className="grid items-center gap-4 p-7 sm:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
                    <span className="text-sm text-ink-soft">{p.type}</span>
                  </div>
                  <p className="mt-1.5 max-w-2xl text-ink-soft">{p.short}</p>
                </div>
                <div className="flex items-center gap-5">
                  <Link href={`/products/${p.slug}`} className="text-sm font-medium underline-offset-4 hover:underline">
                    Details
                  </Link>
                  <span className="font-display text-2xl font-semibold">${p.priceUsd}</span>
                  <BuyButton product={p} label="Buy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle: the real saving is the argument */}
      <section id="bundle" className="scroll-mt-16 bg-ink text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Get everything for ${bundle.priceUsd}.
            </h2>
            <p className="mt-4 max-w-lg text-lg text-[#b9c8da]">
              All {products.length} products for less than the price of two. Anything added to them later is yours too.
            </p>
            <ul className="mt-7 space-y-2.5">
              {products.map((p) => (
                <li key={p.slug} className="flex justify-between gap-6 border-b border-white/10 pb-2.5 text-[#dbe6f3]">
                  <span>{p.name}</span>
                  <span className="tabular-nums text-[#8ea6c4]">${p.priceUsd}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-8 text-ink">
            <p className="text-ink-soft">
              <s>${bundle.compareAtUsd}</s>
            </p>
            <p className="font-display text-6xl font-semibold">${bundle.priceUsd}</p>
            <p className="mt-2 font-medium text-amber-deep">You save ${saving}</p>
            <div className="mt-7">
              <BuyButton product={bundle} size="lg" full label={`Get the complete kit`} />
            </div>
            <TrustLine className="mt-4" />
          </div>
        </div>
      </section>

      {/* How it works: a real sequence, so it's numbered */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Working in under two minutes</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              ["Pay once", "Checkout takes about 30 seconds. No account to create, no subscription."],
              ["Open your email", "You get an invite to the private repository, or your license key, right away."],
              ["Install and use it", "Two commands in Claude Code. Updates come with /plugin update."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/20 font-display font-semibold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{t}</h3>
                  <p className="mt-1 text-ink-soft">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The maker: credibility without fake testimonials */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[auto_1fr]">
          <div className="grid h-24 w-24 place-items-center rounded-2xl bg-ink font-display text-3xl font-semibold text-amber">
            {site.author
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </div>
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight">Built by someone who uses them every day</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              I&apos;m {site.author}, a {site.role}. Every product here started as a tool I built for my own
              client work, like the agent that answers freelance offers for me daily. I sell the versions that held up in
              real use.
            </p>
            <div className="mt-6 flex gap-5 text-sm font-medium">
              <a href={site.links.linkedin} className="underline-offset-4 hover:underline">LinkedIn</a>
              <a href={site.links.github} className="underline-offset-4 hover:underline">GitHub</a>
            </div>
            {/* When you have real customer quotes, add them here. Never invent reviews. */}
          </div>
        </div>
      </section>

      {/* Guarantee: removes the last objection */}
      <section className="mx-auto max-w-6xl px-6 pt-20">
        <div className="flex flex-col gap-6 rounded-2xl border-2 border-dashed border-amber/70 p-8 sm:flex-row sm:items-center">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--amber-deep)" strokeWidth="1.8" aria-hidden className="shrink-0">
            <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <div>
            <h2 className="font-display text-2xl font-semibold">14-day “it works or it&apos;s free” guarantee</h2>
            <p className="mt-1 text-ink-soft">
              If a product doesn&apos;t do what its page says, email me. I&apos;ll fix your setup, or refund you in full.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ: answers the reasons people don't buy */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-16 px-6 py-20">
        <h2 className="font-display text-3xl font-semibold tracking-tight">Questions before you buy</h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-2xl leading-none text-ink-soft transition-transform group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[62ch] text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="#products"
            className="inline-block rounded-lg bg-ink px-7 py-4 font-semibold text-white shadow-[inset_0_-3px_0_var(--amber)] hover:bg-[#163a63]"
          >
            Choose a plugin
          </Link>
        </div>
      </section>
    </>
  );
}

function Check() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden className="mt-0.5 shrink-0">
      <circle cx="11" cy="11" r="10" fill="var(--paper)" stroke="var(--line)" />
      <path d="M6.5 11.2l3 3 6-6" fill="none" stroke="var(--amber-deep)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
