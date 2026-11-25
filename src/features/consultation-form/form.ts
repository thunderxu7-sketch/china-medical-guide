import type { ConsultationRequest } from "../../contracts/consultations";
import { services } from "../../data/services";
import { createConsultationSender, preselectedService } from "./request";

const form = document.querySelector<HTMLFormElement>("#consultation-form")!;
const fields = form.querySelector("fieldset")!;
const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
const feedback = form.querySelector<HTMLParagraphElement>("[data-feedback]")!;
const alternateContact = form.querySelector<HTMLParagraphElement>("[data-alternate-contact]");
const serviceSelect = form.querySelector<HTMLSelectElement>('[name="service"]')!;
const send = createConsultationSender();

const messages = {
  accepted: "Your inquiry has been submitted. The team can reply to the email address you provided.",
  invalid_request: "Please check your contact details and selected service, then try again.",
  unavailable: "Email inquiries are temporarily unavailable. Your entries are still here for a later retry.",
  delivery_failed: "We couldn’t confirm delivery. Your entries are still here. Please try again.",
};

serviceSelect.value = preselectedService(window.location.search);
submit.disabled = false;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (fields.disabled || !form.reportValidity()) return;

  const values = new FormData(form);
  const value = (name: string) => String(values.get(name) ?? "").trim();
  const service = services.find((entry) => entry.slug === value("service"));
  if (!service) {
    serviceSelect.focus();
    return;
  }
  const inquiry: ConsultationRequest = {
    name: value("name"),
    email: value("email"),
    phone: value("phone"),
    country: value("country"),
    service: service.slug,
  };
  const message = value("message");
  if (message) inquiry.message = message;

  fields.disabled = true;
  form.setAttribute("aria-busy", "true");
  submit.textContent = "Sending…";
  feedback.textContent = "";
  delete feedback.dataset.state;
  if (alternateContact) alternateContact.hidden = true;
  try {
    const result = await send(inquiry);
    if (result === "busy") return;
    feedback.textContent = messages[result];
    feedback.dataset.state = result === "accepted" ? "success" : "error";
    if (result === "accepted") form.reset();
    else if (alternateContact) alternateContact.hidden = false;
  } finally {
    fields.disabled = false;
    form.removeAttribute("aria-busy");
    submit.textContent = "Send consultation request";
  }
});
