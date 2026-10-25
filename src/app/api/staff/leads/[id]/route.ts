import { NextRequest } from "next/server";
import { getStaffFromCookie } from "@/lib/auth";
import { err, json } from "@/lib/http";
import {
  getLead,
  listNotes,
  updateLeadFields,
  updateLeadStage,
} from "@/lib/leads";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  if (!(await getStaffFromCookie())) return err("未登入", 401);
  const { id } = await ctx.params;
  const lead = await getLead(id);
  if (!lead) return err("找不到", 404);
  const notes = await listNotes(id);
  return json({ lead, notes });
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const staff = await getStaffFromCookie();
  if (!staff) return err("未登入", 401);
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  try {
    if (body.stage) {
      await updateLeadStage(id, String(body.stage), staff.name, String(body.why || ""));
    }
    await updateLeadFields(id, {
      payment_status: body.payment_status,
      reminder_status: body.reminder_status,
      attendance: body.attendance,
      staff_note: body.staff_note,
      by_name: staff.name,
    });
    return json({ ok: true, lead: await getLead(id), notes: await listNotes(id) });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "ERROR";
    if (msg === "NOT_FOUND") return err("找不到", 404);
    if (msg.startsWith("INVALID")) return err(msg, 400);
    return err("更新失敗", 500);
  }
}
