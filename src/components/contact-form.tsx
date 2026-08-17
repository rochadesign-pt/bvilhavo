"use client";

import { useState } from "react";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

// Grey-filled, borderless, rounded fields — matches the Framer form.
const fieldClass =
  "w-full rounded-xl border-0 bg-surface-muted px-4 py-3.5 text-text outline-none ring-1 ring-transparent transition placeholder:text-text-subtlest focus:bg-surface focus:ring-2 focus:ring-brand/40";
const labelClass = "mb-2 block text-[17px] text-text";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    consent: false,
  });

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        e.target instanceof HTMLInputElement && e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value;
      setForm((f) => ({ ...f, [key]: value }));
    };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setForm({ firstName: "", lastName: "", email: "", message: "", consent: false });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-2xl bg-surface p-6 shadow-sm shadow-black/5 md:p-10">
      <h3 className="text-2xl font-medium tracking-display text-text">
        Formulário de contacto
      </h3>
      <p className="mt-3 max-w-md leading-relaxed text-text-subtle">
        Para informações, voluntariado, donativos ou qualquer questão, estamos
        disponíveis. Em caso de emergência, ligue diretamente para o{" "}
        {site.phones.emergency}.
      </p>

      {status === "sent" ? (
        <div className="mt-8 rounded-xl bg-surface-muted p-6">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-brand/10 text-lg text-brand">
            ✓
          </div>
          <h4 className="mt-4 text-lg font-semibold text-text">
            Mensagem enviada.
          </h4>
          <p className="mt-2 text-text-subtle">
            Obrigado pelo seu contacto. Respondemos assim que possível.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-4 font-semibold text-brand hover:text-brand-dark"
          >
            Enviar outra mensagem
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Primeiro nome</span>
              <input
                required
                value={form.firstName}
                onChange={update("firstName")}
                className={fieldClass}
              />
            </label>
            <label className="block">
              <span className={labelClass}>Apelido</span>
              <input
                value={form.lastName}
                onChange={update("lastName")}
                className={fieldClass}
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className={labelClass}>E-mail</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={update("email")}
              className={fieldClass}
            />
          </label>

          <label className="mt-5 block">
            <span className={labelClass}>Mensagem</span>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={update("message")}
              placeholder="Introduza a sua mensagem"
              className={`${fieldClass} resize-none`}
            />
          </label>

          <label className="mt-5 flex items-start gap-3 text-sm text-text-subtle">
            <input
              required
              type="checkbox"
              checked={form.consent}
              onChange={update("consent")}
              className="mt-0.5 h-4 w-4 accent-brand"
            />
            <span>Aceito os Termos e Condições de Privacidade.</span>
          </label>

          {status === "error" && (
            <p className="mt-4 text-sm text-brand">
              Não foi possível enviar. Tente novamente ou ligue{" "}
              {site.phones.office}.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-brand px-6 py-3.5 font-semibold text-on-brand transition-colors hover:bg-brand-dark disabled:opacity-60 sm:w-auto"
          >
            {status === "sending" ? "A enviar…" : "Enviar mensagem"}
          </button>
        </form>
      )}
    </div>
  );
}
