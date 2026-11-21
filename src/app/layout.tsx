import type { Metadata } from "next";
import Link from "next/link";
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource-variable/hanken-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { payments, site } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: `${site.name}: ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
};

function Wordmark() {
  // "aly.build" with the dot in amber. The visible text stays the real name for screen readers.
  const [first, rest] = site.name.split(".");
  return (
    <span className="font-display text-[22px] font-bold tracking-[-0.03em]">
      {first}
      <span className="sr-only">.</span>
      <span aria-hidden className="mx-[2px] inline-block h-[7px] w-[7px] rounded-full bg-amber" />
      {rest}
    </span>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
            <Link href="/" className="whitespace-nowrap" aria-label={`${site.name} home`}>
              <Wordmark />
            </Link>
            <div className="flex items-center gap-6 whitespace-nowrap text-[15px] text-ink-soft">
              <Link href="/#products" className="hover:text-ink">Products</Link>
              <Link href="/#faq" className="hidden hover:text-ink sm:inline">Questions</Link>
              <Link
                href="/products/smooth-intro-reel"
                className="rounded-lg border border-ink/15 bg-white px-3.5 py-1.5 font-medium text-ink hover:border-ink/40"
              >
                Get the skill
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-line bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <Link href="/" aria-label={`${site.name} home`}>
                <Wordmark />
              </Link>
              <p className="mt-3 max-w-sm text-sm text-ink-soft">
                {payments.footer} Independent store, not affiliated with Anthropic.
              </p>
            </div>
            <div className="text-sm">
              <p className="font-semibold">Store</p>
              <ul className="mt-3 space-y-2 text-ink-soft">
                <li><Link href="/#products" className="hover:text-ink">Products</Link></li>
                <li><Link href="/#faq" className="hover:text-ink">Questions</Link></li>
              </ul>
            </div>
            <div className="text-sm">
              <p className="font-semibold">Help</p>
              <ul className="mt-3 space-y-2 text-ink-soft">
                <li><a href={`mailto:${site.contactEmail}`} className="hover:text-ink">{site.contactEmail}</a></li>
                <li><Link href="/refund" className="hover:text-ink">Refund policy</Link></li>
                <li><Link href="/terms" className="hover:text-ink">Terms</Link></li>
              </ul>
            </div>
          </div>
          <p className="mx-auto max-w-6xl px-6 pb-8 text-xs text-ink-soft">© 2026 {site.author}</p>
        </footer>
      </body>
    </html>
  );
}
