import type { Metadata } from "next";
import Link from "next/link";
import { AiDemoImage } from "@/components/AiDemoImage";
import { ServiceCtas } from "@/components/ServiceCtas";
import { SERVICES, STORE_AREA } from "@/lib/site";

export const metadata: Metadata = {
  title: "服務｜標準菜單四項",
  description: "Hydrafacial 免費體驗 HK$0、單次 HK$688、激光脫毛體驗 HK$288、10 次套票 HK$8,800。明碼實價，唔買套票都得。",
};

export default function ServicesPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-amber-800">
          {STORE_AREA} · Services
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-stone-950">服務／標準菜單</h1>
        <p className="mt-2 text-sm text-stone-600">
          只提供以下四項公開價。唔設個人化報價。想了解療程詳情、FAQ 同收費承諾，請進入各療程頁。
        </p>
      </header>

      <AiDemoImage
        src="/demo/facial-products.jpg"
        alt="護膚產品陳列示範，AI 生成示範圖"
        className="aspect-[21/9] max-h-56"
      />

      <div className="grid gap-5">
        {SERVICES.map((s) => (
          <article
            id={s.sku}
            key={s.sku}
            className="scroll-mt-24 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-stone-950">{s.nameZh}</h2>
            <p className="text-xs text-stone-500">{s.nameEn}</p>
            <p className="mt-3 text-2xl font-semibold text-orange-700">HK${s.price}</p>
            <p className="mt-2 text-sm text-stone-600">{s.tagline}</p>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-medium text-stone-900">時長</dt>
                <dd className="text-stone-600">{s.duration}</dd>
              </div>
              <div>
                <dt className="font-medium text-stone-900">資格</dt>
                <dd className="text-stone-600">{s.eligibility}</dd>
              </div>
            </dl>
            {s.note ? <p className="mt-3 text-xs text-stone-500">{s.note}</p> : null}
            <div className="mt-4">
              <Link href={s.href} className="text-sm font-medium text-orange-700 underline">
                療程詳情 →
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AiDemoImage
          src="/demo/hydrafacial-treatment.jpg"
          alt="Hydrafacial 護理示範，AI 生成示範圖"
          className="aspect-[16/10]"
        />
        <AiDemoImage
          src="/demo/laser-equipment.jpg"
          alt="激光儀器示範，AI 生成示範圖"
          className="aspect-[16/10]"
        />
      </div>

      <ServiceCtas source="services_index" />
    </div>
  );
}
