import { NextRequest } from "next/server";
import {
  cookieOptions,
  createSession,
  CUSTOMER_COOKIE,
  hashPassword,
} from "@/lib/auth";
import { getDb, nextId, one, persist, run } from "@/lib/db";
import { err, json } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "local";
  const rl = rateLimit(`cust-reg:${ip}`, 5, 60_000);
  if (!rl.ok) return err("註冊次數過多", 429);

  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  const email = String(body.email || "")
    .trim()
    .toLowerCase();
  const phone = String(body.phone || "").trim();
  const password = String(body.password || "");
  const pics = Boolean(body.consentPics);

  if (!name || !email || password.length < 8) {
    return err("請填名稱、電郵，密碼至少 8 字元");
  }
  if (!pics) return err("請同意 PICS");

  const db = await getDb();
  if (one(db, `SELECT id FROM customers WHERE email = ?`, [email])) {
    return err("此電郵已註冊", 409);
  }
  const id = nextId("C");
  const now = new Date().toISOString();
  run(
    db,
    `INSERT INTO customers (id, name, email, phone, pw_hash, consent_at, created_at)
     VALUES (?,?,?,?,?,?,?)`,
    [id, name, email, phone || null, hashPassword(password), now, now],
  );
  persist();
  const token = await createSession("customer", id, 24 * 7);
  const res = json({ ok: true, customer: { id, name, email } });
  res.cookies.set(CUSTOMER_COOKIE, token, cookieOptions(7 * 24 * 3600));
  return res;
}
