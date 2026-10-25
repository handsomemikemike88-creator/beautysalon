"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

const STAGES = [
  "New Trial Lead",
  "Reminder Sent",
  "Confirmed",
  "Attended",
  "Package Consultation",
  "Package Sold",
  "Lost",
];
const ATTENDANCE = ["booked", "attended", "no-show", "cancelled"];
const PAYMENT = ["unpaid", "paid", "waived", "demo", "refunded"];

type Lead = Record<string, unknown>;
type Note = { id: number; at: string; by_name: string; text: string };

function LeadsInner() {
  const sp = useSearchParams();
  const focusId = sp.get("id");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState("");
  const [noteText, setNoteText] = useState("");
  const [saving, setSaving] = useState(false);

  const loadList = useCallback(() => {
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

  const loadOne = useCallback((id: string) => {
    fetch(`/api/staff/leads/${id}`)
      .then(async (r) => {
        if (!r.ok) return;
        const d = await r.json();
        setSelected(d.lead);
        setNotes(d.notes || []);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadList();
  }, [loadList]);

  useEffect(() => {
    if (focusId) loadOne(focusId);
  }, [focusId, loadOne]);

  async function patch(body: Record<string, unknown>) {
    if (!selected?.id) return;
    setSaving(true);
    const res = await fetch(`/api/staff/leads/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      alert(d.error || "更新失敗");
      return;
    }
    const d = await res.json();
    setSelected(d.lead);
    setNotes(d.notes || []);
    setNoteText("");
    loadList();
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
    <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
      <section className="rounded-2xl border border-stone-200 bg-white">
        <div className="border-b px-4 py-3">
          <h1 className="text-lg font-semibold">客戶／Lead 資料庫</h1>
          <p className="text-xs text-stone-500">{leads.length} 筆</p>
        </div>
        <ul className="max-h-[75vh] divide-y overflow-y-auto text-sm">
          {leads.map((l) => (
            <li key={String(l.id)}>
              <button
                type="button"
                className={`w-full px-4 py-3 text-left hover:bg-orange-50 ${
                  selected?.id === l.id ? "bg-orange-50" : ""
                }`}
                onClick={() => loadOne(String(l.id))}
              >
                <p className="font-medium">
                  {String(l.name)}
                  {l.is_sample ? (
                    <span className="ml-1 text-[10px] text-amber-700">樣本</span>
                  ) : null}
                </p>
                <p className="text-xs text-stone-500">
                  {String(l.service_sku)} · HK$
                  {Number(l.price_hkd).toLocaleString()} · {String(l.stage)}
                </p>
                <p className="text-xs text-stone-400">
                  {String(l.booking_date || "—")} {String(l.booking_time || "")} ·{" "}
                  {String(l.attendance || "—")}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-4">
        {!selected ? (
          <p className="text-sm text-stone-500">揀左邊一筆睇詳情／改 CRM</p>
        ) : (
          <div className="space-y-4 text-sm">
            <div>
              <h2 className="text-lg font-semibold">{String(selected.name)}</h2>
              <p className="text-xs text-stone-500">ID {String(selected.id)}</p>
              <p className="mt-1 text-stone-600">
                {String(selected.phone)} · {String(selected.email || "無電郵")}
              </p>
              <p className="text-stone-600">
                {String(selected.service_sku)} · HK$
                {Number(selected.price_hkd).toLocaleString()} ·{" "}
                {String(selected.booking_date)} {String(selected.booking_time)}
              </p>
            </div>

            <label className="block">
              CRM stage
              <select
                className="mt-1 w-full rounded-xl border px-3 py-2"
                value={String(selected.stage)}
                disabled={saving}
                onChange={(e) => patch({ stage: e.target.value })}
              >
                {STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              Attendance
              <select
                className="mt-1 w-full rounded-xl border px-3 py-2"
                value={String(selected.attendance || "booked")}
                disabled={saving}
                onChange={(e) => patch({ attendance: e.target.value })}
              >
                {ATTENDANCE.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              Payment status
              <select
                className="mt-1 w-full rounded-xl border px-3 py-2"
                value={String(selected.payment_status)}
                disabled={saving}
                onChange={(e) => patch({ payment_status: e.target.value })}
              >
                {PAYMENT.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <p className="text-xs text-stone-500">
              Reminder status（彙總）：{String(selected.reminder_status)}
            </p>

            <div>
              <label className="block">
                員工備註（追加）
                <textarea
                  className="mt-1 w-full rounded-xl border px-3 py-2"
                  rows={3}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
              </label>
              <button
                type="button"
                disabled={saving || !noteText.trim()}
                className="mt-2 rounded-full bg-stone-900 px-4 py-2 text-xs text-amber-50 disabled:opacity-50"
                onClick={() => patch({ staff_note: noteText })}
              >
                儲存備註
              </button>
            </div>

            <div>
              <h3 className="font-medium">備註紀錄</h3>
              <ul className="mt-2 max-h-48 space-y-2 overflow-y-auto">
                {notes.length === 0 ? (
                  <li className="text-xs text-stone-400">未有備註</li>
                ) : (
                  notes.map((n) => (
                    <li key={n.id} className="rounded-lg bg-stone-50 p-2 text-xs">
                      <p className="text-stone-400">
                        {n.at} · {n.by_name}
                      </p>
                      <p className="mt-0.5 whitespace-pre-wrap text-stone-700">{n.text}</p>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default function LeadsPage() {
  return (
    <Suspense fallback={<p className="text-sm text-stone-500">載入中…</p>}>
      <LeadsInner />
    </Suspense>
  );
}
