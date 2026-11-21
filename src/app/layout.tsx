import type { Metadata } from "next";
import Link from "next/link";
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource-variable/hanken-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: `${site.name}: ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
};

function Mark() {
  // A skill file folded like a tool tag
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden>
      <rect x="1" y="1" width="24" height="24" rx="6" fill="var(--ink)" />
      <path d="M8 9h10M8 13h7M8 17h4" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
            <Link href="/" className="flex items-center gap-2.5 whitespace-nowrap font-display text-lg font-semibold tracking-tight">
              <Mark />
              {site.name}
            </Link>
            <div className="flex items-center gap-6 whitespace-nowrap text-[15px] text-ink-soft">
              <Link href="/#products" className="hover:text-ink">Products</Link>
              <Link href="/#faq" className="hidden hover:text-ink sm:inline">Questions</Link>
              <Link
                href="/#bundle"
                className="rounded-lg border border-ink/15 bg-white px-3.5 py-1.5 font-medium text-ink hover:border-ink/40"
              >
                Get the kit
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-line bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-semibold">
                <Mark />
                {site.name}
              </Link>
              <p className="mt-3 max-w-sm text-sm text-ink-soft">
                Payments are handled by Polar, our merchant of record. Independent store, not affiliated with Anthropic.
              </p>
            </div>
            <div className="text-sm">
              <p className="font-semibold">Store</p>
              <ul className="mt-3 space-y-2 text-ink-soft">
                <li><Link href="/#products" className="hover:text-ink">Products</Link></li>
                <li><Link href="/#bundle" className="hover:text-ink">Complete kit</Link></li>
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
