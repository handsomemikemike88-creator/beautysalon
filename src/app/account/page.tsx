"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Booking = {
  id: string;
  service_sku: string;
  price_hkd: number;
  date: string;
  time: string;
  attendance: string;
  stage: string;
  payment_status: string;
  reminder_status: string;
};

type Customer = { id: string; name: string; email: string; phone: string | null };

export default function AccountPage() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/customer/me")
      .then(async (r) => {
        if (r.status === 401) {
          setError("請先登入");
          return;
        }
        const d = await r.json();
        setCustomer(d.customer);
        setBookings(d.bookings || []);
      })
      .catch(() => setError("載入失敗"));
  }, []);

  if (error) {
    return (
      <div className="rounded-xl border bg-white p-6">
        <p className="text-red-600">{error}</p>
        <Link href="/account/login" className="mt-3 inline-block text-orange-700 underline">
          去登入
        </Link>
      </div>
    );
  }

  if (!customer) {
    return <p className="text-sm text-stone-500">載入中…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">你好，{customer.name}</h1>
          <p className="text-sm text-stone-500">
            {customer.email}
            {customer.phone ? ` · ${customer.phone}` : ""}
          </p>
        </div>
        <button
          type="button"
          className="rounded-full border px-4 py-1.5 text-sm"
          onClick={() =>
            fetch("/api/customer/logout", { method: "POST" }).then(
              () => (location.href = "/account/login"),
            )
          }
        >
          登出
        </button>
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-4">
        <h2 className="font-semibold">我的預約</h2>
        {bookings.length === 0 ? (
          <p className="mt-3 text-sm text-stone-500">
            未有預約。{" "}
            <Link href="/book" className="text-orange-700 underline">
              去預約體驗
            </Link>
          </p>
        ) : (
          <ul className="mt-3 divide-y text-sm">
            {bookings.map((b) => (
              <li key={b.id} className="py-3">
                <p className="font-medium">
                  {b.date} {b.time} · {b.service_sku}
                </p>
                <p className="text-xs text-stone-500">
                  HK${Number(b.price_hkd).toLocaleString()} · 出席 {b.attendance} · CRM{" "}
                  {b.stage} · 付款 {b.payment_status} · 提醒 {b.reminder_status}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="text-xs text-stone-400">DEMO：此頁只顯示綁定帳戶或同電郵之預約。</p>
    </div>
  );
}
