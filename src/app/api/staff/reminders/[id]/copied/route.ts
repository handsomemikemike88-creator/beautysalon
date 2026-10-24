import { NextRequest } from "next/server";
import { getStaffFromCookie } from "@/lib/auth";
import { err, json } from "@/lib/http";
import { markReminderCopied } from "@/lib/leads";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(_req: NextRequest, ctx: Ctx) {
  if (!(await getStaffFromCookie())) return err("未登入", 401);
  const { id } = await ctx.params;
  try {
    await markReminderCopied(id);
    return json({ ok: true });
  } catch {
    return err("找不到", 404);
  }
}
