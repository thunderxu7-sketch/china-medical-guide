import assert from "node:assert/strict";
import test from "node:test";
import { getServicePricing } from "../../data/service-details.ts";
import { getFaqGroups } from "./faq-content.ts";

function cataractAnswer(details) {
  const price = getServicePricing("cataract-treatment", details);
  const group = getFaqGroups(price).find((entry) => entry.id === "cost-payment");
  return { price, question: group.questions[0] };
}

test("FAQ uses the shared reference price, per-eye unit and reference source", () => {
  const { price, question } = cataractAnswer({
    referencePrice: { currency: "USD", minimum: 100, maximum: 200, unit: "eye" },
  });
  assert.ok(question.answer.includes(price.text));
  assert.ok(question.answer.includes("per eye"));
  assert.ok(question.links.some((link) => link.href === price.source));
});

test("a provider estimate takes precedence and carries no reference link", () => {
  const { price, question } = cataractAnswer({
    referencePrice: { currency: "USD", minimum: 100, maximum: 200, unit: "eye" },
    price: { currency: "USD", minimum: 120, maximum: 240, unit: "eye" },
  });
  assert.ok(question.answer.includes(price.text));
  assert.ok(question.answer.includes("provider estimate"));
  assert.equal(question.links.length, 1);
});

test("missing cost data sends the patient to the project enquiry path", () => {
  const { question } = cataractAnswer({});
  assert.ok(question.answer.includes("Request a quote"));
  assert.ok(
    question.links.some((link) => link.href === "/consultation?service=cataract-treatment"),
  );
  assert.doesNotMatch(question.answer, /\$\d/);
});
