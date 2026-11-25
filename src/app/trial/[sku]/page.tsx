import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { TRIAL_TO_SERVICE_PATH } from "@/lib/site";

type Props = { params: Promise<{ sku: string }> };

export async function generateStaticParams() {
  return Object.keys(TRIAL_TO_SERVICE_PATH).map((sku) => ({ sku }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sku } = await params;
  const dest = TRIAL_TO_SERVICE_PATH[sku];
  if (!dest) return { title: "體驗" };
  return { robots: { index: false, follow: true } };
}

export default async function TrialPage({ params }: Props) {
  const { sku } = await params;
  const dest = TRIAL_TO_SERVICE_PATH[sku];
  if (dest) redirect(dest);
  notFound();
}
