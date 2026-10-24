import type { Metadata } from "next";
import "./globals.css";
import { AppChrome } from "@/components/AppChrome";
import { LangProvider } from "@/lib/i18n";
import { STORE_AREA, STORE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: `${STORE_NAME}｜${STORE_AREA}美容院｜單次明碼體驗預約`,
    template: `%s｜${STORE_NAME}`,
  },
  description:
    "香港獨立美容院：單次都可以，價錢網上睇到，唔硬銷。預約體驗、標準價目與套票。[待商戶地區] 本地 SEO 佔位。",
  openGraph: {
    title: `${STORE_NAME}｜單次 · 明碼 · 不硬銷`,
    description: "預約體驗｜睇套票價目｜WhatsApp 預約",
    locale: "zh_HK",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-HK">
      <body className="min-h-screen antialiased">
        <LangProvider>
          <AppChrome>{children}</AppChrome>
        </LangProvider>
      </body>
    </html>
  );
}
