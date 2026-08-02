import { NextRequest, NextResponse } from "next/server";
import { insertLead, listLeads } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, phone, zip, trade_interest, availability, message, quiz_result, source } =
    body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  const lead = insertLead({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: typeof phone === "string" ? phone.trim() : undefined,
    zip: typeof zip === "string" ? zip.trim() : undefined,
    trade_interest: typeof trade_interest === "string" ? trade_interest : undefined,
    availability: typeof availability === "string" ? availability : undefined,
    message: typeof message === "string" ? message.trim() : undefined,
    quiz_result: typeof quiz_result === "string" ? quiz_result : undefined,
    source: typeof source === "string" ? source : undefined,
  });

  return NextResponse.json({ lead }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  return NextResponse.json({ leads: listLeads() });
}
