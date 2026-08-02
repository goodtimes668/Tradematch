"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { TRADES } from "@/lib/trades";

type Status = "idle" | "submitting" | "success" | "error";

export default function ApplyForm() {
  const searchParams = useSearchParams();
  const prefillTrade = searchParams.get("trade") ?? "";
  const quizResult = searchParams.get("quiz") ?? "";

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      zip: data.get("zip"),
      trade_interest: data.get("trade_interest"),
      availability: data.get("availability"),
      message: data.get("message"),
      quiz_result: quizResult || undefined,
      source: quizResult ? "quiz" : "apply",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg((err as Error).message);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <h2 className="text-xl font-bold text-green-800">
          You&apos;re on the list.
        </h2>
        <p className="mt-2 text-green-700">
          We&apos;ll reach out by email within a few days with programs that
          match what you told us. No spam, ever.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Field label="Full name" name="name" required autoComplete="name" />
      <Field
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
      />
      <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
      <Field label="ZIP code" name="zip" autoComplete="postal-code" />

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">
          Which trade interests you most?
        </label>
        <select
          name="trade_interest"
          defaultValue={prefillTrade}
          className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
        >
          <option value="">Not sure yet</option>
          {TRADES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">
          When could you start a program?
        </label>
        <select
          name="availability"
          defaultValue=""
          className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
        >
          <option value="">Select one</option>
          <option value="asap">As soon as possible</option>
          <option value="1-3_months">In 1&ndash;3 months</option>
          <option value="3-6_months">In 3&ndash;6 months</option>
          <option value="just_exploring">Just exploring for now</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">
          Anything else we should know? (optional)
        </label>
        <textarea
          name="message"
          rows={3}
          className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 rounded-md bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Submit Application"}
      </button>
      <p className="text-center text-xs text-gray-500">
        Free, always. We only share your info with schools you&apos;d
        actually want to hear from.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-brand-600"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
      />
    </div>
  );
}
