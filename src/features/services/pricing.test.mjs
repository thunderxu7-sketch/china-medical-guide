import test from "node:test";
import assert from "node:assert/strict";
import { formatServicePrice, getServicePricing, serviceDetails } from "../../data/service-details.ts";
import { services } from "../../data/services.ts";

test("every service in the consultation catalog has a detail page record", () => {
  assert.deepEqual(Object.keys(serviceDetails).sort(), services.map(({ slug }) => slug).sort());
});

test("published prices retain their unit and link to the underlying service", () => {
  for (const [slug, unit] of [
    ["cataract-treatment", "eye"],
    ["remote-consultation", "session"],
    ["herbal-medicine-delivery", "month"],
  ]) {
    const pricing = getServicePricing(slug);
    assert.equal(pricing.label, "Published reference");
    assert.ok(pricing.text.endsWith(` per ${unit}`));
    assert.equal(pricing.source, `https://cndocteam.com/services/${slug}`);
  }
});

test("an operator estimate supersedes an external reference", () => {
  const pricing = getServicePricing("cataract-treatment", {
    referencePrice: { currency: "USD", minimum: 2000, maximum: 3000, unit: "eye" },
    price: { currency: "USD", minimum: 250.5, maximum: 250.5, unit: "eye" },
  });
  assert.equal(pricing.text, "$250.5 per eye");
  assert.equal(pricing.label, "Provider estimate");
  assert.equal(pricing.source, undefined);
});

test("missing and open-ended fees keep the quote route intelligible", () => {
  assert.equal(getServicePricing("cataract-treatment", {}).text, "Request a quote");
  assert.equal(formatServicePrice({ currency: "USD", minimum: 80, unit: "session" }), "From $80 per session");
});

test("an unspecified unit stays explicit on orthopedic reference estimates", () => {
  assert.equal(getServicePricing("fracture-treatment").text, "$3,000–$7,000 (unit to confirm)");
  assert.equal(getServicePricing("sports-injury").text, "$4,000–$10,000 (unit to confirm)");
  assert.match(getServicePricing("fracture-treatment").shortText, /unit to confirm/);
  assert.match(getServicePricing("sports-injury").shortText, /unit to confirm/);
});
