import type { Metadata } from "next";
import { AiDemoImage } from "@/components/AiDemoImage";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { ServiceCtas } from "@/components/ServiceCtas";
import { faqPageJsonLd } from "@/lib/schema";
import {
  LASER_FAQS,
  NO_HIDDEN_FEES,
  NO_PACKAGE_REQUIRED,
  PACKAGE_TERMS,
  PAID_TRIAL_PAYMENT_RULE,
  STORE_NAME,
} from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `激光脫毛 HK$288 體驗｜${STORE_NAME}` },
  description:
    "激光脫毛體驗 HK$288，店內收款。明碼實價，唔買套票都得，冇隱藏收費。效果因人而異，非醫療宣稱。",
};

export default function LaserHairRemovalServicePage() {
  return (
    <div className="space-y-10">
      <JsonLd data={faqPageJsonLd(LASER_FAQS)} />
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-amber-800">
          激光脫毛 · 標準價目
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-stone-950">激光脫毛 HK$288 體驗</h1>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">
          單部位體驗價公開，先試再決定。效果因人而異；本頁不作醫療宣稱，亦唔會承諾特定效果。
        </p>
      </header>

      <AiDemoImage
        src="/demo/laser-equipment.jpg"
        alt="激光儀器同護理床示範，AI 生成示範圖"
        className="aspect-[16/9] max-h-80"
        priority
      />

      <section className="rounded-2xl border border-orange-200 bg-orange-50/60 p-5">
        <p className="text-xs text-stone-500">體驗價（標準菜單）</p>
        <p className="mt-1 text-sm font-medium text-stone-800">激光脫毛體驗</p>
        <p className="text-3xl font-semibold text-orange-700">HK$288</p>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">{PAID_TRIAL_PAYMENT_RULE}</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="font-semibold text-stone-950">體驗包括咩</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-stone-600">
            <li>單部位激光脫毛體驗（部位待商戶提供）</li>
            <li>到店安全說明</li>
            <li>時長約 [時長] 分鐘（待商戶提供）</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="font-semibold text-stone-950">收費同條款</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-stone-600">
            <li>{NO_HIDDEN_FEES}</li>
            <li>可以淨係做一次體驗，{NO_PACKAGE_REQUIRED}。</li>
            <li>體驗次數：限新客／每人一次（細節待商戶提供）。</li>
            <li>標準菜單未有激光單次價；續做方案請以店內說明為準，唔會另外報個人化價錢。</li>
            <li>10 次套票 HK$8,800：適用療程、有效期同退款{PACKAGE_TERMS}。</li>
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 text-sm text-stone-700">
        <h2 className="font-semibold text-stone-950">適合／唔適合（一般提示，非醫療建議）</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>想先了解流程同體驗單一部位嘅客人，可以預約體驗。</li>
          <li>如你懷孕、計劃懷孕或有健康顧慮，請喺預約前先諮詢同告知店員。</li>
          <li>皮膚敏感、近期曬傷、有傷口或正在用其他護理產品，亦請先告知店員，由店內評估是否適合當日進行。</li>
          <li>本站不作醫療診斷或療效保證，效果因人而異。</li>
        </ul>
      </section>

      <FaqList items={LASER_FAQS} />

      <ServiceCtas
        source="service_laser"
        bookHref="/book?sku=laser-trial"
        whatsappPrefill="你好，我想預約【激光脫毛體驗】，希望時段："
      />
    </div>
  );
}
