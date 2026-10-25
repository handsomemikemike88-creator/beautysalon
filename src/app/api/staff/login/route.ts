import { NextRequest } from "next/server";
import {
  cookieOptions,
  createSession,
  STAFF_COOKIE,
  verifyPassword,
} from "@/lib/auth";
import { getDb, one, persist, run } from "@/lib/db";
import { err, json } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "local";
  const rl = rateLimit(`staff-login:${ip}`, 8, 60_000);
  if (!rl.ok) return err(`太多次嘗試，請 ${rl.retryAfterSec} 秒後再試`, 429);

  const body = await req.json().catch(() => ({}));
  const email = String(body.email || "")
    .trim()
    .toLowerCase();
  const password = String(body.password || "");
  if (!email || !password) return err("請填電郵同密碼");

  const db = await getDb();
  const user = one(db, `SELECT * FROM staff WHERE email = ?`, [email]);
  if (!user || !verifyPassword(password, String(user.pw_hash))) {
    return err("電郵或密碼不正確", 401);
  }
  if (user.status !== "active") return err("帳戶未啟用", 403);

  run(db, `UPDATE staff SET failed_logins = 0 WHERE id = ?`, [user.id]);
  persist();
  const token = await createSession("staff", String(user.id), 8);
  const res = json({
    ok: true,
    staff: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
  res.cookies.set(STAFF_COOKIE, token, cookieOptions(8 * 3600));
  return res;
}
