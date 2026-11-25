import type { FaqItem } from "@/lib/site";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-stone-950">常見問題</h2>
      <dl className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.q}
            className="rounded-2xl border border-stone-200 bg-white px-5 py-4 shadow-sm"
          >
            <dt className="font-medium text-stone-950">{item.q}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-stone-600">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
