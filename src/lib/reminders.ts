import { fmtHkd, resolveSku, type ReminderKind } from "./crm";
import { STORE_NAME, PHONE_DISPLAY } from "./site";

export type ReminderDraft = {
  draft_whatsapp: string;
  draft_email_subject: string;
  draft_email_body: string;
};

export function buildReminderDraft(input: {
  kind: ReminderKind;
  name: string;
  phone: string;
  serviceSku: string;
  date: string;
  time: string;
}): ReminderDraft {
  const svc = resolveSku(input.serviceSku);
  const svcName = svc?.nameZh ?? input.serviceSku;
  const price = svc ? fmtHkd(svc.priceHkd) : "";
  const when = `${input.date} ${input.time}`;
  const shop = STORE_NAME;

  const kindLabel =
    input.kind === "confirmation"
      ? "預約確認"
      : input.kind === "day-before"
        ? "前一日提醒"
        : "當日提醒";

  const draft_whatsapp =
    `【${shop}｜DEMO 草稿｜唔會自動傳送】\n` +
    `${input.name} 你好，呢度係「${kindLabel}」。\n` +
    `服務：${svcName}（${price}）\n` +
    `時段：${when}\n` +
    `如需改期請提前 24 小時 WhatsApp ${PHONE_DISPLAY}。\n` +
    `回覆 STOP 可停止非必要訊息（示範）。`;

  const draft_email_subject = `【${shop}】${kindLabel}：${svcName} @ ${when}（DEMO 草稿）`;

  const draft_email_body =
    `${input.name} 你好，\n\n` +
    `呢封係「${kindLabel}」電郵草稿，系統唔會自動寄出。\n\n` +
    `服務：${svcName}（${price}）\n` +
    `時段：${when}\n` +
    `聯絡電話：${PHONE_DISPLAY}\n\n` +
    `改期／取消請提前 24 小時聯絡我們。\n\n` +
    `——\n${shop}（本地 DEMO）\n`;

  return { draft_whatsapp, draft_email_subject, draft_email_body };
}
