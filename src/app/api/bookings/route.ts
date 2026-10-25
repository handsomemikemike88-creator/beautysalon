import { NextRequest } from "next/server";
import { getCustomerFromCookie } from "@/lib/auth";
import { err, json } from "@/lib/http";
import { createLeadWithBooking } from "@/lib/leads";
import { rateLimit } from "@/lib/rate-limit";
import { resolveSku } from "@/lib/crm";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "local";
  const rl = rateLimit(`book:${ip}`, 12, 60_000);
  if (!rl.ok) return err("提交太密，請稍後", 429);

  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  const email = String(body.email || "").trim();
  const sku = String(body.sku || "").trim();
  const date = String(body.date || "").trim();
  const time = String(body.time || "").trim();
  const consentPics = Boolean(body.consentPics);
  const marketingOptIn = Boolean(body.marketingOptIn);

  if (!name || !phone) return err("請填稱呼同電話");
  if (!resolveSku(sku)) return err("服務不在標準菜單");
  if (!consentPics) return err("請同意 PICS");

  const customer = await getCustomerFromCookie();

  try {
    const created = await createLeadWithBooking({
      name,
      phone,
      email: email || undefined,
      serviceSku: sku,
      date,
      time,
      consentPics: true,
      marketingOptIn,
      source: "website",
      customerId: customer?.id ?? null,
      isSample: false,
      note: "網上預約（本地 DEMO DB）",
    });
    return json({
      ok: true,
      demo: true,
      leadId: created.leadId,
      bookingId: created.bookingId,
      sku: created.sku,
      priceHkd: created.priceHkd,
      date,
      time,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "ERROR";
    return err(msg, 400);
  }
}
