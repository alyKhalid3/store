import { Webhooks } from "@polar-sh/nextjs";

// Polar → POST /api/webhook/polar
// Signature is verified by the handler (403 on bad signature).
//
// Delivery itself is done by Polar Benefits (GitHub repo invite / license key),
// so this handler is for your own side-effects: notifications, analytics, CRM.
export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,

  onOrderPaid: async (payload) => {
    const order = payload.data as unknown as {
      id: string;
      total_amount?: number;
      currency?: string;
      customer?: { email?: string };
      product?: { name?: string };
    };

    const line = `💰 New sale: ${order.product?.name ?? "product"} — ${
      order.total_amount != null ? (order.total_amount / 100).toFixed(2) : "?"
    } ${order.currency?.toUpperCase() ?? ""} (${order.customer?.email ?? "unknown"})`;

    console.log(line, { orderId: order.id });

    // Optional: ping yourself on Telegram when a sale happens.
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (token && chatId) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: line }),
      }).catch((err) => console.error("Telegram notify failed", err));
    }
  },

  onOrderRefunded: async (payload) => {
    console.log("↩️ Order refunded", { orderId: (payload.data as { id: string }).id });
    // Polar revokes benefits (repo access / license keys) automatically on refund.
  },
});
