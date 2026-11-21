import { site } from "@/lib/site";

export const metadata = { title: "Refund policy" };

export default function Refund() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 leading-relaxed">
      <h1 className="text-3xl font-bold">Refund policy</h1>
      <p className="mt-2 text-sm text-muted">Template — review and adapt before launch.</p>
      <p className="mt-6 text-muted">
        If a product doesn&apos;t work as described, email {site.contactEmail} within 14 days of purchase with your
        order reference and a short description of the problem. We&apos;ll try to fix it first; if we can&apos;t, you get a
        full refund.
      </p>
      <p className="mt-4 text-muted">
        Refunds are issued through Polar to your original payment method. After a refund, repository access and
        license keys for that order are revoked.
      </p>
    </article>
  );
}
