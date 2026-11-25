interface InquiryEmail {
  from: string;
  to: string[];
  reply_to: string;
  subject: string;
  text: string;
}

export type MailSender = (mail: InquiryEmail, apiKey: string, retryKey: string | null) => Promise<void>;

export function createMailSender(fetcher: typeof fetch = fetch, timeoutMs = 8000): MailSender {
  return async (mail, apiKey, retryKey) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const headers = new Headers({
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "ChinaMedicalGuide/1.0",
      });
      if (retryKey) headers.set("Idempotency-Key", `consultation/${retryKey}`);
      const response = await fetcher("https://api.resend.com/emails", {
        method: "POST",
        headers,
        body: JSON.stringify(mail),
        signal: controller.signal,
        redirect: "error",
      });
      if (!response.ok) throw new Error("Email provider rejected the inquiry.");
    } finally {
      clearTimeout(timer);
    }
  };
}
