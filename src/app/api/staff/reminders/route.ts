import { getStaffFromCookie } from "@/lib/auth";
import { err, json } from "@/lib/http";
import { listReminders } from "@/lib/leads";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getStaffFromCookie())) return err("未登入", 401);
  return json({
    note: "草稿 only — 唔會自動經 WhatsApp／電郵寄出",
    reminders: await listReminders(),
  });
}
