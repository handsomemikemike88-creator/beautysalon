import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AiDemoImage } from "@/components/AiDemoImage";
import { BookCta } from "@/components/BookCta";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import {
  LEGACY_TRIAL_REDIRECT,
  STORE_AREA,
  TRIALS,
  getService,
  whatsappUrl,
} from "@/lib/site";
import { TrialTracker } from "./tracker";

type Props = { params: Promise<{ sku: string }> };

export async function generateStaticParams() {
  return [
    ...TRIALS.map((t) => ({ sku: t.sku })),
    ...Object.keys(LEGACY_TRIAL_REDIRECT).map((sku) => ({ sku })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sku } = await params;
  const legacy = LEGACY_TRIAL_REDIRECT[sku];
  const trial = getService(legacy ?? sku);
  if (!trial || trial.kind !== "trial") return { title: "體驗" };
  return {
    title: `${trial.nameZh}｜${STORE_AREA}體驗預約`,
    description: `${trial.nameZh} HK$${trial.price}。單次明碼，預約體驗。非醫療宣稱。`,
  };
}

export default async function TrialPage({ params }: Props) {
  const { sku } = await params;
  if (LEGACY_TRIAL_REDIRECT[sku]) {
    redirect(`/trial/${LEGACY_TRIAL_REDIRECT[sku]}`);
  }
  const trial = getService(sku);
  if (!trial || trial.kind !== "trial") notFound();

  const img =
    trial.sku === "laser-trial"
      ? "/demo/laser-equipment.jpg"
      : "/demo/hydrafacial-treatment.jpg";

  return (
    <div className="space-y-8">
      <TrialTracker sku={trial.sku} />
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-amber-800">
          {STORE_AREA} · 體驗
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-stone-950">{trial.nameZh}</h1>
        <p className="mt-2 text-stone-600">{trial.tagline}</p>
        <p className="mt-1 text-sm text-stone-500">{trial.nameEn}</p>
      </header>

      <AiDemoImage src={img} alt={`${trial.nameZh}示範`} className="aspect-[16/9] max-h-72" />

      <div className="rounded-2xl border border-orange-200 bg-orange-50/60 p-5">
        <p className="text-xs text-stone-500">價錢（標準菜單）</p>
        <p className="text-3xl font-semibold text-orange-700">HK${trial.price}</p>
        {trial.priceNum === 0 ? (
          <p className="mt-1 text-xs text-stone-600">免費體驗 · 訂金規則 [待商戶規則]</p>
        ) : null}
      </div>

      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-medium text-stone-950">時長</dt>
          <dd className="text-stone-600">{trial.duration}</dd>
        </div>
        <div>
          <dt className="font-medium text-stone-950">資格</dt>
          <dd className="text-stone-600">{trial.eligibility}</dd>
        </div>
      </dl>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="font-semibold">包含</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-stone-600">
            {trial.include.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold">不包含</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-stone-600">
            {trial.exclude.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="rounded-xl bg-stone-50 p-4 text-sm text-stone-600">
        改期／取消請提前至少 <strong>24 小時</strong>。訂金說明見預約頁。[待商戶]
        效果因人而異；本頁不作醫療宣稱。
      </p>

      <div className="flex flex-wrap gap-3">
        <BookCta href={`/book?sku=${trial.sku}`} source={`trial_${trial.sku}`} />
        <WhatsAppLink
          href={whatsappUrl(`你好，我想預約【${trial.nameZh}】，希望時段：`)}
          className="inline-flex rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-5 py-2.5 text-sm font-medium text-emerald-800"
        >
          WhatsApp 預約
        </WhatsAppLink>
        <Link
          href="/packages"
          className="inline-flex rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium"
        >
          睇套票價目
        </Link>
      </div>
    </div>
  );
}
