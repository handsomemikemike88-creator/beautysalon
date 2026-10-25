import Link from "next/link";
import { AiDemoImage } from "@/components/AiDemoImage";
import { BookCta } from "@/components/BookCta";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { SERVICES, STORE_AREA, STORE_NAME, whatsappUrl } from "@/lib/site";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div className="rounded-3xl bg-gradient-to-br from-orange-50 via-[#faf7f2] to-amber-50 px-6 py-12 md:px-8">
          <p className="text-xs font-medium uppercase tracking-widest text-amber-800">
            {STORE_AREA} · 獨立美容院
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-snug text-stone-950 md:text-4xl">
            {STORE_NAME}
            <span className="mt-2 block text-xl font-normal text-stone-700 md:text-2xl">
              單次都可以。價錢網上睇到，唔硬銷。
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-stone-600">
            標準菜單四項公開價：免費體驗、單次 Hydrafacial、激光脫毛體驗、10 次套票。主流程係預約體驗，唔係先傾後定價。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BookCta source="home_hero" />
            <Link
              href="/packages"
              className="inline-flex items-center justify-center rounded-full border border-amber-700/40 bg-white px-5 py-2.5 text-sm font-medium text-stone-900 hover:border-orange-400"
            >
              睇套票價目
            </Link>
            <WhatsAppLink
              href={whatsappUrl("你好，我想預約體驗。")}
              className="inline-flex items-center justify-center rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-5 py-2.5 text-sm font-medium text-emerald-800"
            >
              WhatsApp 預約
            </WhatsAppLink>
          </div>
        </div>
        <AiDemoImage
          src="/demo/salon-interior.jpg"
          alt="美容院室內環境示範"
          priority
          className="aspect-[4/3] min-h-[220px]"
        />
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-lg font-semibold text-stone-950">標準菜單（四項）</h2>
          <Link href="/services" className="text-sm text-orange-700 hover:underline">
            全部服務 →
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <Link
              key={s.sku}
              href={
                s.kind === "package"
                  ? "/packages"
                  : s.kind === "trial"
                    ? `/trial/${s.sku}`
                    : `/services#${s.sku}`
              }
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
          alt="Hydrafacial 護理示範"
          className="aspect-[16/10]"
        />
        <AiDemoImage
          src="/demo/facial-products.jpg"
          alt="護膚產品陳列示範"
          className="aspect-[16/10]"
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-stone-950">四大入口</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            { href: "/services", title: "服務", desc: "四項標準菜單一覽" },
            { href: "/trial/hydrafacial-trial", title: "體驗", desc: "Hydrafacial 免費體驗／激光脫毛體驗" },
            { href: "/packages", title: "套票", desc: "10 次套票 HK$8,800" },
            { href: "/book", title: "預約", desc: "揀服務＋時段＋訂金說明＋ WhatsApp" },
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

      <section className="rounded-2xl border border-amber-200/80 bg-white p-6 text-sm text-stone-600">
        <p className="font-medium text-stone-950">信任承諾（商戶真實執行時適用）</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>明碼實價 · 單次可做 · 無需承諾套票</li>
          <li>體驗後不強制入銷售室／當日不逼簽（[待商戶]）</li>
          <li>改期請提前 24 小時；訂金說明見預約頁</li>
          <li>
            <Link href="/therapists" className="text-orange-700 underline">
              護理師／信任頁
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
