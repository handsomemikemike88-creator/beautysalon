import { getCustomerFromCookie } from "@/lib/auth";
import { all, getDb } from "@/lib/db";
import { err, json } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET() {
  const customer = await getCustomerFromCookie();
  if (!customer) return err("未登入", 401);
  const db = await getDb();
  const bookings = all(
    db,
    `SELECT b.*, l.stage, l.payment_status, l.reminder_status
     FROM bookings b
     JOIN leads l ON l.id = b.lead_id
     WHERE b.customer_id = ? OR l.customer_id = ? OR lower(l.email) = lower(?)
     ORDER BY b.date DESC, b.time DESC`,
    [customer.id, customer.id, customer.email],
  );
  return json({ customer, bookings });
}
