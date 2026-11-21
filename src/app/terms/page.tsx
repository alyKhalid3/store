import { site } from "@/lib/site";

export const metadata = { title: "Terms" };

export default function Terms() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 leading-relaxed">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-sm text-ink-soft">Template — review and adapt before launch.</p>

      <h2 className="mt-8 font-display text-xl font-semibold">1. Who we are</h2>
      <p className="mt-2 text-ink-soft">
        {site.name} is operated by {site.author}. Orders are processed by Polar Software Inc., which acts as
        the merchant of record and handles payment, invoicing and sales tax.
      </p>

      <h2 className="mt-8 font-display text-xl font-semibold">2. License</h2>
      <p className="mt-2 text-ink-soft">
        Each purchase grants one person (or one team, where stated) a non-exclusive, non-transferable license to
        use the product for personal and commercial work. You may not resell, redistribute or publicly share the
        product files, repository access or license keys.
      </p>

      <h2 className="mt-8 font-display text-xl font-semibold">3. Delivery and updates</h2>
      <p className="mt-2 text-ink-soft">
        Products are delivered digitally via private repository access or license key. Updates to purchased
        products are included at no extra cost for as long as the product is maintained.
      </p>

      <h2 className="mt-8 font-display text-xl font-semibold">4. No warranty</h2>
      <p className="mt-2 text-ink-soft">
        Products are provided &quot;as is&quot;. AI output can be wrong; you are responsible for reviewing anything
        the tools produce before using it.
      </p>

      <h2 className="mt-8 font-display text-xl font-semibold">5. Contact</h2>
      <p className="mt-2 text-ink-soft">{site.contactEmail}</p>
    </article>
  );
}
