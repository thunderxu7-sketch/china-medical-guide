import { services } from "../../data/services.ts";
import type { ConsultationRequest } from "../../contracts/consultations.ts";

const maxBodyBytes = 32 * 1024;
const emailAddress = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;
const singleLineControls = /[\u0000-\u001f\u007f]/u;
const messageControls = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u;

function shortText(value: unknown, limit: number): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text.length > 0 && text.length <= limit && !singleLineControls.test(text) ? text : null;
}

async function readJson(request: Request): Promise<unknown> {
  if (!request.body || Number(request.headers.get("Content-Length")) > maxBodyBytes) return null;

  // Bound streamed bodies too. A visitor may omit Content-Length.
  const reader = request.body.getReader();
  const bytes = new Uint8Array(maxBodyBytes);
  let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (length + value.byteLength > maxBodyBytes) {
        await reader.cancel();
        return null;
      }
      bytes.set(value, length);
      length += value.byteLength;
    }
    const json = new TextDecoder("utf-8", { fatal: true }).decode(bytes.subarray(0, length));
    return JSON.parse(json);
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

export async function readConsultation(
  request: Request,
): Promise<(ConsultationRequest & { serviceName: string }) | null> {
  const contentType = request.headers.get("Content-Type")?.split(";")[0]?.trim().toLowerCase();
  if (contentType !== "application/json") return null;

  const json = await readJson(request);
  if (json === null || typeof json !== "object" || Array.isArray(json)) return null;
  const data = json as Record<string, unknown>;
  const name = shortText(data.name, 120);
  const email = shortText(data.email, 254);
  const phone = shortText(data.phone, 64);
  const country = shortText(data.country, 120);
  const service = services.find((entry) => entry.slug === data.service);
  const message = data.message === undefined ? "" : data.message;

  if (!name || !email || !emailAddress.test(email) || !phone || !country || !service) return null;
  if (typeof message !== "string" || message.length > 4000 || messageControls.test(message)) return null;
  return { name, email, phone, country, service: service.slug, serviceName: service.name, message: message.trim() };
}
