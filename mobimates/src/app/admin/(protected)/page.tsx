"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ADMIN_DASHBOARD_CARDS,
  canAccessAdminPage,
  getDefaultAdminLanding,
} from "@company/shared";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminDashboard() {
  const router = useRouter();
  const { session, isOwner } = useAuth();
  const permissions = session?.permissions ?? [];

  const cards = ADMIN_DASHBOARD_CARDS.filter((card) =>
    canAccessAdminPage(card, isOwner, permissions),
  );

  useEffect(() => {
    if (isOwner) return;
    if (cards.length === 0) return;
    const landing = getDefaultAdminLanding(isOwner, permissions);
    if (landing !== "/admin") {
      router.replace(landing);
    }
  }, [isOwner, cards.length, permissions, router]);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-forest)]">
        Dashboard
      </h1>
      <p className="mt-2 text-[var(--color-ink-soft)]">
        Welcome{session?.user.name ? `, ${session.user.name}` : ""}.
        {isOwner && " You have Owner access."}
      </p>

      {!isOwner && permissions.length === 0 && (
        <div className="mt-8 rounded-[var(--radius-card)] border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-medium text-amber-950">Waiting for access</h2>
          <p className="mt-2 text-sm text-amber-900">
            Your account does not have an approved role yet. The owner must approve your role
            assignment before you can use the admin area.
          </p>
        </div>
      )}

      {cards.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.pattern}
              href={card.pattern}
              className="card-lift rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white p-6 shadow-[var(--shadow-soft)]"
            >
              <span className="font-medium text-[var(--color-forest)]">{card.label}</span>
            </Link>
          ))}
        </div>
      )}

      {isOwner && (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/admin/roles"
              className="card-lift rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white p-6 shadow-[var(--shadow-soft)]"
            >
              <span className="font-medium text-[var(--color-forest)]">Manage roles & page access</span>
            </Link>
            <Link
              href="/admin/role-approvals"
              className="card-lift rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white p-6 shadow-[var(--shadow-soft)]"
            >
              <span className="font-medium text-[var(--color-forest)]">Approve role assignments</span>
            </Link>
          </div>
          <div className="mt-10 rounded-[var(--radius-card)] border border-[var(--color-amber)]/30 bg-[var(--color-cream-200)]/50 p-6">
            <h2 className="font-medium text-[var(--color-forest)]">Owner setup</h2>
            <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
              Define roles and which admin pages each role can access, then approve role
              assignments for invited users.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
