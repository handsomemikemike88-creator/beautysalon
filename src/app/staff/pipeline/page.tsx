"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

const STAGES = [
  "New Trial Lead",
  "Reminder Sent",
  "Confirmed",
  "Attended",
  "Package Consultation",
  "Package Sold",
  "Lost",
] as const;

type Lead = {
  id: string;
  name: string;
  phone: string;
  service_sku: string;
  price_hkd: number;
  stage: string;
  payment_status: string;
  reminder_status: string;
  booking_date?: string;
  booking_time?: string;
  attendance?: string;
  is_sample?: number;
};

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch("/api/staff/leads")
      .then(async (r) => {
        if (r.status === 401) {
          setError("請先登入");
          return;
        }
        const d = await r.json();
        setLeads(d.leads || []);
      })
      .catch(() => setError("載入失敗"));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const byStage = useMemo(() => {
    const map: Record<string, Lead[]> = {};
    for (const s of STAGES) map[s] = [];
    for (const l of leads) {
      const key = STAGES.includes(l.stage as (typeof STAGES)[number])
        ? l.stage
        : "New Trial Lead";
      map[key].push(l);
    }
    return map;
  }, [leads]);

  async function move(id: string, stage: string) {
    setBusy(id);
    const res = await fetch(`/api/staff/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage }),
    });
    setBusy(null);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      alert(d.error || "更新失敗");
      return;
    }
    load();
  }

  if (error) {
    return (
      <div className="rounded-xl border bg-white p-6">
        <p className="text-red-600">{error}</p>
        <Link href="/staff/login" className="mt-3 inline-block text-orange-700 underline">
          去登入
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">CRM 流程</h1>
        <p className="text-sm text-stone-500">
          固定階段 · 樣本／本地預約 · 可改 stage
        </p>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-4">
        {STAGES.map((stage) => (
          <div
            key={stage}
            className="w-64 shrink-0 rounded-2xl border border-stone-200 bg-stone-50"
          >
            <div className="border-b border-stone-200 px-3 py-2">
              <p className="text-xs font-semibold text-stone-700">{stage}</p>
              <p className="text-[10px] text-stone-400">{byStage[stage]?.length || 0} 單</p>
            </div>
            <div className="max-h-[70vh] space-y-2 overflow-y-auto p-2">
              {(byStage[stage] || []).map((l) => (
                <div
                  key={l.id}
                  className="rounded-xl border border-stone-200 bg-white p-3 text-xs shadow-sm"
                >
                  <p className="font-medium text-stone-900">
                    {l.name}
                    {l.is_sample ? (
                      <span className="ml-1 text-[10px] text-amber-700">樣本</span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-stone-500">
                    {l.service_sku} · HK${Number(l.price_hkd).toLocaleString()}
                  </p>
                  <p className="text-stone-500">
                    {l.booking_date || "—"} {l.booking_time || ""} · {l.attendance || "—"}
                  </p>
                  <p className="text-stone-400">
                    付款 {l.payment_status} · 提醒 {l.reminder_status}
                  </p>
                  <label className="mt-2 block text-[10px] text-stone-500">
                    移至
                    <select
                      className="mt-0.5 w-full rounded border px-1 py-1 text-xs"
                      value={l.stage}
                      disabled={busy === l.id}
                      onChange={(e) => move(l.id, e.target.value)}
                    >
                      {STAGES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>
                  <Link
                    href={`/staff/leads?id=${l.id}`}
                    className="mt-2 inline-block text-orange-700 underline"
                  >
                    詳情
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
