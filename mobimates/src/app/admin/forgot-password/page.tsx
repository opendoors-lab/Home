"use client";

import { useState } from "react";
import Link from "next/link";
import { adminApi } from "@/lib/admin-api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminApi.forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send reset email");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-cream)] px-6">
      <div className="w-full max-w-md rounded-[var(--radius-card)] bg-white p-8 shadow-[var(--shadow-soft)]">
        <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
          Forgot password
        </h1>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
          Enter your admin email and we&apos;ll send you a link to set a new password.
        </p>

        {sent ? (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">
            If an account exists for <strong>{email}</strong>, you will receive a reset link shortly.
            Check your inbox and spam folder.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--color-forest)]">Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[var(--color-line)] px-4 py-3"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[var(--color-amber)] py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send reset link"}
            </button>
          </form>
        )}

        <Link
          href="/admin/login"
          className="mt-6 block text-center text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-amber)]"
        >
          ← Back to sign in
        </Link>
      </div>
    </div>
  );
}
