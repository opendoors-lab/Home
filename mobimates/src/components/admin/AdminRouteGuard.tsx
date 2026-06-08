"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  canAccessAdminPage,
  getDefaultAdminLanding,
  matchAdminPage,
} from "@company/shared";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, loading, isOwner } = useAuth();

  const permissions = session?.permissions ?? [];
  const page = matchAdminPage(pathname);
  const allowed = page
    ? canAccessAdminPage(page, isOwner, permissions)
    : false;

  useEffect(() => {
    if (loading || !session) return;
    if (!page || allowed) return;

    const fallback = getDefaultAdminLanding(isOwner, permissions);
    router.replace(fallback);
  }, [loading, session, page, allowed, isOwner, permissions, router]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-[var(--color-ink-soft)]">Loading…</p>
      </div>
    );
  }

  if (!allowed && page) {
    return (
      <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white p-8">
        <h1 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-forest)]">
          Access restricted
        </h1>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
          Your role does not include access to this page. Redirecting…
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
