import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Use in API Route handlers (GET/POST/PATCH/DELETE functions).
 * Returns a 401 NextResponse if the caller is not an authenticated admin,
 * or null if the request is authorized.
 *
 * Usage:
 *   const authError = await requireAdminAuth();
 *   if (authError) return authError;
 */
export async function requireAdminAuth(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has("admin_auth");
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

/**
 * Use inside Server Actions ("use server" files).
 * Throws an error if the caller is not an authenticated admin.
 *
 * Usage:
 *   await assertAdmin();
 */
export async function assertAdmin(): Promise<void> {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has("admin_auth");
  if (!isAuthenticated) {
    throw new Error("Unauthorized: admin access required.");
  }
}
