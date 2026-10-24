"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function StaffRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("DEMO-STAFF-2026");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/staff/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, inviteCode }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "註冊失敗");
      return;
    }
    router.push("/staff");
  }

  return (
    <div className="mx-auto max-w-md space-y-4 rounded-2xl border border-stone-200 bg-white p-6">
      <h1 className="text-xl font-semibold">員工註冊（DEMO）</h1>
      <p className="text-xs text-amber-800">
        本地示範：邀請碼預設 DEMO-STAFF-2026（見 .env.example）
      </p>
      <form onSubmit={onSubmit} className="space-y-3">
        <label className="block text-sm">
          名稱
          <input className="mt-1 w-full rounded-xl border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="block text-sm">
          電郵
          <input type="email" className="mt-1 w-full rounded-xl border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="block text-sm">
          密碼（≥10）
          <input type="password" className="mt-1 w-full rounded-xl border px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={10} />
        </label>
        <label className="block text-sm">
          邀請碼
          <input className="mt-1 w-full rounded-xl border px-3 py-2" value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} required />
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button type="submit" disabled={loading} className="w-full rounded-full bg-stone-950 py-2.5 text-sm text-amber-100">
          {loading ? "處理中…" : "註冊並登入"}
        </button>
      </form>
      <Link href="/staff/login" className="text-sm text-orange-700 underline">
        已有帳戶？登入
      </Link>
    </div>
  );
}
