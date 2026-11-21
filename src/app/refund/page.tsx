import { site } from "@/lib/site";

export const metadata = { title: "Refund policy" };

export default function Refund() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 leading-relaxed">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Refund policy</h1>
      <p className="mt-2 text-sm text-ink-soft">Template — review and adapt before launch.</p>
      <p className="mt-6 text-ink-soft">
        If a product doesn&apos;t work as described, email {site.contactEmail} within 14 days of purchase with your
        order reference and a short description of the problem. We&apos;ll try to fix it first; if we can&apos;t, you get a
        full refund.
      </p>
      <p className="mt-4 text-ink-soft">
        Refunds are issued through Polar to your original payment method. After a refund, repository access and
        license keys for that order are revoked.
      </p>
    </article>
  );
}
