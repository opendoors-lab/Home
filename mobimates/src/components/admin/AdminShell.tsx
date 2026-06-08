"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ADMIN_PAGES, canAccessAdminPage } from "@company/shared";
import { useAuth } from "@/contexts/AuthContext";

const NAV_ITEMS = ADMIN_PAGES.filter((p) => !p.hideFromNav);

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { session, loading, logout, isOwner } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const permissions = session?.permissions ?? [];

  useEffect(() => {
    if (!loading && session?.mustChangePassword) {
      router.replace("/admin/change-password");
    }
  }, [loading, session?.mustChangePassword, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-cream)]">
        <p className="text-[var(--color-ink-soft)]">Loading…</p>
      </div>
    );
  }

  const visibleNav = NAV_ITEMS.filter((item) =>
    canAccessAdminPage(item, isOwner, permissions),
  );

  return (
    <div className="flex min-h-screen bg-[var(--color-cream)]">
      <aside className="w-56 shrink-0 border-r border-[var(--color-line)] bg-[var(--color-cream-200)]/60 p-4">
        <Link href="/admin" className="font-[family-name:var(--font-display)] text-lg text-[var(--color-forest)]">
          Admin
        </Link>
        <p className="mt-1 text-xs text-[var(--color-ink-soft)]">{session?.user.email}</p>
        {!isOwner && permissions.length === 0 && (
          <p className="mt-2 rounded-lg bg-amber-50 px-2 py-1.5 text-xs text-amber-900">
            Role pending owner approval
          </p>
        )}
        <nav className="mt-6 space-y-1">
          {visibleNav.map((item) => {
            const active =
              pathname === item.pattern ||
              (item.pattern !== "/admin" && pathname.startsWith(`${item.pattern}/`));
            return (
              <Link
                key={item.pattern}
                href={item.pattern}
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-[var(--color-forest)] text-white"
                    : "text-[var(--color-ink-soft)] hover:bg-white hover:text-[var(--color-forest)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => logout()}
          className="mt-8 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-amber)]"
        >
          Sign out
        </button>
        <Link href="/" className="mt-2 block text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-amber)]">
          ← Back to site
        </Link>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
