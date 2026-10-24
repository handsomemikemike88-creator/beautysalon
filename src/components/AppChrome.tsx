"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";
  const bare = pathname.startsWith("/staff") || pathname.startsWith("/account");

  if (bare) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="mx-auto min-h-[60vh] max-w-5xl px-4 py-8">{children}</main>
      <Footer />
      <StickyWhatsApp />
    </>
  );
}
