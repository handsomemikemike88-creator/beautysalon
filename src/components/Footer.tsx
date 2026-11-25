"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ADDRESS,
  CONTACT_EMAIL,
  HOURS,
  MERCHANT_PENDING,
  PHONE_DISPLAY,
  STORE_NAME,
  whatsappUrl,
} from "@/lib/site";
import { WhatsAppLink } from "./WhatsAppLink";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/staff") || pathname?.startsWith("/account")) return null;

  return (
    <footer className="mt-16 border-t border-stone-800 bg-stone-950 text-stone-300">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-semibold text-amber-200">{STORE_NAME}</p>
            <p className="mt-1 text-[11px] text-amber-200/70">{MERCHANT_PENDING}</p>
            <p className="mt-2">地址：{ADDRESS}（{MERCHANT_PENDING}）</p>
            <p>電話／WhatsApp：{PHONE_DISPLAY}</p>
            <p>電郵：{CONTACT_EMAIL}</p>
            <p>營業時間：{HOURS}（{MERCHANT_PENDING}）</p>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/services" className="hover:text-orange-400">服務</Link>
            <Link href="/services/hydrafacial" className="hover:text-orange-400">Hydrafacial 體驗</Link>
            <Link href="/services/laser-hair-removal" className="hover:text-orange-400">激光脫毛體驗</Link>
            <Link href="/prices" className="hover:text-orange-400">價目</Link>
            <Link href="/packages" className="hover:text-orange-400">套票</Link>
            <Link href="/therapists" className="hover:text-orange-400">信任／護理師</Link>
            <Link href="/book" className="hover:text-orange-400">預約體驗</Link>
            <Link href="/contact" className="hover:text-orange-400">聯絡</Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/privacy" className="hover:text-orange-400">私隱政策</Link>
            <Link href="/terms" className="hover:text-orange-400">條款及細則</Link>
            <WhatsAppLink
              href={whatsappUrl("你好，我想了解體驗預約。")}
              className="font-medium text-orange-400 hover:underline"
            >
              WhatsApp 預約
            </WhatsAppLink>
          </div>
        </div>
        <p className="mt-8 text-xs text-stone-500">
          本地 scaffold · 非上線站 · 與 mikeng-ai.com 無關 · 店名、地址同營業時間待商戶提供 · 圖片為 AI 生成示範圖
        </p>
      </div>
    </footer>
  );
}
