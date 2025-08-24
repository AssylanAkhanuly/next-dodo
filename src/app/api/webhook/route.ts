import { WebhookPayload } from "dodopayments/resources.mjs";
import { NextRequest, NextResponse } from "next/server";

import { Webhook } from "standardwebhooks";

const webhook = new Webhook(process.env.DODO_PAYMENTS_WEBHOOK_KEY);
export const POST = async (request: NextRequest) => {
  try {
    const rawBody = await request.text();
    const webhookHeaders = {
      "webhook-id": request.headers.get("webhook-id") || "",
      "webhook-timestamp": request.headers.get("webhook-timestamp") || "",
      "webhook-signature": request.headers.get("webhook-signature") || "",
    };
    console.log(process.env.DODO_PAYMENTS_WEBHOOK_KEY,webhookHeaders)
    await webhook.verify(rawBody, webhookHeaders);
    const payload = JSON.parse(rawBody) as WebhookPayload;
    
  } catch (e) {
    console.log(e)
    return NextResponse.json(e, { status: 403 });
  }
};
