"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function TransactionForm({
  endpoint,
  title,
  buttonLabel
}: {
  endpoint: string;
  title: string;
  buttonLabel: string;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: formData.get("amount"),
        description: formData.get("description")
      })
    });

    const payload = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(payload.error ?? "Request failed.");
      return;
    }

    setSuccess(`${title} completed. Reference: ${payload.transaction.reference}`);
    event.currentTarget.reset();
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-ink">Amount</label>
        <input
          name="amount"
          type="number"
          step="0.01"
          min="0.01"
          className="w-full rounded-2xl border border-ink/10 px-4 py-3 outline-none focus:border-gold"
          required
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-ink">Description</label>
        <input
          name="description"
          type="text"
          className="w-full rounded-2xl border border-ink/10 px-4 py-3 outline-none focus:border-gold"
          placeholder="Optional note for the transaction"
        />
      </div>
      {error ? <p className="text-sm text-rose">{error}</p> : null}
      {success ? <p className="text-sm text-pine">{success}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Processing..." : buttonLabel}
      </button>
    </form>
  );
}
