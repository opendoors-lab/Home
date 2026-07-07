"use client";

import { useEffect, useState } from "react";
import type { RoleDto } from "@company/shared";
import {
  ALL_PERMISSION_KEYS,
  getPagesForPermission,
  PERMISSION_LABELS,
  PERMISSIONS,
  type PermissionKey,
} from "@company/shared";
import { adminApi } from "@/lib/admin-api";
import { useAuth } from "@/contexts/AuthContext";

const ALL_PERMS = ALL_PERMISSION_KEYS.map((key) => ({
  key,
  label: PERMISSION_LABELS[key],
}));

function PermissionPicker({
  selected,
  onToggle,
  readOnly,
}: {
  selected: string[];
  onToggle: (key: string) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {ALL_PERMS.map((p) => {
        const pages = getPagesForPermission(p.key);
        return (
          <label
            key={p.key}
            className="flex gap-2 rounded-lg border border-[var(--color-line)] p-3 text-sm"
          >
            <input
              type="checkbox"
              className="mt-0.5"
              checked={selected.includes(p.key)}
              disabled={readOnly}
              onChange={() => onToggle(p.key)}
            />
            <span>
              <span className="font-medium">{p.label}</span>
              {pages.length > 0 && (
                <span className="mt-0.5 block text-xs text-[var(--color-ink-soft)]">
                  Pages: {pages.join(", ")}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}

function RoleEditor({
  role,
  canEdit,
  onSaved,
  onDeleted,
}: {
  role: RoleDto;
  canEdit: boolean;
  onSaved: () => void;
  onDeleted: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description ?? "");
  const [selectedPerms, setSelectedPerms] = useState<string[]>(role.permissionKeys);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setName(role.name);
    setDescription(role.description ?? "");
    setSelectedPerms(role.permissionKeys);
  }, [role]);

  function togglePerm(key: string) {
    setSelectedPerms((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key],
    );
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      await adminApi.updateRole(role.id, {
        ...(role.isSystem ? {} : { name }),
        description: description || undefined,
        permissionKeys: selectedPerms,
      });
      setEditing(false);
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save role");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (role.isSystem) return;
    if (!window.confirm(`Delete role "${role.name}"?`)) return;
    setSaving(true);
    setError("");
    try {
      await adminApi.deleteRole(role.id);
      onDeleted();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete role");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border border-[var(--color-line)] bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-medium text-[var(--color-forest)]">
            {role.name}
            {role.isSystem && (
              <span className="ml-2 rounded-full bg-[var(--color-cream-200)] px-2 py-0.5 text-xs font-normal text-[var(--color-ink-soft)]">
                Default role
              </span>
            )}
          </p>
          {!editing && role.description && (
            <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{role.description}</p>
          )}
        </div>
        {canEdit && (
          <div className="flex gap-2">
            {!editing ? (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="rounded-lg border border-[var(--color-line)] px-3 py-1.5 text-sm hover:bg-[var(--color-cream-200)]"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setName(role.name);
                    setDescription(role.description ?? "");
                    setSelectedPerms(role.permissionKeys);
                    setError("");
                  }}
                  className="rounded-lg border border-[var(--color-line)] px-3 py-1.5 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={save}
                  className="rounded-lg bg-[var(--color-forest)] px-3 py-1.5 text-sm text-white disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </>
            )}
            {!role.isSystem && !editing && (
              <button
                type="button"
                disabled={saving}
                onClick={remove}
                className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50 disabled:opacity-50"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {editing ? (
        <div className="mt-4 space-y-4 border-t border-[var(--color-line)] pt-4">
          {!role.isSystem && (
            <div>
              <label className="text-sm font-medium">Role name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>
          )}
          {role.isSystem && (
            <p className="text-xs text-[var(--color-ink-soft)]">
              Default role names are fixed. You can change the description and permissions.
            </p>
          )}
          <div>
            <label className="text-sm font-medium">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <PermissionPicker selected={selectedPerms} onToggle={togglePerm} />
        </div>
      ) : (
        <ul className="mt-3 space-y-1 text-xs text-[var(--color-ink-soft)]">
          {role.permissionKeys.map((key) => {
            const pages = getPagesForPermission(key as PermissionKey);
            const label = PERMISSION_LABELS[key as PermissionKey] ?? key;
            return (
              <li key={key}>
                <span className="font-medium text-[var(--color-forest)]">{label}</span>
                {pages.length > 0 && ` → ${pages.join(", ")}`}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function RolesPage() {
  const { isOwner, hasPermission } = useAuth();
  const canView =
    isOwner ||
    hasPermission(PERMISSIONS.MANAGE_ROLES) ||
    hasPermission(PERMISSIONS.ASSIGN_ROLES);
  const canEdit = isOwner || hasPermission(PERMISSIONS.MANAGE_ROLES);

  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);

  function refresh() {
    adminApi.listRoles().then(setRoles).catch(console.error);
  }

  useEffect(() => {
    if (canView) refresh();
  }, [canView]);

  async function createRole() {
    await adminApi.createRole({ name, description, permissionKeys: selectedPerms });
    setName("");
    setDescription("");
    setSelectedPerms([]);
    refresh();
  }

  function togglePerm(key: string) {
    setSelectedPerms((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key],
    );
  }

  if (!canView) {
    return (
      <div className="rounded-xl border border-[var(--color-line)] bg-white p-6">
        <p className="text-[var(--color-ink-soft)]">You do not have access to roles.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
        Roles & page access
      </h1>
      <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
        {canEdit
          ? "Define roles and which admin pages each role can access."
          : "View role definitions and which pages each permission unlocks."}
      </p>

      {canEdit && (
        <div className="mt-6 rounded-xl border border-[var(--color-line)] bg-white p-5">
          <h2 className="text-sm font-semibold">Create custom role</h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Role name"
            className="mt-2 w-full rounded-lg border px-3 py-2 text-sm"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="mt-2 w-full rounded-lg border px-3 py-2 text-sm"
          />
          <div className="mt-3">
            <PermissionPicker selected={selectedPerms} onToggle={togglePerm} />
          </div>
          <button
            type="button"
            onClick={createRole}
            disabled={!name}
            className="mt-4 rounded-lg bg-[var(--color-forest)] px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            Create role
          </button>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {roles.map((role) => (
          <RoleEditor
            key={role.id}
            role={role}
            canEdit={canEdit}
            onSaved={refresh}
            onDeleted={refresh}
          />
        ))}
      </div>
    </div>
  );
}
