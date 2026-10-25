"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CustomerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("customer@demo.local");
  const [password, setPassword] = useState("DemoCustomer123!");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/customer/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "登入失敗");
      return;
    }
    router.push("/account");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md space-y-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <h1 className="text-xl font-semibold">客戶登入（DEMO）</h1>
      <p className="text-xs text-stone-500">示範帳號已預填。</p>
      <form onSubmit={onSubmit} className="space-y-3">
        <label className="block text-sm">
          電郵
          <input
            className="mt-1 w-full rounded-xl border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </label>
        <label className="block text-sm">
          密碼
          <input
            type="password"
            className="mt-1 w-full rounded-xl border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-orange-600 py-2.5 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-50"
        >
          {loading ? "登入中…" : "登入"}
        </button>
      </form>
      <p className="text-sm text-stone-600">
        未有帳戶？{" "}
        <Link href="/account/register" className="text-orange-700 underline">
          註冊
        </Link>
      </p>
    </div>
  );
}
