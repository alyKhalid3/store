import { Checkout } from "@polar-sh/nextjs";
import { polarEnv, siteUrl } from "@/lib/polar";

// GET /checkout?products=<polar_product_id>
// Redirects the buyer to Polar's hosted checkout. Polar appends ?checkout_id=... to successUrl.
export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  successUrl: `${siteUrl}/success`,
  returnUrl: siteUrl,
  environment: polarEnv,
  theme: "dark",
});
