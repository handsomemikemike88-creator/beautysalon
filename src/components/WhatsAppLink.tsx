"use client";

import { track } from "@/lib/analytics";
import type { ReactNode } from "react";

export function WhatsAppLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("click_whatsapp", { href })}
    >
      {children}
    </a>
  );
}
