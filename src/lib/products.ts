// Product catalog. Each product maps to a product you create in the Polar dashboard.
//
// 1. Create the product in Polar (Products → New), one-time price in USD.
// 2. Attach a Benefit for delivery:
//      - "File Downloads"           → buyer downloads the .skill file (used for single skills)
//      - "GitHub Repository Access" → buyer is invited to the private plugin marketplace repo
//      - "License Keys"             → buyer gets a key a paid MCP server can validate
// 3. Copy the Polar product ID into `polarProductId` below.
//
// The Buy button uses the provider set in `site.checkout`. A product without a link
// for that provider shows "Coming soon".
// Every claim here must be true of the shipped product. No invented numbers, reviews or urgency.

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
  type: "Skill" | "Plugin" | "Skill pack" | "MCP server";
  features: string[];
  includes: string[];
  requirements: string[];
  forWho: string[];
  notFor: string[];
  install: string[];
  /** Real output made with the product. Preferred over a terminal demo. */
  video?: { src: string; poster: string; caption: string };
  demo?: DemoLine[];
  polarProductId: string;
  /** Gumroad product link (https://<you>.gumroad.com/l/<slug>). Used when site.checkout is "gumroad". */
  gumroadUrl?: string;
};

export const products: Product[] = [
  {
    slug: "smooth-intro-reel",
    name: "Smooth Intro Reel",
    short: "Tell Claude who you are. Get a smooth 9:16 motion-graphics intro reel, rendered from code.",
    description:
      "A Claude skill that builds a 10.6-second “who am I” reel for Instagram, TikTok or Shorts in your own brand: your colours, font, name, roles, handle and silhouette. It ships a complete Remotion project with the motion already tuned, so Claude only has to change your identity and story, not reinvent the animation. The reel on this page was made with it.",
    priceUsd: 4,
    type: "Skill",
    features: [
      "Kinetic typing, a breathing, floating silhouette that reacts to the story, a camera dive into an eye, rolling role words and an end card with your handle",
      "Your identity, not a template look: colours, any Google Font, name, up to 6 roles, handle and services line",
      "Turns your photo or silhouette into a head-and-body character rig",
      "Sound included: a sound-effect kit synced to the picture and an original music bed composed in code, mixed to -14 LUFS",
      "1080×1920 at 60 fps, with an Instagram-safe final encode",
      "A smoothness check (contact sheet and jerk numbers), plus the fixes for the feedback reels usually get",
    ],
    includes: [
      "The skill (SKILL.md and 3 reference guides)",
      "Complete Remotion project template",
      "Character, QA and final-render scripts",
      "Sound-effect kit and music composer",
      "Free updates",
    ],
    requirements: [
      "Claude Code (terminal or desktop app)",
      "Node.js 18 or newer",
      "Python 3 with numpy, scipy and opencv-python",
      "For a photo instead of a silhouette: rembg and onnxruntime",
    ],
    forWho: [
      "Freelancers and creators who want a polished intro for their profile",
      "Editors and motion designers who want a fast, repeatable intro for clients",
      "Developers who would rather tune code than keyframes",
    ],
    notFor: [
      "People who want to edit in After Effects or Premiere. The output is a Remotion (React) project",
      "Long videos. It makes one short intro, which you can extend with Claude's help",
    ],
    install: [
      "# Unzip the downloaded file into your personal skills folder",
      "unzip smooth-intro-reel.skill -d ~/.claude/skills/            # macOS / Linux",
      "tar -xf smooth-intro-reel.skill -C $HOME\\.claude\\skills       # Windows PowerShell",
      "",
      "# Then, in Claude Code:",
      "Make me an intro reel. My brand colours are …",
    ],
    video: {
      src: "/demo/intro-reel.mp4",
      poster: "/demo/intro-reel-poster.jpg",
      caption: "My own intro reel, made with this skill. Sound on.",
    },
    // Polar SANDBOX product. Replace with the production product ID at go-live.
    polarProductId: "8f980c27-978a-4dab-8e7a-7b4ba3402e26",
    gumroadUrl: "https://alykhalid.gumroad.com/l/smooth-intro-reel",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
