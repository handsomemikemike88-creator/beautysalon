import Link from "next/link";
import { ServiceCtas } from "@/components/ServiceCtas";
import {
  NO_HIDDEN_FEES,
  NO_PACKAGE_REQUIRED,
  PACKAGE_TERMS,
  PRICE_ROWS,
  STORE_AREA,
} from "@/lib/site";

export default function PricesPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-amber-800">
          {STORE_AREA} · 價目表
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-stone-950">標準價目＋收費承諾</h1>
        <p className="mt-2 text-sm text-stone-600">
          以下為商戶指定示範標準菜單（只得四項）。只按公開項目收費，唔做個人化報價。
        </p>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-950 text-amber-100">
            <tr>
              <th className="px-4 py-3 font-medium">服務</th>
              <th className="px-4 py-3 font-medium">價錢</th>
            </tr>
          </thead>
          <tbody>
            {PRICE_ROWS.map((row) => (
              <tr key={row.sku} className="border-b border-stone-100 last:border-0">
                <td className="px-4 py-3">
                  <Link href={row.href} className="font-medium text-stone-950 hover:text-orange-700">
                    {row.nameZh}
                  </Link>
                  <span className="mt-0.5 block text-xs text-stone-500">{row.nameEn}</span>
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

      <section className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-6">
        <h2 className="text-lg font-semibold text-stone-950">收費承諾</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-stone-700">
          <li>{NO_HIDDEN_FEES}</li>
          <li>
            可以淨係做一次或只買單次，{NO_PACKAGE_REQUIRED}。唔會因為唔買套票而加收未列出嘅費用。
          </li>
          <li>Hydrafacial 免費體驗 HK$0 唔收訂金。如未提前 24 小時取消，就當用咗個優惠。</li>
          <li>激光脫毛體驗 HK$288 喺店內收款；網上訂金是否收取待商戶決定，本站暫不設網上收款。</li>
          <li>10 次套票 HK$8,800 嘅適用療程、有效期同退款安排，{PACKAGE_TERMS}。</li>
        </ul>
      </section>

      <ServiceCtas source="prices" />
    </div>
  );
}
