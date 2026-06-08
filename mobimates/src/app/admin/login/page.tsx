"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDefaultAdminLanding } from "@company/shared";
import { adminApi } from "@/lib/admin-api";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const session = await adminApi.login(email, password);
      await refresh();
      if (session.mustChangePassword) {
        router.replace("/admin/change-password");
      } else if (session.user.isOwner) {
        router.replace("/admin");
      } else {
        router.replace(getDefaultAdminLanding(false, session.permissions));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-cream)] px-6">
      <div className="w-full max-w-md rounded-[var(--radius-card)] bg-white p-8 shadow-[var(--shadow-soft)]">
        <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
          Sign in with the email and temporary password sent to you. You&apos;ll set a new password on first login.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-[var(--color-forest)]">Email</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="mt-1 w-full rounded-xl border border-[var(--color-line)] px-4 py-3"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[var(--color-forest)]">Password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Temporary or current password"
              className="mt-1 w-full rounded-xl border border-[var(--color-line)] px-4 py-3"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--color-amber)] py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <Link href="/newsfeed" className="mt-6 block text-center text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-amber)]">
          ← Back to Newsfeed
        </Link>
      </div>
    </div>
  );
}
