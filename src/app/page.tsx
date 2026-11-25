import type { Metadata } from "next";
import Link from "next/link";
import { AiDemoImage } from "@/components/AiDemoImage";
import { ServiceCtas } from "@/components/ServiceCtas";
import { TherapistTrust } from "@/components/TherapistTrust";
import {
  FREE_TRIAL_DEPOSIT_RULE,
  MERCHANT_PENDING,
  NO_HIDDEN_FEES,
  NO_PACKAGE_REQUIRED,
  PACKAGE_TERMS,
  SERVICES,
  STORE_AREA,
  STORE_NAME,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `${STORE_NAME}｜香港美容院｜預約體驗`,
  description:
    "香港獨立美容院：單次都可以，價錢網上睇到，唔硬銷。Hydrafacial 免費體驗 HK$0、單次 HK$688、激光脫毛體驗 HK$288、10 次套票 HK$8,800。",
};

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div className="rounded-3xl bg-gradient-to-br from-orange-50 via-[#faf7f2] to-amber-50 px-6 py-12 md:px-8">
          <p className="text-xs font-medium uppercase tracking-widest text-amber-800">
            {STORE_AREA} · 獨立美容院
            <span className="ml-2 rounded-full border border-amber-400/50 bg-white/70 px-2 py-0.5 text-[10px] font-normal normal-case tracking-normal text-amber-900">
              {MERCHANT_PENDING}
            </span>
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-snug text-stone-950 md:text-4xl">
            {STORE_NAME}
            <span className="mt-2 block text-xl font-normal text-stone-700 md:text-2xl">
              單次都可以。價錢網上睇到，唔硬銷。
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-stone-600">
            標準菜單四項公開價：Hydrafacial 免費體驗 HK$0、單次 HK$688、激光脫毛體驗 HK$288、10
            次套票 HK$8,800。主流程係預約體驗，唔係先傾後定價。{NO_PACKAGE_REQUIRED}。
          </p>
          <div className="mt-8">
            <ServiceCtas source="home_hero" />
          </div>
        </div>
        <AiDemoImage
          src="/demo/salon-interior.jpg"
          alt="美容院大堂同走廊示範，AI 生成示範圖"
          priority
          className="aspect-[4/3] min-h-[220px]"
        />
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-lg font-semibold text-stone-950">標準菜單（四項）</h2>
          <Link href="/prices" className="text-sm text-orange-700 hover:underline">
            價目表＋收費承諾 →
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <Link
              key={s.sku}
              href={s.href}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow"
            >
              <p className="text-base font-semibold text-stone-950">{s.nameZh}</p>
              <p className="mt-0.5 text-xs text-stone-500">{s.nameEn}</p>
              <p className="mt-3 text-xl font-semibold text-orange-700">HK${s.price}</p>
              <p className="mt-1 text-sm text-stone-600">{s.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <AiDemoImage
          src="/demo/hydrafacial-treatment.jpg"
          alt="Hydrafacial 護理示範，AI 生成示範圖"
          className="aspect-[16/10]"
        />
        <AiDemoImage
          src="/demo/facial-products.jpg"
          alt="護膚產品陳列示範，AI 生成示範圖"
          className="aspect-[16/10]"
        />
      </section>

      <section className="rounded-2xl border border-amber-200/80 bg-white p-6 text-sm text-stone-600">
        <h2 className="text-lg font-semibold text-stone-950">收費同預約承諾</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>明碼實價。{NO_HIDDEN_FEES}</li>
          <li>單次可做，{NO_PACKAGE_REQUIRED}。</li>
          <li>{FREE_TRIAL_DEPOSIT_RULE}</li>
          <li>激光脫毛體驗 HK$288 喺店內收款；網上訂金待商戶決定。</li>
          <li>10 次套票 HK$8,800：適用療程、有效期同退款{PACKAGE_TERMS}。</li>
        </ul>
      </section>

      <TherapistTrust showLink />

      <section>
        <h2 className="text-lg font-semibold text-stone-950">了解更多</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            { href: "/services/hydrafacial", title: "Hydrafacial", desc: "免費體驗 HK$0 · 單次 HK$688" },
            {
              href: "/services/laser-hair-removal",
              title: "激光脫毛",
              desc: "體驗 HK$288，店內收款",
            },
            { href: "/prices", title: "價目表", desc: "四項標準價＋收費承諾" },
            { href: "/book", title: "預約體驗", desc: "揀服務同時間，或用 WhatsApp 預約" },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-amber-400 hover:shadow"
            >
              <p className="text-base font-semibold text-orange-800">{c.title}</p>
              <p className="mt-1 text-sm text-stone-600">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
