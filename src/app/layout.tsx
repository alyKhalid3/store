import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Link from "next/link";
import "./globals.css";
import { site } from "@/lib/site";


export const metadata: Metadata = {
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-border">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2 whitespace-nowrap font-semibold tracking-tight">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-accent text-sm font-bold text-black">
                {site.name[0]}
              </span>
              {site.name}
            </Link>
            <div className="flex items-center gap-5 whitespace-nowrap text-sm text-muted">
              <Link href="/#products" className="hover:text-foreground">Products</Link>
              <Link href="/#how" className="hidden hover:text-foreground sm:inline">How it works</Link>
              <Link href="/#faq" className="hover:text-foreground">FAQ</Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 {site.name} · by {site.author}</p>
            <div className="flex gap-5">
              <Link href="/terms" className="hover:text-foreground">Terms</Link>
              <Link href="/refund" className="hover:text-foreground">Refund policy</Link>
              <a href={`mailto:${site.contactEmail}`} className="hover:text-foreground">Contact</a>
            </div>
          </div>
          <p className="mx-auto max-w-6xl px-6 pb-8 text-xs text-muted/70">
            Payments are processed by Polar, our merchant of record. Not affiliated with Anthropic.
          </p>
        </footer>
      </body>
    </html>
  );
}
