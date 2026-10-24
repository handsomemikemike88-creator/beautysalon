import { NextRequest } from "next/server";
import {
  cookieOptions,
  createSession,
  hashPassword,
  STAFF_COOKIE,
} from "@/lib/auth";
import { getDb, nextId, one, persist, run } from "@/lib/db";
import { err, json } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "local";
  const rl = rateLimit(`staff-reg:${ip}`, 5, 60_000);
  if (!rl.ok) return err("註冊次數過多，請稍後再試", 429);

  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  const email = String(body.email || "")
    .trim()
    .toLowerCase();
  const password = String(body.password || "");
  const invite = String(body.inviteCode || "").trim();
  const expected = process.env.STAFF_INVITE_CODE || "DEMO-STAFF-2026";

  if (!name || !email || password.length < 10) {
    return err("請填名稱、電郵，密碼至少 10 字元");
  }
  if (invite !== expected) return err("邀請碼不正確（DEMO）", 403);

  const db = await getDb();
  if (one(db, `SELECT id FROM staff WHERE email = ?`, [email])) {
    return err("此電郵已註冊", 409);
  }
  const id = nextId("S");
  const now = new Date().toISOString();
  run(
    db,
    `INSERT INTO staff (id, name, email, pw_hash, role, status, created_at)
     VALUES (?,?,?,?,?,?,?)`,
    [id, name, email, hashPassword(password), "staff", "active", now],
  );
  persist();
  const token = await createSession("staff", id, 8);
  const res = json({ ok: true, staff: { id, name, email, role: "staff" } });
  res.cookies.set(STAFF_COOKIE, token, cookieOptions(8 * 3600));
  return res;
}
