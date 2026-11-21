// Product catalog. Each product maps to a product you create in the Polar dashboard.
//
// 1. Create the product in Polar (Products → New), price it in USD.
// 2. Attach a Benefit for delivery:
//      - "GitHub Repository Access" → buyer is invited to your private marketplace repo
//      - "License Keys"             → buyer gets a key your MCP server can validate
// 3. Copy the Polar product ID into `polarProductId` below.
//
// Products with an empty `polarProductId` show as "Coming soon".

export type Product = {
  slug: string;
  name: string;
  short: string;
  description: string;
  priceUsd: number;
  type: "Plugin" | "Skill" | "Skill pack" | "MCP server";
  features: string[];
  includes: string[];
  install: string[];
  polarProductId: string;
  badge?: string;
};

export const products: Product[] = [
  {
    slug: "freelance-proposal-agent",
    name: "Freelance Proposal Agent",
    short: "Turns a job post into a tailored, ready-to-send proposal in seconds.",
    description:
      "A Claude Code plugin that reads a job description, matches it against your portfolio, and drafts a focused proposal in English or Arabic. Built from a real agent that monitors freelance channels in production.",
    priceUsd: 19,
    type: "Plugin",
    badge: "Best seller",
    features: [
      "Proposal skill tuned for Upwork, Mostaql & Telegram offers",
      "Portfolio matcher — pulls your most relevant projects",
      "English + Arabic output with tone presets",
      "/proposal slash command",
    ],
    includes: ["2 skills", "1 slash command", "Setup guide", "Free updates"],
    install: [
      "/plugin marketplace add your-username/agentkit-private",
      "/plugin install freelance-proposal-agent@agentkit",
    ],
    polarProductId: "",
  },
  {
    slug: "backend-review-pack",
    name: "Backend Review Pack",
    short: "Senior-level reviews for Node/NestJS APIs: security, performance, data model.",
    description:
      "A skill pack that makes Claude review backend code the way a senior engineer would — N+1 queries, missing indexes, auth gaps, unsafe input handling and error-handling smells, with concrete fixes.",
    priceUsd: 15,
    type: "Skill pack",
    features: [
      "API security checklist (auth, validation, rate limits)",
      "Database performance review (indexes, N+1, transactions)",
      "NestJS / Express structure conventions",
      "Actionable fix suggestions, not just warnings",
    ],
    includes: ["4 skills", "Review checklist", "Free updates"],
    install: [
      "/plugin marketplace add your-username/agentkit-private",
      "/plugin install backend-review-pack@agentkit",
    ],
    polarProductId: "",
  },
  {
    slug: "automation-starter-bundle",
    name: "AI Automation Starter Bundle",
    short: "Everything to ship n8n + Claude automations for clients, fast.",
    description:
      "Skills, prompt templates and an MCP server for building client automations: content repurposing, lead research and inbox triage. Includes a license key for the hosted MCP server.",
    priceUsd: 39,
    type: "MCP server",
    badge: "Bundle",
    features: [
      "Hosted MCP server (license-key protected)",
      "3 workflow skills: repurposing, lead research, triage",
      "n8n workflow templates",
      "Client hand-off docs template",
    ],
    includes: ["MCP server access", "3 skills", "n8n templates", "Free updates"],
    install: [
      "/plugin marketplace add your-username/agentkit-private",
      "/plugin install automation-starter@agentkit",
      "Set AGENTKIT_LICENSE_KEY in your environment",
    ],
    polarProductId: "",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
