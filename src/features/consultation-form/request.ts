import { consultationEndpoint } from "../../contracts/consultations.ts";
import type { ConsultationRequest, ConsultationResponse } from "../../contracts/consultations.ts";
import { services } from "../../data/services.ts";

export function preselectedService(search: string) {
  const slug = new URLSearchParams(search).get("service");
  return services.find((service) => service.slug === slug)?.slug ?? "";
}

type SubmissionResult = "accepted" | "busy" | "invalid_request" | "unavailable" | "delivery_failed";

export function createConsultationSender(send: typeof fetch = fetch) {
  let inFlight = false;
  let lastBody: string | undefined;
  let retryKey: string | undefined;

  return async (inquiry: ConsultationRequest): Promise<SubmissionResult> => {
    if (inFlight) return "busy";
    inFlight = true;

    try {
      const body = JSON.stringify(inquiry);
      if (body !== lastBody) {
        lastBody = body;
        retryKey = globalThis.crypto?.randomUUID?.();
      }

      const headers = new Headers({ "Content-Type": "application/json", Accept: "application/json" });
      if (retryKey) headers.set("Idempotency-Key", retryKey);
      const response = await send(consultationEndpoint, {
        method: "POST",
        headers,
        body,
        signal: AbortSignal.timeout(15000),
      });
      const reply: ConsultationResponse = await response.json();
      if (response.status === 200 && reply?.ok === true) {
        lastBody = undefined;
        retryKey = undefined;
        return "accepted";
      }
      if (reply?.ok === false) {
        if (response.status === 400 && reply.error === "invalid_request") return "invalid_request";
        if (response.status === 503 && reply.error === "unavailable") return "unavailable";
      }
    } catch {
      // A lost response can follow an accepted request. Keep the key for an unchanged retry.
    } finally {
      inFlight = false;
    }
    return "delivery_failed";
  };
}
