# Project brief: AgentKit store

## Goal
Ali (freelance backend and AI-automation engineer, based in Egypt) sells **Claude skills, plugins and MCP servers** for USD through his own website. Products are delivered as a private Claude Code plugin marketplace (GitHub repo), plus license keys for paid MCP servers.

## Decisions already made
- **Payments: Polar.sh** as merchant of record. It has the lowest fees of the options that pay out to Egypt. Per Polar's fee docs checked 2026-11-21, the Starter plan is 5% + 50¢ per sale, +1.5% for non-US cards (earlier notes said 4% + 40¢), plus Stripe payout fees of about $2/month + 0.25% + $0.25 + up to 1% FX. It pays out through Stripe Connect Express to Ali's **Egyptian EGP bank account** (he has his IBAN and SWIFT). Stripe rejects Payoneer and Wise. Fallback if Stripe onboarding fails: Gumroad (pays Egyptian banks in EGP, but costs about 10% + 50¢ plus card fees).
- Ruled out: Lemon Squeezy (shutting down Mar 2027, no new sign-ups), Dodo (Egypt only grandfathered), PayPal (Egypt only receives to a Visa card; withdrawal fee 125 EGP).
- **Delivery:** Polar Benefits. Single skills use "File Downloads" (the `.skill` zip). Plugins later use "GitHub Repository Access" (invite to the private marketplace repo); paid MCP servers use "License Keys" (validated by `/api/license/validate`).
- **Catalog (2026-11-21):** one real product, **Smooth Intro Reel** skill, $4 one-time, delivered as `smooth-intro-reel.skill` (source: `D:\Portoflio\Motion graphics\`). Placeholder plugins and the bundle were removed until real ones exist. Demo video is Ali's own reel in `public/demo/`.
- **Domain:** a free `.me` from Namecheap through the GitHub Student Developer Pack. Suggested: `alielzeary.me`. Not registered yet.
- **Hosting:** Vercel (free).
- **Legal/tax in Egypt:** Ali should register with the ETA as a freelancer (simplified regime) and ask an accountant about VAT. Keep payout records.

## Current state (all working)
- Next.js 16 (App Router, Cache Components on) + TypeScript + Tailwind v4. Fonts come from @fontsource (Bricolage Grotesque, Hanken Grotesk, JetBrains Mono), imported in `layout.tsx`, **not** in CSS. Importing them in CSS breaks the Tailwind turbopack loader.
- The checkout flow was tested end-to-end in **Polar sandbox** and works.
- The site was redesigned to be more premium and conversion-focused. Look: "blueprint & workshop", with paper `#f3f5f7`, ink navy `#0f2a4a` and amber `#f2a93b`. The hero shows a terminal replaying a skill session.
  - Conversion features: featured product, a maker section (the bundle and the 14-day guarantee were removed on 2026-11-21), objection FAQ, sticky buy panel on desktop and buy bar on mobile.
  - **No fake reviews or fake urgency.** That's a hard rule.

- **Checkout switch (2026-11-21):** `site.checkout` in `site.ts` is `"gumroad"` as a temporary bridge while the Polar production review runs (up to 14 days). Each product has `gumroadUrl` (TODO: paste the link) and `polarProductId`. To move to Polar: set `checkout: "polar"`, then put the production product ID in `polarProductId`. Footer, trust line, FAQ and terms wording follow the switch.

## Key files
| File | Purpose |
|---|---|
| `src/lib/site.ts` | Brand name (**aly.build**, matches the handle on Ali's reel; logo is a wordmark with an amber dot, favicon `src/app/icon.svg`), contact email (TODO), links |
| `src/lib/products.ts` | Catalog. `polarProductId: ""` shows "Coming soon". Each product has a real demo `video` (preferred) or terminal `demo` lines |
| `src/components/ReelVideo.tsx` | 9:16 demo video in a phone frame, muted loop with a sound toggle |
| `src/app/checkout/route.ts` | `GET /checkout?products=<id>` → Polar hosted checkout (`@polar-sh/nextjs`) |
| `src/app/api/webhook/polar/route.ts` | `order.paid` / `order.refunded`; optional Telegram sale notification |
| `src/app/api/license/validate/route.ts` | POST `{key}` → `{valid}` via Polar `customer-portal/license-keys/validate` |
| `src/components/TerminalDemo.tsx` | Animated demo replay (respects reduced motion) |
| `.env.example` | `POLAR_ENV`, `POLAR_ACCESS_TOKEN`, `POLAR_WEBHOOK_SECRET`, `POLAR_ORGANIZATION_ID`, `SITE_URL`, `TELEGRAM_*` |

## Next steps
1. Smooth Intro Reel exists in Polar **sandbox** (org `alyskill`, product `8f980c27-978a-4dab-8e7a-7b4ba3402e26`, $4, File Downloads benefit). Do a sandbox test purchase to confirm the download arrives. Recreate it in production at go-live and swap the ID.
2. Later, when there are plugins: create the **private marketplace repo** (`.claude-plugin/marketplace.json` + `plugins/<name>/...`), validate with `claude plugin validate`, and bring back a list section / bundle on the home page.
3. Fill in `site.ts`: support email, GitHub link.
4. Deploy to Vercel, set the env vars, and add the Polar webhook (`/api/webhook/polar`, Raw format, events `order.paid` + `order.refunded`).
5. Register the domain and point it at Vercel.
6. Go live: production Polar account, Stripe payout verification, recreate the products, switch to production tokens, then make one real low-price test purchase.

## Working preferences
- Be honest about weak work and show the fix. Keep answers focused and practical.
- If unsure about a fact (fees, availability in Egypt, etc.), say so and verify. Don't guess.
