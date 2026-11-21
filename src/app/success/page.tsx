import { Suspense } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = { title: "Thank you" };

async function OrderRef({ searchParams }: { searchParams: Promise<{ checkout_id?: string }> }) {
  const { checkout_id } = await searchParams;
  return checkout_id ? <p className="mt-4 font-mono text-xs text-ink-soft">Order ref: {checkout_id}</p> : null;
}

export default function Success({ searchParams }: { searchParams: Promise<{ checkout_id?: string }> }) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white border border-line text-2xl text-amber-deep">✓</div>
      <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight">Payment received — thank you!</h1>
      <p className="mt-4 leading-relaxed text-ink-soft">
        Check your email in the next few minutes. You&apos;ll get either an invite to the private GitHub
        repository or your license key. You can also find everything in your Polar customer portal.
      </p>
      <Suspense fallback={null}>
        <OrderRef searchParams={searchParams} />
      </Suspense>
      <p className="mt-8 text-sm text-ink-soft">
        Nothing arrived? Email <a className="underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>
      <Link href="/" className="mt-8 inline-block rounded-lg border border-line px-5 py-2.5 text-sm font-semibold hover:bg-white">
        Back to store
      </Link>
    </div>
  );
}
