"use client";

import { useLang } from "@/lib/i18n";
import { DEPOSIT_EXPLAIN, RESCHEDULE_RULE } from "@/lib/site";

export default function TermsPage() {
  const { t } = useLang();

  return (
    <article className="space-y-6 text-sm text-stone-700">
      <h1 className="text-3xl font-semibold text-stone-900">{t("terms_title")}</h1>
      <p className="text-amber-800">[待商戶/法律確認] · 草擬</p>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-stone-900">預約與訂金</h2>
        <p>{DEPOSIT_EXPLAIN}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-stone-900">改期／取消（24 小時）</h2>
        <p>{RESCHEDULE_RULE}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-stone-900">套票有效期與退款</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>套票次數、總價、每堂等價、有效期以購買當日套票頁及確認訊息為準。[待商戶]</li>
          <li>退款／轉讓計算方式：[待商戶]</li>
          <li>{t("terms_cooling")}</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-stone-900">體驗範圍</h2>
        <p>
          體驗含／不含、時長、是否限新客一次，以對應體驗落地頁為準。效果因人而異；本站不保證療效。
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-stone-900">標準菜單</h2>
        <p>
          所有公開價錢為標準菜單價。主 CTA 為預約體驗、睇套票價目或 WhatsApp 預約。
        </p>
      </section>
    </article>
  );
}
