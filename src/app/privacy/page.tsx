import type { Metadata } from "next";
import { LEGAL_ENTITY, STORE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "私隱政策",
  description: "收集個人資料聲明與私隱政策草擬（須經法律確認）。",
};

export default function PrivacyPage() {
  return (
    <article className="prose-sm max-w-none space-y-6 text-stone-700">
      <h1 className="text-3xl font-semibold text-stone-900">私隱政策（草擬）</h1>
      <p className="text-sm text-amber-800">[待商戶/法律確認] · 非法律意見</p>

      <section className="space-y-2 text-sm">
        <h2 className="text-lg font-semibold text-stone-900">1. 資料使用者</h2>
        <p>
          {STORE_NAME}／法律實體名稱：{LEGAL_ENTITY}。聯絡資料保障負責人：[待商戶]。
        </p>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="text-lg font-semibold text-stone-900">2. 我們收集哪些資料</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>預約：稱呼、手提電話／WhatsApp、電郵（選填）、服務、時段、備註（選填）。</li>
          <li>付款：若日後接 Stripe，卡資料由 Stripe 處理；本店不儲存信用卡號碼。</li>
          <li>
            <strong>本店不會經網上表單收集香港身份證號碼或副本。</strong>
          </li>
        </ul>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="text-lg font-semibold text-stone-900">3. 使用目的</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>處理、確認及提醒預約；改期或取消。</li>
          <li>訂金／套票對帳（如適用）。</li>
          <li>只有另行同意後才發送推廣訊息；可隨時免費退訂。</li>
        </ul>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="text-lg font-semibold text-stone-900">4. 直接促銷（PICS）</h2>
        <p>
          市場推廣同意與預約必要通訊分開。未剔選同意方格者，只會收到預約確認及提醒。
        </p>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="text-lg font-semibold text-stone-900">5. 你的權利</h2>
        <p>
          你可根據《個人資料（私隱）條例》要求查閱及更正資料。請聯絡：[待商戶]。
        </p>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="text-lg font-semibold text-stone-900">6. 保留</h2>
        <p>保留期限：[待商戶]。之後按內部政策刪除或匿名化。</p>
      </section>
    </article>
  );
}
