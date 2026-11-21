// Product catalog. Each product maps to a product you create in the Polar dashboard.
//
// 1. Create the product in Polar (Products → New), price it in USD.
// 2. Attach a Benefit for delivery:
//      - "GitHub Repository Access" → buyer is invited to your private marketplace repo
//      - "License Keys"             → buyer gets a key your MCP server can validate
// 3. Copy the Polar product ID into `polarProductId` below.
//
// Products with an empty `polarProductId` show as "Coming soon".
// All copy below is placeholder — replace it with your real products.

export type DemoLine =
  | { kind: "cmd"; text: string } // what the user types
  | { kind: "step"; text: string } // what the skill is doing
  | { kind: "out"; text: string }; // the result

export type Product = {
  slug: string;
  name: string;
  short: string; // one line: the outcome
  description: string;
  priceUsd: number;
  compareAtUsd?: number; // shown struck-through (bundles only — never invent fake "was" prices)
  type: "Plugin" | "Skill pack" | "MCP server" | "Bundle";
  saves: string; // the concrete thing it saves the buyer
  features: string[];
  includes: string[];
  forWho: string[];
  notFor: string[];
  install: string[];
  demo: DemoLine[];
  polarProductId: string;
};

export const products: Product[] = [
  {
    slug: "freelance-proposal-agent",
    name: "Freelance Proposal Agent",
    short: "Paste a job post. Get a proposal that sounds like you and wins replies.",
    description:
      "A Claude Code plugin that reads a job description, picks the projects from your portfolio that match it, and writes a short, specific proposal in English or Arabic. It comes from an agent that answers real freelance offers every day.",
    priceUsd: 19,
    type: "Plugin",
    saves: "20–30 minutes per proposal",
    features: [
      "Writes proposals for Upwork, Mostaql and Telegram job posts",
      "Matches each job to your three most relevant projects",
      "English or Arabic, with a formal or friendly tone",
      "One command: /proposal",
    ],
    includes: ["2 skills", "/proposal command", "Portfolio template", "Setup guide", "All future updates"],
    forWho: [
      "Freelancers who send 5+ proposals a week",
      "Developers who know their work is good but hate selling it",
      "Anyone bidding on Arabic and English platforms",
    ],
    notFor: ["Agencies sending hundreds of automated bids a day"],
    install: [
      "/plugin marketplace add your-username/agentkit-private",
      "/plugin install freelance-proposal-agent@agentkit",
    ],
    demo: [
      { kind: "cmd", text: "/proposal" },
      { kind: "out", text: "Paste the job post:" },
      { kind: "cmd", text: "Need a Node.js dev for a booking API. Postgres, auth, 2 weeks." },
      { kind: "step", text: "Reading job requirements" },
      { kind: "step", text: "Matched 3 portfolio projects: E-commerce API, Tadreebak, Social App" },
      { kind: "step", text: "Writing in your voice" },
      { kind: "out", text: "Hi Sarah — I built a booking-style API with Postgres and JWT auth last month, so your scope is familiar." },
      { kind: "out", text: "Plan: schema and auth by day 4, endpoints by day 9, tests and docs by day 12. Should I start with the data model?" },
    ],
    polarProductId: "",
  },
  {
    slug: "backend-review-pack",
    name: "Backend Review Pack",
    short: "Senior-level code review for Node and NestJS APIs, before your client sees it.",
    description:
      "Four skills that make Claude review backend code the way a senior engineer does: slow queries, missing indexes, auth gaps, unsafe input and fragile error handling. Every finding comes with the fix.",
    priceUsd: 15,
    type: "Skill pack",
    saves: "a round of review comments",
    features: [
      "API security review: auth, validation, rate limits",
      "Database review: indexes, N+1 queries, transactions",
      "NestJS and Express structure conventions",
      "Each issue comes with a patch, not just a warning",
    ],
    includes: ["4 skills", "Review checklist", "All future updates"],
    forWho: ["Solo backend developers without a reviewer", "Juniors who want senior feedback before a PR"],
    notFor: ["Frontend-only projects"],
    install: [
      "/plugin marketplace add your-username/agentkit-private",
      "/plugin install backend-review-pack@agentkit",
    ],
    demo: [
      { kind: "cmd", text: "review src/orders" },
      { kind: "step", text: "Running api-security-review and db-performance-review" },
      { kind: "out", text: "High: GET /orders loads items per order in a loop (N+1)." },
      { kind: "out", text: "Fix: include items in one query — patch ready." },
      { kind: "out", text: "Medium: orders.user_id has no index; add one in a migration." },
    ],
    polarProductId: "",
  },
  {
    slug: "automation-starter-bundle",
    name: "AI Automation Starter",
    short: "Ship client automations with n8n and Claude in days, not weeks.",
    description:
      "Workflow skills, n8n templates and a hosted MCP server for the three automations clients ask for most: content repurposing, lead research and inbox triage.",
    priceUsd: 39,
    type: "MCP server",
    saves: "the first week of every automation project",
    features: [
      "Hosted MCP server, unlocked with your license key",
      "Skills for repurposing, lead research and triage",
      "Ready-to-import n8n workflows",
      "Client hand-off document template",
    ],
    includes: ["MCP server access", "3 skills", "n8n templates", "All future updates"],
    forWho: ["Freelancers selling automation to small businesses"],
    notFor: ["People who have never opened n8n"],
    install: [
      "/plugin marketplace add your-username/agentkit-private",
      "/plugin install automation-starter@agentkit",
      "Set AGENTKIT_LICENSE_KEY in your environment",
    ],
    demo: [
      { kind: "cmd", text: "repurpose https://youtu.be/... into a LinkedIn post and 3 tweets" },
      { kind: "step", text: "Fetching transcript through the MCP server" },
      { kind: "out", text: "LinkedIn post (182 words) and 3 tweets saved to /drafts" },
    ],
    polarProductId: "",
  },
];

// The bundle is a separate Polar product. Its compare-at price is the real sum of the parts.
export const bundle: Product = {
  slug: "complete-bundle",
  name: "The complete kit",
  short: "All three products, one payment, every future update.",
  description:
    "Every plugin, skill pack and the MCP server in the store, plus anything added to these three products later.",
  priceUsd: 49,
  compareAtUsd: products.reduce((sum, p) => sum + p.priceUsd, 0),
  type: "Bundle",
  saves: "",
  features: products.map((p) => p.name),
  includes: ["Everything in the store", "All future updates"],
  forWho: [],
  notFor: [],
  install: [],
  demo: [],
  polarProductId: "",
};

export function getProduct(slug: string) {
  return [...products, bundle].find((p) => p.slug === slug);
}
