"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/admin-api";
import { useAuth } from "@/contexts/AuthContext";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await adminApi.changePassword(currentPassword, newPassword);
      await refresh();
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-cream)] px-6">
      <div className="w-full max-w-md rounded-[var(--radius-card)] bg-white p-8 shadow-[var(--shadow-soft)]">
        <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
          Set new password
        </h1>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
          Enter the temporary password from your invite email, then choose a new password.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Current / temporary password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[var(--color-line)] px-4 py-3"
            />
          </div>
          <div>
            <label className="text-sm font-medium">New password</label>
            <input
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[var(--color-line)] px-4 py-3"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Confirm new password</label>
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[var(--color-line)] px-4 py-3"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--color-amber)] py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Saving…" : "Save new password"}
          </button>
        </form>
      </div>
    </div>
  );
}
