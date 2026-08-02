import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "tm_admin_session";

function getAdminPassword(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error(
      "ADMIN_PASSWORD is not set. Add it to your .env.local before using /admin."
    );
  }
  return secret;
}

function sessionToken(): string {
  return createHash("sha256").update(getAdminPassword()).digest("hex");
}

export function checkPassword(candidate: string): boolean {
  const expected = Buffer.from(getAdminPassword());
  const given = Buffer.from(candidate);
  if (expected.length !== given.length) return false;
  return timingSafeEqual(expected, given);
}

export function getSessionToken(): string {
  return sessionToken();
}

export function isAdminRequest(req: NextRequest): boolean {
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!cookie) return false;
  try {
    return cookie === sessionToken();
  } catch {
    return false;
  }
}

export function requireAdmin(req: NextRequest): NextResponse | null {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

/** For use in server components/pages (reads the cookie jar, not a request). */
export async function isAdminSession(): Promise<boolean> {
  const jar = await cookies();
  const cookie = jar.get(ADMIN_COOKIE)?.value;
  if (!cookie) return false;
  try {
    return cookie === sessionToken();
  } catch {
    return false;
  }
}
