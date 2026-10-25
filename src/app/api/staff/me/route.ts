import { getStaffFromCookie } from "@/lib/auth";
import { err, json } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET() {
  const staff = await getStaffFromCookie();
  if (!staff) return err("未登入", 401);
  return json({ staff });
}
