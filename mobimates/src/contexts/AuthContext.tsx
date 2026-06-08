"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { AuthMeResponse } from "@company/shared";
import { PERMISSIONS } from "@company/shared";
import { adminApi } from "@/lib/admin-api";

/** Re-slide session at most once per hour while the user is active. */
const ACTIVITY_REFRESH_MS = 60 * 60 * 1000;
/** Background refresh while the admin tab stays open. */
const PERIODIC_REFRESH_MS = 12 * 60 * 60 * 1000;

interface AuthContextValue {
  session: AuthMeResponse | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (key: string) => boolean;
  isOwner: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthMeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const lastSessionRefresh = useRef(0);

  const slideSession = useCallback(async () => {
    try {
      await adminApi.refreshSession();
      lastSessionRefresh.current = Date.now();
      return true;
    } catch {
      return false;
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      await slideSession();
      const data = await adminApi.me();
      setSession(data);
    } catch {
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, [slideSession]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const maybeRefreshOnActivity = () => {
      if (document.visibilityState === "hidden") return;
      if (Date.now() - lastSessionRefresh.current < ACTIVITY_REFRESH_MS) return;
      slideSession().catch(() => {});
    };

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        slideSession().catch(() => {});
      }
    }, PERIODIC_REFRESH_MS);

    window.addEventListener("focus", maybeRefreshOnActivity);
    window.addEventListener("click", maybeRefreshOnActivity);
    window.addEventListener("keydown", maybeRefreshOnActivity);
    document.addEventListener("visibilitychange", maybeRefreshOnActivity);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", maybeRefreshOnActivity);
      window.removeEventListener("click", maybeRefreshOnActivity);
      window.removeEventListener("keydown", maybeRefreshOnActivity);
      document.removeEventListener("visibilitychange", maybeRefreshOnActivity);
    };
  }, [slideSession]);

  const logout = useCallback(async () => {
    await adminApi.logout();
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      loading,
      refresh,
      logout,
      hasPermission: (key: string) =>
        session?.permissions.includes(key as (typeof PERMISSIONS)[keyof typeof PERMISSIONS]) ?? false,
      isOwner: session?.user.isOwner ?? false,
    }),
    [session, loading, refresh, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
