"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Reminder = {
  id: string;
  kind: string;
  state: string;
  scheduled_for: string;
  draft_whatsapp: string;
  draft_email_subject: string;
  draft_email_body: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  service_sku: string;
  lead_id: string;
};

export default function RemindersPage() {
  const [rows, setRows] = useState<Reminder[]>([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch("/api/staff/reminders")
      .then(async (r) => {
        if (r.status === 401) {
          setError("請先登入");
          return;
        }
        const d = await r.json();
        setRows(d.reminders || []);
      })
      .catch(() => setError("載入失敗"));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function copyText(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
    await fetch(`/api/staff/reminders/${id}/copied`, { method: "POST" });
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
        <h1 className="text-2xl font-semibold">提醒草稿</h1>
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          WhatsApp／電郵只係草稿 · 系統唔會自動傳送 · 「已複製」只係本地狀態
        </p>
      </div>

      <div className="space-y-3">
        {rows.length === 0 ? (
          <p className="rounded-xl border bg-white p-6 text-sm text-stone-500">未有草稿</p>
        ) : (
          rows.map((r) => (
            <article
              key={r.id}
              className="rounded-2xl border border-stone-200 bg-white p-4 text-sm shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">
                    {r.name} · {r.kind}
                  </p>
                  <p className="text-xs text-stone-500">
                    {r.service_sku} @ {r.date} {r.time} · state: {r.state} · {r.phone}
                  </p>
                </div>
                <button
                  type="button"
                  className="text-xs text-orange-700 underline"
                  onClick={() => setOpen(open === r.id ? null : r.id)}
                >
                  {open === r.id ? "收起" : "睇草稿"}
                </button>
              </div>
              {open === r.id ? (
                <div className="mt-3 space-y-3 border-t pt-3">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-xs font-semibold text-stone-600">WhatsApp 草稿</p>
                      <button
                        type="button"
                        className="rounded-full border px-3 py-1 text-xs"
                        onClick={() => copyText(r.draft_whatsapp || "", r.id)}
                      >
                        複製 WhatsApp
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap rounded-xl bg-stone-50 p-3 text-xs">
                      {r.draft_whatsapp}
                    </pre>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-xs font-semibold text-stone-600">
                        Email：{r.draft_email_subject}
                      </p>
                      <button
                        type="button"
                        className="rounded-full border px-3 py-1 text-xs"
                        onClick={() =>
                          copyText(
                            `Subject: ${r.draft_email_subject}\n\n${r.draft_email_body}`,
                            r.id,
                          )
                        }
                      >
                        複製 Email
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap rounded-xl bg-stone-50 p-3 text-xs">
                      {r.draft_email_body}
                    </pre>
                  </div>
                  <Link
                    href={`/staff/leads?id=${r.lead_id}`}
                    className="text-xs text-orange-700 underline"
                  >
                    開客戶詳情
                  </Link>
                </div>
              ) : null}
            </article>
          ))
        )}
      </div>
    </div>
  );
}
