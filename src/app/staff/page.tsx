"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Stats = {
  trialBookings: number;
  attendanceRate: number;
  packageConsultations: number;
  packageSales: number;
};

export default function StaffDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/staff/dashboard")
      .then(async (r) => {
        if (r.status === 401) {
          setError("請先登入");
          return;
        }
        const d = await r.json();
        setStats(d.stats);
      })
      .catch(() => setError("載入失敗"));
  }, []);

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

  const cards = [
    { label: "體驗預約數", value: stats?.trialBookings ?? "—" },
    { label: "出席率 (attended÷attended+no-show)", value: stats ? `${stats.attendanceRate}%` : "—" },
    { label: "套餐諮詢", value: stats?.packageConsultations ?? "—" },
    { label: "套餐成交 (Package Sold)", value: stats?.packageSales ?? "—" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">儀表板</h1>
          <p className="text-sm text-stone-500">樣本數據統計 · DEMO</p>
        </div>
        <button
          type="button"
          className="rounded-full border px-4 py-1.5 text-sm"
          onClick={() => fetch("/api/staff/logout", { method: "POST" }).then(() => (location.href = "/staff/login"))}
        >
          登出
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-xs text-stone-500">{c.label}</p>
            <p className="mt-2 text-3xl font-semibold text-orange-700">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/staff/pipeline" className="rounded-full bg-orange-600 px-4 py-2 text-white">
          打開 CRM 流程
        </Link>
        <Link href="/staff/calendar" className="rounded-full border px-4 py-2">
          預約日曆
        </Link>
        <Link href="/staff/reminders" className="rounded-full border px-4 py-2">
          提醒草稿
        </Link>
      </div>
    </div>
  );
}
