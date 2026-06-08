"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { RoleAssignmentDto } from "@company/shared";
import { adminApi } from "@/lib/admin-api";
import { useAuth } from "@/contexts/AuthContext";

export default function RoleApprovalsPage() {
  const { isOwner } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<RoleAssignmentDto[]>([]);

  useEffect(() => {
    if (!isOwner) {
      router.replace("/admin");
      return;
    }
    adminApi.pendingAssignments().then(setItems).catch(console.error);
  }, [isOwner, router]);

  async function approve(id: string) {
    await adminApi.approveAssignment(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function reject(id: string) {
    await adminApi.rejectAssignment(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  if (!isOwner) return null;

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
        Role approvals
      </h1>
      <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
        Approve role assignments before permissions take effect.
      </p>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[var(--color-line)] bg-white p-5">
            <div>
              <p className="font-medium">{item.userName ?? item.userEmail}</p>
              <p className="text-sm text-[var(--color-ink-soft)]">
                Role: <strong>{item.roleName}</strong>
              </p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => approve(item.id)} className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white">
                Approve
              </button>
              <button type="button" onClick={() => reject(item.id)} className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white">
                Reject
              </button>
            </div>
          </div>
        ))}
        {!items.length && <p className="text-[var(--color-ink-soft)]">No pending assignments.</p>}
      </div>
    </div>
  );
}
