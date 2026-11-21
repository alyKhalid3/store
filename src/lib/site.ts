// Global store settings. Change the brand name, tagline, contact and checkout provider here.

export type CheckoutProvider = "polar" | "gumroad";

export const site = {
  name: "aly.build",
  tagline: "Claude skills built from real work",
  description:
    "Claude skills that turn Claude Code into a specialist. Each one started as a tool I built for my own work. Pay once, keep every update.",
  author: "Ali Elzeary",
  role: "backend and AI automation engineer",
  contactEmail: "you@example.com", // TODO: your support email (Polar requires a reachable contact)
  // Which checkout the Buy buttons use.
  //  "gumroad": temporary, while the Polar production account is under review. Needs `gumroadUrl` on each product.
  //  "polar":   the main setup. Needs `polarProductId` on each product (and production env vars when live).
  checkout: "gumroad" as CheckoutProvider,
  links: {
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/aly-khalid",
  },
};

// Wording that depends on the checkout provider.
const providers = {
  polar: {
    name: "Polar",
    footer: "Payments are handled by Polar, our merchant of record.",
    trust: "One-time payment, secure checkout by Polar. Cards, Apple Pay and Google Pay.",
    library: "your Polar customer portal",
    company: "Polar Software Inc., which acts as the merchant of record and handles payment, invoicing and sales tax",
  },
  gumroad: {
    name: "Gumroad",
    footer: "Payments and downloads are handled by Gumroad.",
    trust: "One-time payment, secure checkout by Gumroad.",
    library: "your Gumroad library",
    company: "Gumroad, Inc., which handles payment, receipts and delivery of the download",
  },
} satisfies Record<CheckoutProvider, Record<string, string>>;

export const payments = providers[site.checkout];
