"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { track } from "@/lib/analytics";
import { HOURS, RESCHEDULE_RULE, getService, whatsappUrl } from "@/lib/site";

function ConfirmedInner() {
  const sp = useSearchParams();
  const sku = sp.get("sku") ?? "";
  const slot = sp.get("slot") ?? "";
  const name = sp.get("name") ?? "";
  const service = getService(sku);

  useEffect(() => {
    track("booking_confirmed", { sku, slot });
  }, [sku, slot]);

  return (
    <div className="space-y-8">
      <header className="rounded-3xl bg-emerald-50 px-6 py-10">
        <p className="text-xs font-medium uppercase tracking-widest text-emerald-800">
          Booking confirmed (demo)
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-stone-950">預約已登記（示範）</h1>
        <p className="mt-3 text-sm text-stone-600">
          {name ? `${name}，` : ""}你嘅服務「{service?.nameZh ?? (sku || "—")}」
          {service ? `（HK$${service.price}）` : ""}時段「{slot || "—"}」已喺本機示範流程標記成功。真實店舖確認會經 WhatsApp／電郵。[待商戶]
        </p>
      </header>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 text-sm">
        <h2 className="font-semibold">下一步</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-600">
          <li>加入日曆：請自行記錄時段（ICS 稍後接）。</li>
          <li>營業時間：{HOURS}</li>
          <li>訂金核銷／到店出示確認訊息方式：[待商戶]</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-sm">
        <h2 className="font-semibold">改期／取消（24 小時）</h2>
        <p className="mt-2 text-stone-700">{RESCHEDULE_RULE}</p>
        <WhatsAppLink
          href={whatsappUrl("你好，我想改期／取消已預約嘅體驗。")}
          className="mt-3 inline-block font-medium text-emerald-800 underline"
        >
          WhatsApp 查詢改期（交易用途）
        </WhatsAppLink>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/" className="rounded-full border border-stone-300 px-5 py-2.5 text-sm">
          返首頁
        </Link>
        <Link href="/packages" className="rounded-full border border-stone-300 px-5 py-2.5 text-sm">
          睇套票價目
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmedPage() {
  return (
    <Suspense fallback={<p className="text-sm text-stone-500">載入確認…</p>}>
      <ConfirmedInner />
    </Suspense>
  );
}
