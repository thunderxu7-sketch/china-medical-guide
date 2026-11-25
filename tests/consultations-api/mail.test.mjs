import assert from "node:assert/strict";
import test from "node:test";
import { onRequest } from "../../functions/api/consultations.ts";
import { handleConsultation } from "../../src/server/consultations/handler.ts";
import { createMailSender } from "../../src/server/consultations/mail.ts";

const env = {
  INQUIRY_FROM: "Guide <guide@example.test>",
  INQUIRY_TO: "intake@example.test",
  MAIL_API_KEY: "mock-mail-key",
};
const visitor = {
  name: "Example Visitor",
  email: "visitor@example.test",
  phone: "+1 202 555 0142",
  country: "Canada",
  service: "cataract-treatment",
  message: "Is the quote per eye?\nThank you.",
};
const url = "https://guide.example.test/api/consultations";
const request = (body, headers) => new Request(url, {
  method: "POST",
  headers: { "Content-Type": "application/json", ...headers },
  body: typeof body === "string" ? body : JSON.stringify(body),
});

async function expectResult(response, status, body) {
  assert.equal(response.status, status);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.match(response.headers.get("Content-Type"), /application\/json/);
  assert.deepEqual(await response.json(), body);
}

test("one valid inquiry uses fixed recipients, visitor reply address and a readable service", async () => {
  const calls = [];
  const sender = createMailSender(async (url, options) => {
    calls.push({ url, ...options });
    return Response.json({ id: "test-accepted" });
  });
  const retryKey = "62500218-ccc2-4f30-aa12-b75ab5edcdad";
  const fields = { ...visitor, name: "  Example Visitor  ", from: "irrelevant@example.test", to: "elsewhere@example.test" };
  const response = await handleConsultation(request(fields, {
    "Idempotency-Key": retryKey,
    Origin: "https://guide.example.test",
    "Content-Type": "application/json; charset=utf-8",
  }), env, sender);
  await expectResult(response, 200, { ok: true });
  assert.equal(calls.length, 1);
  const [call] = calls;
  assert.equal(call.url, "https://api.resend.com/emails");
  assert.equal(call.method, "POST");
  assert.equal(call.headers.get("Authorization"), "Bearer mock-mail-key");
  assert.equal(call.headers.get("Idempotency-Key"), `consultation/${retryKey}`);
  assert.ok(call.headers.get("User-Agent"));
  const mail = JSON.parse(call.body);
  assert.deepEqual(mail.to, [env.INQUIRY_TO]);
  assert.equal(mail.from, env.INQUIRY_FROM);
  assert.equal(mail.reply_to, visitor.email);
  assert.match(mail.subject, /Cataract Treatment/);
  assert.ok(mail.text.includes("Name: Example Visitor\n"));
  assert.ok(mail.text.includes(visitor.message));
  assert.equal(mail.html, undefined);
});

test("accepts a valid service without a message or retry key", async () => {
  const { message, ...fields } = visitor;
  let sent = false;
  const response = await handleConsultation(request({ ...fields, service: "fracture-treatment" }), env, async (mail, _key, retryKey) => {
    sent = true;
    assert.equal(retryKey, null);
    assert.match(mail.subject, /Non-Surgical Fracture Treatment/);
    assert.equal(mail.text.includes("Visitor message"), false);
  });
  await expectResult(response, 200, { ok: true });
  assert.equal(sent, true);
});

test("rejects unsupported input before invoking the transport", async () => {
  const invalid = [
    request("{"),
    request("null"),
    request([]),
    request({ ...visitor, name: "   " }),
    request({ ...visitor, email: "one@example.test,two@example.test" }),
    request({ ...visitor, phone: 42 }),
    request({ ...visitor, country: "Canada\r\nOther" }),
    request({ ...visitor, service: "bad-slug" }),
    request({ ...visitor, message: {} }),
    request({ ...visitor, message: "x".repeat(4001) }),
    request(visitor, { "Content-Type": "text/plain" }),
    request(visitor, { Origin: "https://another.example.test" }),
    request(visitor, { "Idempotency-Key": "invalid" }),
    request(visitor, { "Content-Length": "40000" }),
    request(JSON.stringify(visitor) + " ".repeat(33000)),
    ...["name", "email", "phone", "country", "service"].map(key => {
      const fields = { ...visitor };
      delete fields[key];
      return request(fields);
    }),
  ];
  let calls = 0;
  for (const req of invalid) {
    await expectResult(await handleConsultation(req, env, async () => { calls++; }), 400, {
      ok: false, error: "invalid_request",
    });
  }
  assert.equal(calls, 0);
});

test("the Pages entry rejects other HTTP methods and signals missing runtime configuration", async () => {
  const response = await onRequest({ request: new Request(url), env: {} });
  assert.equal(response.headers.get("Allow"), "POST");
  await expectResult(response, 405, { ok: false, error: "method_not_allowed" });
  for (const key of Object.keys(env)) {
    await expectResult(await onRequest({ request: request(visitor), env: { ...env, [key]: " " } }), 503, {
      ok: false, error: "unavailable",
    });
  }
});

test("provider rejection and network errors return the same public failure", async () => {
  for (const fetcher of [
    async () => new Response("Provider-only diagnostic", { status: 429 }),
    async () => { throw new Error("Provider-only diagnostic"); },
  ]) {
    const failed = await handleConsultation(request(visitor), env, createMailSender(fetcher));
    await expectResult(failed, 502, { ok: false, error: "delivery_failed" });
  }
});

test("a slow provider is aborted and the caller receives 502", async () => {
  let aborted = false;
  const waitForAbort = (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => {
      aborted = true;
      reject(new Error("Timeout"));
    }, { once: true });
  });
  const response = await handleConsultation(request(visitor), env, createMailSender(waitForAbort, 10));
  await expectResult(response, 502, { ok: false, error: "delivery_failed" });
  assert.equal(aborted, true);
});
