import { getStaffFromCookie } from "@/lib/auth";
import { err, json } from "@/lib/http";
import { listLeads } from "@/lib/leads";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getStaffFromCookie())) return err("未登入", 401);
  return json({ leads: await listLeads() });
}
