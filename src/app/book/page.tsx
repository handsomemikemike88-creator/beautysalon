"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { track } from "@/lib/analytics";
import { useLang } from "@/lib/i18n";
import {
  BOOKABLE,
  DEPOSIT_EXPLAIN,
  RESCHEDULE_RULE,
  whatsappUrl,
} from "@/lib/site";

function addDays(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  // skip Sunday
  if (d.getDay() === 0) d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

const SLOT_OPTIONS = [
  { date: addDays(1), time: "11:30" },
  { date: addDays(1), time: "14:30" },
  { date: addDays(2), time: "10:00" },
  { date: addDays(2), time: "16:00" },
  { date: addDays(3), time: "13:00" },
].map((s) => ({
  ...s,
  label: `${s.date} ${s.time}`,
}));

function BookForm() {
  const { t } = useLang();
  const router = useRouter();
  const search = useSearchParams();
  const initialSku = search.get("sku") ?? BOOKABLE[0]?.sku ?? "hydrafacial-trial";
  const [sku, setSku] = useState(initialSku);
  const [slotIdx, setSlotIdx] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pics, setPics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    track("booking_started", { sku: initialSku });
  }, [initialSku]);

  useEffect(() => {
    if (BOOKABLE.some((s) => s.sku === initialSku)) setSku(initialSku);
  }, [initialSku]);

  const service = useMemo(
    () => BOOKABLE.find((x) => x.sku === sku),
    [sku],
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!pics) return;
    setLoading(true);
    setError("");
    const slot = SLOT_OPTIONS[slotIdx];
    track("booking_submitted", { sku, slot: slot.label, marketing });
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        email,
        sku,
        date: slot.date,
        time: slot.time,
        consentPics: true,
        marketingOptIn: marketing,
      }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "提交失敗");
      return;
    }
    const q = new URLSearchParams({
      sku,
      slot: slot.label,
      name,
      leadId: data.leadId || "",
    });
    router.push(`/booking/confirmed?${q.toString()}`);
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold text-stone-950">{t("book_title")}</h1>
        <p className="mt-2 text-sm text-stone-600">
          示範流程：提交後會寫入本地 DEMO 資料庫（Lead + 預約 + 提醒草稿），並跳去確認頁。服務只限標準菜單四項。
        </p>
      </header>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 text-sm">
        <h2 className="font-semibold text-stone-950">{t("book_deposit")}</h2>
        <p className="mt-2 text-stone-600">{DEPOSIT_EXPLAIN}</p>
        {service?.priceNum === 0 ? (
          <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
            你已揀免費體驗（HK$0）：訂金可能為 HK$0，實際規則 [待商戶規則]。
          </p>
        ) : null}
        <button
          type="button"
          disabled
          className="mt-3 cursor-not-allowed rounded-full bg-stone-200 px-4 py-2 text-xs text-stone-500"
        >
          稍後接 Stripe TEST（已停用）
        </button>
        <p className="mt-2 text-xs text-stone-500">FPS 訂金佔位：[待商戶]</p>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-sm">
        <h2 className="font-semibold text-stone-950">{t("book_reschedule")}</h2>
        <p className="mt-2 text-stone-700">{RESCHEDULE_RULE}</p>
      </section>

      <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-stone-200 bg-white p-5">
        <label className="block text-sm">
          <span className="font-medium">服務（標準菜單）</span>
          <select
            className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          >
            {BOOKABLE.map((s) => (
              <option key={s.sku} value={s.sku}>
                {s.nameZh} — HK${s.price}
              </option>
            ))}
          </select>
        </label>

        <fieldset>
          <legend className="text-sm font-medium">時段（示範）</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {SLOT_OPTIONS.map((s, i) => (
              <label
                key={s.label}
                className={`cursor-pointer rounded-xl border px-3 py-2 text-sm ${
                  slotIdx === i ? "border-orange-600 bg-orange-50" : "border-stone-200"
                }`}
              >
                <input
                  type="radio"
                  name="slot"
                  className="mr-2"
                  checked={slotIdx === i}
                  onChange={() => setSlotIdx(i)}
                />
                {s.label}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block text-sm">
          <span className="font-medium">稱呼（必填）</span>
          <input
            required
            className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium">手提電話／WhatsApp（必填）</span>
          <input
            required
            type="tel"
            inputMode="tel"
            className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2"
            placeholder="例：9123 4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium">電郵（選填）</span>
          <input
            type="email"
            className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>

        <label className="flex gap-2 text-sm">
          <input
            type="checkbox"
            required
            checked={pics}
            onChange={(e) => setPics(e.target.checked)}
            className="mt-1"
          />
          <span>
            {t("book_pics")}{" "}
            <a href="#pics" className="text-orange-700 underline">
              PICS
            </a>
          </span>
        </label>

        <label className="flex gap-2 text-sm">
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
            className="mt-1"
          />
          <span>{t("book_marketing")}</span>
        </label>

        <p className="text-xs text-stone-500">
          預約確認／提醒屬交易必要通訊，與市場推廣分開；未剔選推廣則只收確認／提醒。
        </p>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-orange-600 px-5 py-3 text-sm font-medium text-white hover:bg-orange-700 sm:w-auto disabled:opacity-50"
        >
          {loading ? "提交中…" : t("book_submit")}
        </button>
      </form>

      <section id="pics" className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-sm text-stone-600">
        <h2 className="font-semibold text-stone-950">
          收集個人資料聲明 PICS <span className="text-xs text-amber-700">[待商戶/法律確認]</span>
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>
            <strong>收集目的：</strong>處理、確認及提醒預約；處理改期／取消及訂金對帳。
          </li>
          <li>
            <strong>資料類別：</strong>稱呼、手提電話／WhatsApp、電郵（選填）、所選服務與時段。
            <strong> 本店不會經本表收集香港身份證號碼。</strong>
          </li>
          <li>
            <strong>直接促銷：</strong>只有另行剔選選填同意後才發送推廣；可隨時免費停止。
          </li>
          <li>
            <strong>查閱及更正：</strong>按《個人資料（私隱）條例》聯絡 [待商戶]。
          </li>
        </ol>
        <p className="mt-3">
          完整說明見{" "}
          <a href="/privacy" className="text-orange-700 underline">
            私隱政策
          </a>
          。
        </p>
      </section>

      <p className="text-sm text-stone-600">
        未能網上完成？{" "}
        <WhatsAppLink
          href={whatsappUrl(
            `你好，我想預約【${service?.nameZh ?? sku}】HK$${service?.price ?? ""}，希望時段：${SLOT_OPTIONS[slotIdx]?.label}`,
          )}
          className="font-medium text-emerald-800 underline"
        >
          WhatsApp 預約
        </WhatsAppLink>
      </p>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<p className="text-sm text-stone-500">載入預約表…</p>}>
      <BookForm />
    </Suspense>
  );
}
