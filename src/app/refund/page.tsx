import { site } from "@/lib/site";

export const metadata = { title: "Refund policy" };

export default function Refund() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 leading-relaxed">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Refund policy</h1>
      <p className="mt-2 text-sm text-ink-soft">Template — review and adapt before launch.</p>
      <p className="mt-6 text-ink-soft">
        Products are digital downloads, so sales are final once the file has been delivered.
      </p>
      <p className="mt-4 text-ink-soft">
        If your download is broken, missing files, or the product doesn&apos;t match its description, email{" "}
        {site.contactEmail} with your order reference. I&apos;ll fix it or send you a new file, and if I can&apos;t, I&apos;ll
        refund you to your original payment method. A refunded order loses access to its download.
      </p>
    </article>
  );
}
