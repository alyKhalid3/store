import { NextResponse } from "next/server";
import { polarApiBase } from "@/lib/polar";

// POST /api/license/validate   { "key": "XXXX-..." }
// Your paid MCP server calls this before serving a request.
// Returns { valid: true } only for keys issued by YOUR Polar organization.
//
// Tip: in the MCP server, cache a positive result for ~1 hour so you don't call this on every tool call.
export async function POST(req: Request) {
  const orgId = process.env.POLAR_ORGANIZATION_ID;
  if (!orgId) {
    return NextResponse.json({ valid: false, error: "Server not configured" }, { status: 500 });
  }

  let key: unknown;
  try {
    ({ key } = await req.json());
  } catch {
    return NextResponse.json({ valid: false, error: "Invalid JSON" }, { status: 400 });
  }
  if (typeof key !== "string" || key.length < 8 || key.length > 200) {
    return NextResponse.json({ valid: false, error: "Missing key" }, { status: 400 });
  }

  const res = await fetch(`${polarApiBase}/v1/customer-portal/license-keys/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, organization_id: orgId }),
    cache: "no-store",
  });

  if (!res.ok) {
    // 404 = unknown key, 422 = revoked/expired/limit reached
    return NextResponse.json({ valid: false }, { status: 200 });
  }

  const data = (await res.json()) as { status?: string; expires_at?: string | null; benefit_id?: string };
  const valid = data.status === "granted";
  return NextResponse.json({ valid, expiresAt: data.expires_at ?? null, benefitId: data.benefit_id });
}
