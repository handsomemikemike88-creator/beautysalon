"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Booking = {
  id: string;
  lead_id: string;
  name: string;
  phone: string;
  service_sku: string;
  price_hkd: number;
  date: string;
  time: string;
  attendance: string;
  stage: string;
  payment_status: string;
  reminder_status: string;
};

function addDays(iso: string, n: number) {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export default function CalendarPage() {
  const today = new Date().toISOString().slice(0, 10);
  const [from, setFrom] = useState(addDays(today, -7));
  const [to, setTo] = useState(addDays(today, 14));
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    fetch(`/api/staff/calendar?from=${from}&to=${to}`)
      .then(async (r) => {
        if (r.status === 401) {
          setError("請先登入");
          return;
        }
        const d = await r.json();
        setBookings(d.bookings || []);
      })
      .catch(() => setError("載入失敗"));
  }, [from, to]);

  useEffect(() => {
    load();
  }, [load]);

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

  const byDate: Record<string, Booking[]> = {};
  for (const b of bookings) {
    (byDate[b.date] ||= []).push(b);
  }
  const dates = Object.keys(byDate).sort();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">預約日曆</h1>
          <p className="text-sm text-stone-500">按日期／時段 · 樣本＋本地預約</p>
        </div>
        <div className="flex flex-wrap items-end gap-2 text-sm">
          <label>
            由
            <input
              type="date"
              className="ml-1 rounded border px-2 py-1"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </label>
          <label>
            至
            <input
              type="date"
              className="ml-1 rounded border px-2 py-1"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </label>
          <button
            type="button"
            onClick={load}
            className="rounded-full bg-orange-600 px-3 py-1.5 text-white"
          >
            重新整理
          </button>
        </div>
      </div>

      {dates.length === 0 ? (
        <p className="rounded-xl border bg-white p-6 text-sm text-stone-500">此範圍無預約</p>
      ) : (
        <div className="space-y-4">
          {dates.map((date) => (
            <section key={date} className="rounded-2xl border border-stone-200 bg-white p-4">
              <h2 className="mb-3 text-sm font-semibold text-stone-800">
                {date}
                {date === today ? (
                  <span className="ml-2 text-xs font-normal text-orange-700">今日</span>
                ) : null}
              </h2>
              <ul className="divide-y divide-stone-100">
                {(byDate[date] || []).map((b) => (
                  <li key={b.id} className="flex flex-wrap items-start justify-between gap-2 py-3 text-sm">
                    <div>
                      <p className="font-medium">
                        {b.time} · {b.name}
                      </p>
                      <p className="text-xs text-stone-500">
                        {b.service_sku} · HK${Number(b.price_hkd).toLocaleString()} · {b.phone}
                      </p>
                      <p className="text-xs text-stone-400">
                        出席 {b.attendance} · CRM {b.stage} · 付款 {b.payment_status} · 提醒{" "}
                        {b.reminder_status}
                      </p>
                    </div>
                    <Link
                      href={`/staff/leads?id=${b.lead_id}`}
                      className="text-xs text-orange-700 underline"
                    >
                      客戶詳情
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
