# AgentKit Store

A storefront for selling Claude skills, plugins and MCP servers. Built with Next.js, TypeScript and Tailwind, with **Polar** as the merchant of record for checkout, tax and payouts to your Egyptian bank account.

## Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

## Project map

| File | What it does |
|---|---|
| `src/lib/site.ts` | Brand name, tagline, contact email, links |
| `src/lib/products.ts` | **Your catalog.** Add products here and paste each Polar product ID |
| `src/app/checkout/route.ts` | `GET /checkout?products=<id>` sends the buyer to Polar's hosted checkout |
| `src/app/api/webhook/polar/route.ts` | Receives Polar events (verified signature). Logs sales and can ping you on Telegram |
| `src/app/api/license/validate/route.ts` | `POST {key}` returns `{valid}`. Your paid MCP server calls this |
| `src/app/success`, `terms`, `refund` | Post-purchase page and policy templates (Polar reviews these) |

## Set up Polar (test first)

1. Create an account at **sandbox.polar.sh** (the test environment; no real money).
2. **Settings → Developers → New token**, then put it in `POLAR_ACCESS_TOKEN`.
3. **Settings → General**, copy the Organization ID into `POLAR_ORGANIZATION_ID`.
4. **Products → New product**: one-time price in USD. Under **Benefits**, attach one of these:
   - **GitHub Repository Access**: buyers get invited to your private marketplace repo
   - **License Keys**: buyers get a key your MCP server can validate
5. Copy the product ID into `polarProductId` in `src/lib/products.ts`. The button changes from "Coming soon" to "Buy".
6. Pay with Polar's test card to check the whole flow.

## Webhooks

Polar can't reach `localhost`, so test webhooks after you deploy, or use a tunnel such as `ngrok http 3000`.

- Polar → **Settings → Webhooks → Add endpoint**: `https://YOUR-DOMAIN/api/webhook/polar`
- Select events `order.paid` and `order.refunded`, then copy the secret into `POLAR_WEBHOOK_SECRET`.

## Deploy (Vercel, free)

1. Push this folder to a GitHub repo, then import it on vercel.com.
2. Add every variable from `.env.example` in Vercel → Settings → Environment Variables, and set `SITE_URL` to your live URL.
3. Go live: create the products again on **polar.sh** (production), switch to production tokens and IDs, and set `POLAR_ENV=production`.

## Protect a paid MCP server with license keys

```ts
// inside your MCP server, before handling a tool call
const res = await fetch("https://YOUR-DOMAIN/api/license/validate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ key: process.env.AGENTKIT_LICENSE_KEY }),
});
const { valid } = await res.json();
if (!valid) throw new Error("Invalid or expired license key");
```

Cache a valid result for about an hour so you don't call this on every request.

## Before launch checklist

- [ ] Real brand name, contact email and links in `src/lib/site.ts`
- [ ] Real products with descriptions and Polar IDs in `src/lib/products.ts`
- [ ] Review the Terms and Refund pages
- [ ] Private GitHub marketplace repo with `.claude-plugin/marketplace.json`
- [ ] Full test purchase in sandbox, then switch to production
