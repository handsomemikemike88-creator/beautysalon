import type { Metadata } from "next";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import {
  ADDRESS,
  CONTACT_EMAIL,
  HOURS,
  PHONE_DISPLAY,
  PHONE_E164,
  STORE_AREA,
  STORE_NAME,
  whatsappUrl,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `聯絡我們｜${STORE_AREA}美容院`,
  description: `${STORE_NAME} 地址、電話、WhatsApp、營業時間與到店指引。[待商戶]`,
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">聯絡／到店</h1>
        <p className="mt-2 text-sm text-stone-600">
          NAP（名稱、地址、電話）佔位——商戶資料到位後須全站一致。
        </p>
      </header>

      <dl className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6 text-sm">
        <div>
          <dt className="font-medium text-stone-900">名稱</dt>
          <dd>{STORE_NAME}</dd>
        </div>
        <div>
          <dt className="font-medium text-stone-900">地區</dt>
          <dd>{STORE_AREA}</dd>
        </div>
        <div>
          <dt className="font-medium text-stone-900">地址</dt>
          <dd>{ADDRESS}</dd>
        </div>
        <div>
          <dt className="font-medium text-stone-900">電話</dt>
          <dd>
            <a href={`tel:+${PHONE_E164}`} className="text-orange-700 underline">
              {PHONE_DISPLAY}
            </a>
            <span className="ml-2 text-xs text-stone-500">（vault「Beauty salon website」）</span>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-stone-900">電郵</dt>
          <dd>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange-700 underline">
              {CONTACT_EMAIL}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-stone-900">WhatsApp</dt>
          <dd>
            <WhatsAppLink
              href={whatsappUrl("你好，我想查詢到店／預約。")}
              className="font-medium text-emerald-800 underline"
            >
              WhatsApp 預約／查詢
            </WhatsAppLink>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-stone-900">營業時間</dt>
          <dd>{HOURS}</dd>
        </div>
      </dl>

      <section className="rounded-2xl bg-stone-50 p-5 text-sm text-stone-600">
        <h2 className="font-semibold text-stone-900">到店指引</h2>
        <p className="mt-2">捷運出口／泊車／大廈指示：[待商戶]</p>
        <p className="mt-2">地圖嵌入稍後接（避免破圖佔位）。</p>
      </section>
    </div>
  );
}
