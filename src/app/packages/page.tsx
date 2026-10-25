"use client";

import Link from "next/link";
import { useEffect } from "react";
import { BookCta } from "@/components/BookCta";
import { track } from "@/lib/analytics";
import { PACKAGES, STORE_AREA } from "@/lib/site";

export default function PackagesPage() {
  useEffect(() => {
    track("view_packages");
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-amber-800">
          {STORE_AREA} · Packages
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-stone-950">固定套票</h1>
        <p className="mt-2 text-sm text-stone-600">
          標準菜單只售一項固定套票：10 次套票。價錢以本頁公開檔位為準。
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-1 md:max-w-lg">
        {PACKAGES.map((pkg) => (
          <article
            key={pkg.id}
            className="flex flex-col rounded-2xl border border-amber-300/60 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-stone-950">{pkg.nameZh}</h2>
            <p className="text-xs text-stone-500">{pkg.nameEn}</p>
            <p className="mt-4 text-3xl font-semibold text-orange-700">HK${pkg.totalPrice}</p>
            <dl className="mt-4 flex-1 space-y-2 text-sm text-stone-600">
              <div className="flex justify-between gap-2">
                <dt>次數</dt>
                <dd className="font-medium text-stone-950">{pkg.sessions}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt>每堂約</dt>
                <dd>HK${pkg.perSession}</dd>
              </div>
              <div>
                <dt className="font-medium text-stone-800">有效期</dt>
                <dd>{pkg.validity}</dd>
              </div>
              <div>
                <dt className="font-medium text-stone-800">退款摘要</dt>
                <dd>{pkg.refundSummary}</dd>
              </div>
            </dl>
            <BookCta
              href={`/book?sku=${pkg.id}`}
              source="packages_ten"
              className="mt-5 inline-flex justify-center rounded-full bg-orange-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-700"
            />
          </article>
        ))}
      </div>

      <p className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-stone-700">
        本店自願冷靜期政策（如有）並非法定冷靜期。[待商戶]
        政府就預繳美容合約法定冷靜期仍在立法進程；本站不會自稱已有法定冷靜期。
      </p>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/prices"
          className="inline-flex rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium"
        >
          睇套票價目
        </Link>
        <Link href="/terms" className="text-sm text-orange-700 underline underline-offset-2">
          完整條款
        </Link>
      </div>
    </div>
  );
}
