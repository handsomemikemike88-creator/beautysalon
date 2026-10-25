import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { getDb, one, persist } from "./db";
import { hashPassword, verifyPassword } from "./password";

export { hashPassword, verifyPassword };

export const STAFF_COOKIE = "salon_staff_session";
export const CUSTOMER_COOKIE = "salon_customer_session";

export type StaffUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff";
};

export type CustomerUser = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
};

function tokenHash(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function appSecret(): string {
  return process.env.APP_SECRET || "dev-only-change-me-32chars-minimum!!";
}

export async function createSession(
  kind: "staff" | "customer",
  userId: string,
  ttlHours = 8,
): Promise<string> {
  const db = await getDb();
  const token = randomBytes(32).toString("hex");
  const th = tokenHash(token + appSecret());
  const now = new Date();
  const exp = new Date(now.getTime() + ttlHours * 3600_000);
  db.run(
    `INSERT INTO sessions (token_hash, kind, user_id, created_at, last_seen_at, expires_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      th,
      kind,
      userId,
      now.toISOString(),
      now.toISOString(),
      exp.toISOString(),
    ],
  );
  persist();
  return token;
}

export async function destroySession(
  kind: "staff" | "customer",
  token: string | undefined,
): Promise<void> {
  if (!token) return;
  const db = await getDb();
  const th = tokenHash(token + appSecret());
  db.run(
    `UPDATE sessions SET revoked_at = ? WHERE token_hash = ? AND kind = ? AND revoked_at IS NULL`,
    [new Date().toISOString(), th, kind],
  );
  persist();
}

async function loadSession(
  kind: "staff" | "customer",
  token: string | undefined,
): Promise<string | null> {
  if (!token) return null;
  const db = await getDb();
  const th = tokenHash(token + appSecret());
  const row = one(
    db,
    `SELECT user_id, expires_at, revoked_at FROM sessions WHERE token_hash = ? AND kind = ? LIMIT 1`,
    [th, kind],
  );
  if (!row) return null;
  if (row.revoked_at) return null;
  if (new Date(String(row.expires_at)).getTime() < Date.now()) return null;
  db.run(`UPDATE sessions SET last_seen_at = ? WHERE token_hash = ?`, [
    new Date().toISOString(),
    th,
  ]);
  persist();
  return String(row.user_id);
}

export async function getStaffFromCookie(): Promise<StaffUser | null> {
  const jar = await cookies();
  const token = jar.get(STAFF_COOKIE)?.value;
  const userId = await loadSession("staff", token);
  if (!userId) return null;
  const db = await getDb();
  const u = one(
    db,
    `SELECT id, name, email, role, status FROM staff WHERE id = ?`,
    [userId],
  );
  if (!u || u.status !== "active") return null;
  return {
    id: String(u.id),
    name: String(u.name),
    email: String(u.email),
    role: u.role as "admin" | "staff",
  };
}

export async function getCustomerFromCookie(): Promise<CustomerUser | null> {
  const jar = await cookies();
  const token = jar.get(CUSTOMER_COOKIE)?.value;
  const userId = await loadSession("customer", token);
  if (!userId) return null;
  const db = await getDb();
  const u = one(
    db,
    `SELECT id, name, email, phone FROM customers WHERE id = ? AND anonymised_at IS NULL`,
    [userId],
  );
  if (!u) return null;
  return {
    id: String(u.id),
    name: String(u.name),
    email: String(u.email),
    phone: u.phone == null ? null : String(u.phone),
  };
}

export function cookieOptions(maxAgeSec: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSec,
  };
}

