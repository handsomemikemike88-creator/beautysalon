import { cookies } from "next/headers";
import { CUSTOMER_COOKIE, destroySession } from "@/lib/auth";
import { json } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function POST() {
  const jar = await cookies();
  await destroySession("customer", jar.get(CUSTOMER_COOKIE)?.value);
  const res = json({ ok: true });
  res.cookies.set(CUSTOMER_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
