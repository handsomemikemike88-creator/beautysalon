import type { Metadata } from "next";
import Link from "next/link";
import { AiDemoImage } from "@/components/AiDemoImage";
import { BookCta } from "@/components/BookCta";
import { STORE_AREA, STORE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "信任／護理師",
  description: "專業、透明、不硬銷。護理師資料待商戶提供。",
};

const TRUST_BULLETS = [
  "明碼實價，網上公開標準菜單",
  "單次可做，無需承諾套票",
  "體驗後不強制入銷售室（若商戶真實執行）",
  "改期提前 24 小時；訂金規則公開",
  "不收集香港身份證作網上預約",
  "效果因人而異；本站不作醫療宣稱",
];

export default function TherapistsPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-amber-800">
          {STORE_AREA} · Trust
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-stone-950">信任與護理團隊</h1>
        <p className="mt-2 text-sm text-stone-600">
          {STORE_NAME} 以專業、premium、信任為先。以下為佔位說明；真實護理師簡歷待商戶提供。本頁不虛構星級評價。
        </p>
      </header>

      <AiDemoImage
        src="/demo/salon-interior.jpg"
        alt="店內環境示範"
        className="aspect-[21/9] max-h-64"
      />

      <section className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6">
        <h2 className="font-semibold text-stone-950">我們點樣建立信任</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-stone-700">
          {TRUST_BULLETS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-stone-950">護理師（佔位）</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            { name: "護理師 A", role: "面部護理 · [待商戶]" },
            { name: "護理師 B", role: "儀器護理 · [待商戶]" },
          ].map((card) => (
            <article
              key={card.name}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-950 text-sm font-medium text-amber-200">
                {card.name.slice(-1)}
              </div>
              <h3 className="mt-3 font-semibold text-stone-950">{card.name}</h3>
              <p className="text-sm text-stone-600">{card.role}</p>
              <p className="mt-2 text-xs text-stone-500">
                資歷、證書、服務年資：[待商戶]。唔會虛構評分或假評論。
              </p>
            </article>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <BookCta source="therapists" />
        <Link
          href="/services"
          className="inline-flex rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium"
        >
          睇服務價目
        </Link>
      </div>
    </div>
  );
}
