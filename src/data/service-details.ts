import type { ServiceSlug } from "./services";

export interface ServiceDetails {
  summary?: string;
  price?: {
    currency: "USD";
    minimum: number;
    maximum?: number;
    unit: "procedure" | "eye" | "session" | "month" | "program";
  };
  stayInChina?: string;
  recovery?: string;
}

export const serviceDetails: Partial<Record<ServiceSlug, ServiceDetails>> = {};
