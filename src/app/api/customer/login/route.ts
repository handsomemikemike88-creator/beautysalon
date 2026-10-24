import { NextRequest } from "next/server";
import {
  cookieOptions,
  createSession,
  CUSTOMER_COOKIE,
  verifyPassword,
} from "@/lib/auth";
import { getDb, one } from "@/lib/db";
import { err, json } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "local";
  const rl = rateLimit(`cust-login:${ip}`, 8, 60_000);
  if (!rl.ok) return err(`太多次嘗試，請 ${rl.retryAfterSec} 秒後再試`, 429);

  const body = await req.json().catch(() => ({}));
  const email = String(body.email || "")
    .trim()
    .toLowerCase();
  const password = String(body.password || "");
  if (!email || !password) return err("請填電郵同密碼");

  const db = await getDb();
  const user = one(
    db,
    `SELECT * FROM customers WHERE email = ? AND anonymised_at IS NULL`,
    [email],
  );
  if (!user || !verifyPassword(password, String(user.pw_hash))) {
    return err("電郵或密碼不正確", 401);
  }
  const token = await createSession("customer", String(user.id), 24 * 7);
  const res = json({
    ok: true,
    customer: { id: user.id, name: user.name, email: user.email },
  });
  res.cookies.set(CUSTOMER_COOKIE, token, cookieOptions(7 * 24 * 3600));
  return res;
}
