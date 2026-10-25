"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function TrialTracker({ sku }: { sku: string }) {
  useEffect(() => {
    track("view_trial_landing", { sku });
  }, [sku]);
  return null;
}
