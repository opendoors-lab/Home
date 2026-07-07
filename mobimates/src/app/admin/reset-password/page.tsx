"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { adminApi } from "@/lib/admin-api";

function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Missing reset token. Use the link from your email.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await adminApi.resetPassword(token, newPassword);
      setDone(true);
      setTimeout(() => router.replace("/admin/login"), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reset password");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">
        Password updated. Redirecting to sign in…
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {!token && (
        <p className="text-sm text-red-600">
          This page needs a valid reset link from your email.
        </p>
      )}
      <div>
        <label className="text-sm font-medium text-[var(--color-forest)]">New password</label>
        <input
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 w-full rounded-xl border border-[var(--color-line)] px-4 py-3"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-[var(--color-forest)]">Confirm password</label>
        <input
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 w-full rounded-xl border border-[var(--color-line)] px-4 py-3"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading || !token}
        className="w-full rounded-xl bg-[var(--color-amber)] py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Saving…" : "Set new password"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-cream)] px-6">
      <div className="w-full max-w-md rounded-[var(--radius-card)] bg-white p-8 shadow-[var(--shadow-soft)]">
        <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
          Set new password
        </h1>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
          Choose a new password for your admin account.
        </p>

        <Suspense fallback={<p className="mt-6 text-sm text-[var(--color-ink-soft)]">Loading…</p>}>
          <ResetPasswordForm />
        </Suspense>

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
