import { NextResponse } from "next/server";

// Contact form endpoint. Validates and (for now) logs the submission server-side.
// TODO: wire to a real email/transport (Resend, Nodemailer, or a form service)
// and, when Sanity is connected, optionally store submissions as a document.
export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const firstName = String(data.firstName ?? "").trim();
  const lastName = String(data.lastName ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();
  const consent = Boolean(data.consent);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!firstName || !email || !message || !emailOk || !consent) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  // Placeholder: log until an email transport is configured.
  console.info("[contact] nova mensagem", { firstName, lastName, email, message });

  return NextResponse.json({ ok: true });
}
