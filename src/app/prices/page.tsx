"use client";

import Link from "next/link";
import { BookCta } from "@/components/BookCta";
import { useLang } from "@/lib/i18n";
import { PRICE_ROWS, STORE_AREA } from "@/lib/site";

export default function PricesPage() {
  const { t, lang } = useLang();

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-amber-800">
          {STORE_AREA} · Price list
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-stone-950">{t("prices_title")}</h1>
        <p className="mt-2 text-sm text-stone-600">{t("prices_note")}</p>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-950 text-amber-100">
            <tr>
              <th className="px-4 py-3 font-medium">{t("col_service")}</th>
              <th className="px-4 py-3 font-medium">{t("col_price")}</th>
            </tr>
          </thead>
          <tbody>
            {PRICE_ROWS.map((row) => (
              <tr key={row.sku} className="border-b border-stone-100 last:border-0">
                <td className="px-4 py-3">
                  <span className="font-medium text-stone-950">
                    {lang === "en" ? row.nameEn : row.nameZh}
                  </span>
                  {row.note ? (
                    <span className="mt-0.5 block text-xs text-stone-500">{row.note}</span>
                  ) : null}
                </td>
                <td className="px-4 py-3 font-semibold text-orange-700">HK${row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-3">
        <BookCta source="prices" />
        <Link
          href="/packages"
          className="inline-flex rounded-full border border-amber-700/40 px-5 py-2.5 text-sm font-medium"
        >
          {t("cta_packages")}
        </Link>
        <Link href="/services" className="text-sm text-orange-700 underline">
          服務詳情
        </Link>
      </div>
    </div>
  );
}
