import type { Metadata } from "next";
import { AiDemoImage } from "@/components/AiDemoImage";
import { ServiceCtas } from "@/components/ServiceCtas";
import { TherapistTrust } from "@/components/TherapistTrust";
import { NO_HIDDEN_FEES, NO_PACKAGE_REQUIRED, STORE_AREA, STORE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "信任／護理師",
  description: "專業、透明、不硬銷。護理師資料為示範佔位，待商戶提供真實團隊資料。",
};

export default function TherapistsPage() {
  const trustBullets = [
    "明碼實價，網上公開標準菜單",
    NO_HIDDEN_FEES,
    `單次可做，${NO_PACKAGE_REQUIRED}`,
    "Hydrafacial 免費體驗唔收訂金；未提前 24 小時取消就當用咗個優惠",
    "不收集香港身份證作網上預約",
    "效果因人而異；本站不作醫療宣稱",
  ];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-amber-800">
          {STORE_AREA} · Trust
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-stone-950">信任與護理團隊</h1>
        <p className="mt-2 text-sm text-stone-600">
          {STORE_NAME} 以專業、透明、信任為先。本頁嘅護理師卡片全部係示範內容，並非真實員工或真人相片。真實團隊資料待商戶提供。本頁不設星級評價或客人證言。
        </p>
      </header>

      <AiDemoImage
        src="/demo/salon-interior.jpg"
        alt="美容院大堂示範，AI 生成示範圖"
        className="aspect-[21/9] max-h-64"
      />

      <section className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6">
        <h2 className="font-semibold text-stone-950">我們點樣建立信任</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-stone-700">
          {trustBullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <TherapistTrust />

      <ServiceCtas source="therapists" />
    </div>
  );
}
