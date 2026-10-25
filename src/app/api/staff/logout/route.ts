import { cookies } from "next/headers";
import { destroySession, STAFF_COOKIE } from "@/lib/auth";
import { json } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function POST() {
  const jar = await cookies();
  await destroySession("staff", jar.get(STAFF_COOKIE)?.value);
  const res = json({ ok: true });
  res.cookies.set(STAFF_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
