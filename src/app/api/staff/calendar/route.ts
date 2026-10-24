import { NextRequest } from "next/server";
import { getStaffFromCookie } from "@/lib/auth";
import { err, json } from "@/lib/http";
import { calendarBookings } from "@/lib/leads";

export const dynamic = "force-dynamic";

function addDays(iso: string, n: number) {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export async function GET(req: NextRequest) {
  if (!(await getStaffFromCookie())) return err("未登入", 401);
  const sp = req.nextUrl.searchParams;
  const today = new Date().toISOString().slice(0, 10);
  const from = sp.get("from") || addDays(today, -7);
  const to = sp.get("to") || addDays(today, 14);
  return json({ from, to, bookings: await calendarBookings(from, to) });
}
