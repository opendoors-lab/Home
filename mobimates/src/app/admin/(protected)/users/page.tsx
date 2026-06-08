"use client";

import { useEffect, useState } from "react";
import type { RoleDto, UserDto } from "@company/shared";
import { adminApi } from "@/lib/admin-api";
import { useAuth } from "@/contexts/AuthContext";

type UserRow = UserDto & { roles: { id: string; roleName: string; status: string }[] };

export default function UsersPage() {
  const { isOwner, hasPermission } = useAuth();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRoleId, setInviteRoleId] = useState("");
  const [bootstrapEmail, setBootstrapEmail] = useState("");

  function refresh() {
    adminApi.listUsers().then(setUsers).catch(console.error);
    adminApi.listRoles().then(setRoles).catch(console.error);
  }

  useEffect(() => { refresh(); }, []);

  async function invite() {
    await adminApi.inviteUser({
      email: inviteEmail,
      name: inviteName || undefined,
      roleId: inviteRoleId || undefined,
    });
    setInviteEmail("");
    setInviteName("");
    refresh();
  }

  async function bootstrap() {
    await adminApi.bootstrapAdmin(bootstrapEmail);
    setBootstrapEmail("");
    refresh();
  }

  async function toggleDisabled(user: UserRow) {
    await adminApi.updateUser(user.id, {
      accountStatus: user.accountStatus === "DISABLED" ? "ACTIVE" : "DISABLED",
    });
    refresh();
  }

  async function assignRole(userId: string, roleId: string) {
    await adminApi.assignRole(userId, roleId);
    refresh();
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
        Users
      </h1>

      {isOwner && (
        <div className="mt-6 rounded-xl border border-[var(--color-amber)]/30 bg-[var(--color-cream-200)]/40 p-5">
          <h2 className="text-sm font-semibold text-[var(--color-forest)]">Bootstrap System Admin</h2>
          <div className="mt-3 flex gap-2">
            <input
              value={bootstrapEmail}
              onChange={(e) => setBootstrapEmail(e.target.value)}
              placeholder="admin@company.com"
              className="flex-1 rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm"
            />
            <button type="button" onClick={bootstrap} className="rounded-lg bg-[var(--color-forest)] px-4 py-2 text-sm text-white">
              Create admin
            </button>
          </div>
        </div>
      )}

      {hasPermission("invite_user") && (
        <div className="mt-6 rounded-xl border border-[var(--color-line)] bg-white p-5">
          <h2 className="text-sm font-semibold text-[var(--color-forest)]">Invite user</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="Email" className="rounded-lg border px-3 py-2 text-sm" />
            <input value={inviteName} onChange={(e) => setInviteName(e.target.value)} placeholder="Name" className="rounded-lg border px-3 py-2 text-sm" />
            <select value={inviteRoleId} onChange={(e) => setInviteRoleId(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
              <option value="">No role yet</option>
              {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
          <button type="button" onClick={invite} className="mt-3 rounded-lg bg-[var(--color-amber)] px-4 py-2 text-sm text-white">
            Send invite
          </button>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {users.map((user) => (
          <div key={user.id} className="rounded-xl border border-[var(--color-line)] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium">{user.name ?? user.email}</p>
                <p className="text-sm text-[var(--color-ink-soft)]">{user.email} · {user.accountStatus}</p>
                <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
                  Roles: {user.roles.map((r) => `${r.roleName} (${r.status})`).join(", ") || "none"}
                </p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => toggleDisabled(user)} className="rounded border px-3 py-1 text-xs">
                  {user.accountStatus === "DISABLED" ? "Enable" : "Disable"}
                </button>
                <select
                  onChange={(e) => { if (e.target.value) assignRole(user.id, e.target.value); e.target.value = ""; }}
                  className="rounded border px-2 py-1 text-xs"
                  defaultValue=""
                >
                  <option value="" disabled>Assign role…</option>
                  {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
