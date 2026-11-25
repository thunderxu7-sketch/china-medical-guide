import type { ServiceSlug } from "../data/services";

export const consultationEndpoint = "/api/consultations";

export interface ConsultationRequest {
  name: string;
  email: string;
  phone: string;
  country: string;
  service: ServiceSlug;
  message?: string;
}

export type ConsultationResponse =
  | { ok: true }
  | { ok: false; error: "invalid_request" | "method_not_allowed" | "delivery_failed" | "unavailable" };
