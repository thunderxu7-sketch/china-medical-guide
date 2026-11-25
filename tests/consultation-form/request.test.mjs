import assert from "node:assert/strict";
import { test } from "node:test";
import { preselectedService, createConsultationSender } from "../../src/features/consultation-form/request.ts";
import { services } from "../../src/data/services.ts";

const inquiry = {
  name: "Example Visitor",
  email: "visitor@example.test",
  phone: "+1 202 555 0142",
  country: "Canada",
  service: "cataract-treatment",
};

test("a valid service URL preselects every catalog entry", () => {
  assert.equal(services.length, 14);
  for (const { slug } of services) assert.equal(preselectedService(`?service=${slug}`), slug);
  assert.equal(preselectedService(""), "");
  assert.equal(preselectedService("?service=unknown"), "");
});

test("the request posts the inquiry as JSON to the same-origin endpoint", async () => {
  const submit = createConsultationSender(async (url, options) => {
    assert.equal(url, "/api/consultations");
    assert.equal(options.method, "POST");
    assert.equal(options.headers.get("Content-Type"), "application/json");
    assert.deepEqual(JSON.parse(options.body), inquiry);
    return Response.json({ ok: true });
  });
  assert.equal(await submit(inquiry), "accepted");
});

test("only one submission runs while the mail service responds", async () => {
  let release;
  let count = 0;
  const submit = createConsultationSender(() => {
    count += 1;
    return new Promise((resolve) => { release = resolve; });
  });
  const pending = submit(inquiry);
  assert.equal(await submit(inquiry), "busy");
  assert.equal(count, 1);
  release(Response.json({ ok: true }));
  assert.equal(await pending, "accepted");
});

test("an unchanged retry keeps its key after a lost response, and edits or acceptance start a new inquiry", async () => {
  const keys = [];
  const submit = createConsultationSender(async (_url, init) => {
    keys.push(init.headers.get("Idempotency-Key"));
    if (keys.length === 1) throw new TypeError("Connection closed");
    if (keys.length === 2) return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    return Response.json({ ok: true });
  });
  assert.equal(await submit(inquiry), "delivery_failed");
  assert.equal(await submit(inquiry), "delivery_failed");
  const updated = { ...inquiry, message: "Please confirm the estimated length of stay." };
  assert.equal(await submit(updated), "accepted");
  assert.equal(await submit(updated), "accepted");
  assert.match(keys[0], /^[a-f\d-]{36}$/i);
  assert.equal(keys[0], keys[1]);
  assert.notEqual(keys[1], keys[2]);
  assert.notEqual(keys[2], keys[3]);
});

test("validation and configuration failures have distinct states; malformed replies cannot signal success", async () => {
  for (const [reply, expected] of [
    [Response.json({ ok: false, error: "invalid_request" }, { status: 400 }), "invalid_request"],
    [Response.json({ ok: false, error: "unavailable" }, { status: 503 }), "unavailable"],
    [Response.json({ ok: true }, { status: 502 }), "delivery_failed"],
    [new Response("<html>Preview</html>"), "delivery_failed"],
    [Response.json(null), "delivery_failed"],
  ]) {
    assert.equal(await createConsultationSender(async () => reply)(inquiry), expected);
  }
});
