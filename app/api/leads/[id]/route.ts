import { NextRequest, NextResponse } from "next/server";
import { updateLeadStatus, LEAD_STATUSES, LeadStatus } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Invalid lead id" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  const status = body?.status as LeadStatus | undefined;
  const school = typeof body?.school === "string" ? body.school : undefined;

  const validStatuses = LEAD_STATUSES.map((s) => s.value);
  if (!status || !validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const lead = updateLeadStatus(id, status, school);
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json({ lead });
}
