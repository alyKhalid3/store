// Shared Polar settings. Switch POLAR_ENV to "production" when you go live.
export const polarEnv = (process.env.POLAR_ENV === "production" ? "production" : "sandbox") as
  | "production"
  | "sandbox";

export const polarApiBase =
  polarEnv === "production" ? "https://api.polar.sh" : "https://sandbox-api.polar.sh";

export const siteUrl = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
