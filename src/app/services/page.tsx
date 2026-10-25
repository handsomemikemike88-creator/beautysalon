import type { Metadata } from "next";
import Link from "next/link";
import { AiDemoImage } from "@/components/AiDemoImage";
import { BookCta } from "@/components/BookCta";
import { SERVICES, STORE_AREA } from "@/lib/site";

export const metadata: Metadata = {
  title: "服務｜標準菜單四項",
  description: "Hydrafacial 免費體驗、單次、激光脫毛體驗、10 次套票。明碼實價。",
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
          只提供以下四項公開價。唔設免費諮詢、即時報價或個人化報價。
        </p>
      </header>

      <AiDemoImage
        src="/demo/facial-products.jpg"
        alt="護膚產品示範"
        className="aspect-[21/9] max-h-56"
      />

      <div className="grid gap-5">
        {SERVICES.map((s) => (
          <article
            id={s.sku}
            key={s.sku}
            className="scroll-mt-24 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm md:flex md:gap-6"
          >
            <div className="flex-1">
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
              <div className="mt-4 flex flex-wrap gap-2">
                {s.kind === "trial" ? (
                  <Link
                    href={`/trial/${s.sku}`}
                    className="text-sm font-medium text-orange-700 underline"
                  >
                    體驗詳情 →
                  </Link>
                ) : null}
                {s.kind === "package" ? (
                  <Link href="/packages" className="text-sm font-medium text-orange-700 underline">
                    套票詳情 →
                  </Link>
                ) : null}
                <BookCta
                  href={`/book?sku=${s.sku}`}
                  source={`services_${s.sku}`}
                  className="inline-flex rounded-full bg-orange-600 px-4 py-2 text-xs font-medium text-white hover:bg-orange-700"
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AiDemoImage src="/demo/hydrafacial-treatment.jpg" alt="Hydrafacial 示範" className="aspect-[16/10]" />
        <AiDemoImage src="/demo/laser-equipment.jpg" alt="激光儀器示範" className="aspect-[16/10]" />
      </div>
    </div>
  );
}
