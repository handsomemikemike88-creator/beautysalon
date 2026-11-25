import type { Metadata } from "next";
import { AiDemoImage } from "@/components/AiDemoImage";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { ServiceCtas } from "@/components/ServiceCtas";
import { faqPageJsonLd } from "@/lib/schema";
import {
  FREE_TRIAL_DEPOSIT_RULE,
  HYDRAFACIAL_FAQS,
  NO_HIDDEN_FEES,
  NO_PACKAGE_REQUIRED,
  PACKAGE_TERMS,
  STORE_NAME,
} from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Hydrafacial 免費體驗｜${STORE_NAME} 香港` },
  description:
    "Hydrafacial 免費體驗 HK$0，單次護理 HK$688。明碼實價，唔買套票都得，冇隱藏收費。效果因人而異，非醫療宣稱。",
};

export default function HydrafacialServicePage() {
  return (
    <div className="space-y-10">
      <JsonLd data={faqPageJsonLd(HYDRAFACIAL_FAQS)} />
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-amber-800">
          面部護理 · 標準價目
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-stone-950">Hydrafacial 免費體驗</h1>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">
          新客可先體驗清潔保濕護理。價錢網上公開，唔硬銷。效果因人而異；本頁不作醫療宣稱。
        </p>
      </header>

      <AiDemoImage
        src="/demo/hydrafacial-treatment.jpg"
        alt="Hydrafacial 護理示範，AI 生成示範圖"
        className="aspect-[16/9] max-h-80"
        priority
      />

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-orange-200 bg-orange-50/60 p-5">
          <p className="text-xs text-stone-500">體驗價（標準菜單）</p>
          <p className="mt-1 text-sm font-medium text-stone-800">Hydrafacial 免費體驗</p>
          <p className="text-3xl font-semibold text-orange-700">HK$0</p>
          <p className="mt-2 text-sm text-stone-600">{FREE_TRIAL_DEPOSIT_RULE}</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <p className="text-xs text-stone-500">續做／單次價（標準菜單）</p>
          <p className="mt-1 text-sm font-medium text-stone-800">Hydrafacial 單次護理</p>
          <p className="text-3xl font-semibold text-orange-700">HK$688</p>
          <p className="mt-2 text-sm text-stone-600">
            想再做可以揀單次，{NO_PACKAGE_REQUIRED}。
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="font-semibold text-stone-950">體驗包括咩</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-stone-600">
            <li>Hydrafacial 體驗步驟（以店內說明為準）</li>
            <li>到店護理說明</li>
            <li>時長約 [時長] 分鐘（待商戶提供）</li>
            <li>是否包含針清：待商戶提供</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="font-semibold text-stone-950">收費同條款</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-stone-600">
            <li>{NO_HIDDEN_FEES}</li>
            <li>可以淨係做一次／之後只買單次，{NO_PACKAGE_REQUIRED}。</li>
            <li>免費體驗次數：限新客／每人一次（細節待商戶提供）。</li>
            <li>10 次套票 HK$8,800：適用療程、有效期同退款{PACKAGE_TERMS}。</li>
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 text-sm text-stone-700">
        <h2 className="font-semibold text-stone-950">適合／唔適合（一般提示，非醫療建議）</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>想先試清潔保濕護理、了解流程嘅新客，可以預約體驗。</li>
          <li>如你懷孕、計劃懷孕或有健康顧慮，請喺預約前先諮詢同告知店員。</li>
          <li>皮膚敏感、近期做過其他護理或有傷口，亦請先告知店員，由店內評估是否適合當日進行。</li>
          <li>本站不作醫療診斷或療效保證，效果因人而異。</li>
        </ul>
      </section>

      <FaqList items={HYDRAFACIAL_FAQS} />

      <ServiceCtas
        source="service_hydrafacial"
        bookHref="/book?sku=hydrafacial-trial"
        whatsappPrefill="你好，我想預約【Hydrafacial 免費體驗】，希望時段："
      />
    </div>
  );
}
