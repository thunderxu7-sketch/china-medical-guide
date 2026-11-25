import type { ConsultationResponse } from "../../contracts/consultations.ts";
import { readConsultation } from "./input.ts";
import { createMailSender, type MailSender } from "./mail.ts";

export interface MailEnvironment {
  INQUIRY_FROM?: string;
  INQUIRY_TO?: string;
  MAIL_API_KEY?: string;
}

const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;

function result(body: ConsultationResponse, status: number, headers?: Record<string, string>): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export async function handleConsultation(
  request: Request,
  env: MailEnvironment,
  send: MailSender = createMailSender(),
): Promise<Response> {
  if (request.method !== "POST") {
    return result({ ok: false, error: "method_not_allowed" }, 405, { Allow: "POST" });
  }

  const origin = request.headers.get("Origin");
  const retryKey = request.headers.get("Idempotency-Key");
  if ((origin !== null && origin !== new URL(request.url).origin) || (retryKey !== null && !uuid.test(retryKey))) {
    return result({ ok: false, error: "invalid_request" }, 400);
  }
  const inquiry = await readConsultation(request);
  if (!inquiry) return result({ ok: false, error: "invalid_request" }, 400);

  const from = env.INQUIRY_FROM?.trim();
  const to = env.INQUIRY_TO?.trim();
  const apiKey = env.MAIL_API_KEY?.trim();
  if (!from || !to || !apiKey) return result({ ok: false, error: "unavailable" }, 503);

  const text = [
    `Service: ${inquiry.serviceName}`,
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    `Country: ${inquiry.country}`,
  ];
  if (inquiry.message) text.push("", "Visitor message", inquiry.message);

  try {
    const mail = {
      from,
      to: [to],
      reply_to: inquiry.email,
      subject: `Consultation request – ${inquiry.serviceName}`,
      text: text.join("\n"),
    };
    await send(mail, apiKey, retryKey);
    return result({ ok: true }, 200);
  } catch {
    return result({ ok: false, error: "delivery_failed" }, 502);
  }
}
