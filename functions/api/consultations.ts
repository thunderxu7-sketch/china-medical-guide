import { handleConsultation, type MailEnvironment } from "../../src/server/consultations/handler.ts";

export function onRequest(context: { request: Request; env: MailEnvironment }): Promise<Response> {
  return handleConsultation(context.request, context.env);
}
