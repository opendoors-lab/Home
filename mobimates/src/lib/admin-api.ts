import type { AuthMeResponse, AuditLogDto, PostDto, RoleAssignmentDto, RoleDto, UserDto } from '@company/shared';
import { API_BASE_URL } from './api';

type FetchOpts = RequestInit & { json?: unknown; skipRefresh?: boolean };

async function tryRefreshSession(): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });
  return res.ok;
}

async function adminFetch<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const { json, headers, skipRefresh, ...rest } = opts;

  async function doFetch() {
    return fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      credentials: 'include',
      headers: {
        ...(json ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
      body: json ? JSON.stringify(json) : rest.body,
    });
  }

  let res = await doFetch();

  if (
    res.status === 401 &&
    !skipRefresh &&
    path !== '/auth/refresh' &&
    path !== '/auth/login' &&
    path !== '/auth/forgot-password' &&
    path !== '/auth/reset-password'
  ) {
    const refreshed = await tryRefreshSession();
    if (refreshed) {
      res = await doFetch();
    }
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const adminApi = {
  login: (email: string, password: string) =>
    adminFetch<AuthMeResponse>('/auth/login', {
      method: 'POST',
      json: { email, password },
    }),

  changePassword: (currentPassword: string, newPassword: string) =>
    adminFetch<{ ok: boolean }>('/auth/change-password', {
      method: 'POST',
      json: { currentPassword, newPassword },
    }),

  forgotPassword: (email: string) =>
    adminFetch<{ ok: boolean }>('/auth/forgot-password', {
      method: 'POST',
      json: { email },
      skipRefresh: true,
    }),

  resetPassword: (token: string, newPassword: string) =>
    adminFetch<{ ok: boolean }>('/auth/reset-password', {
      method: 'POST',
      json: { token, newPassword },
      skipRefresh: true,
    }),

  me: () => adminFetch<AuthMeResponse>('/auth/me'),

  /** Extends session (sliding refresh token) when user is active. */
  refreshSession: () =>
    adminFetch<{ ok: boolean }>('/auth/refresh', {
      method: 'POST',
      skipRefresh: true,
    }),

  logout: () => adminFetch<{ ok: boolean }>('/auth/logout', { method: 'POST' }),

  bootstrapAdmin: (email: string, name?: string) =>
    adminFetch<UserDto>('/users/bootstrap-admin', {
      method: 'POST',
      json: { email, name },
    }),

  listUsers: () => adminFetch<(UserDto & { roles: { id: string; roleName: string; status: string }[] })[]>('/users'),

  inviteUser: (data: { email: string; name?: string; roleId?: string }) =>
    adminFetch<UserDto>('/users/invite', { method: 'POST', json: data }),

  updateUser: (id: string, data: { name?: string; accountStatus?: string }) =>
    adminFetch<UserDto>(`/users/${id}`, { method: 'PATCH', json: data }),

  assignRole: (userId: string, roleId: string) =>
    adminFetch<RoleAssignmentDto>(`/users/${userId}/roles`, {
      method: 'POST',
      json: { roleId },
    }),

  revokeRole: (userId: string, assignmentId: string) =>
    adminFetch<{ ok: boolean }>(`/users/${userId}/roles/${assignmentId}`, {
      method: 'DELETE',
    }),

  pendingAssignments: () =>
    adminFetch<RoleAssignmentDto[]>('/role-assignments/pending'),

  approveAssignment: (id: string) =>
    adminFetch(`/role-assignments/${id}/approve`, { method: 'POST' }),

  rejectAssignment: (id: string) =>
    adminFetch(`/role-assignments/${id}/reject`, { method: 'POST' }),

  listRoles: () => adminFetch<RoleDto[]>('/roles'),

  listPermissions: () =>
    adminFetch<{ id: string; key: string; label: string }[]>('/permissions'),

  createRole: (data: { name: string; description?: string; permissionKeys: string[] }) =>
    adminFetch<RoleDto>('/roles', { method: 'POST', json: data }),

  updateRole: (id: string, data: { name?: string; description?: string; permissionKeys?: string[] }) =>
    adminFetch<RoleDto>(`/roles/${id}`, { method: 'PATCH', json: data }),

  deleteRole: (id: string) =>
    adminFetch(`/roles/${id}`, { method: 'DELETE' }),

  listMyPosts: () => adminFetch<PostDto[]>('/posts/mine'),

  listAllPosts: () => adminFetch<PostDto[]>('/posts'),

  listPendingPosts: () => adminFetch<PostDto[]>('/posts/pending'),

  getPost: (id: string) => adminFetch<PostDto>(`/posts/${id}`),

  createPost: (data: { title: string; body: string; excerpt?: string; coverImageUrl?: string }) =>
    adminFetch<PostDto>('/posts', { method: 'POST', json: data }),

  updatePost: (id: string, data: { title?: string; body?: string; excerpt?: string; coverImageUrl?: string }) =>
    adminFetch<PostDto>(`/posts/${id}`, { method: 'PATCH', json: data }),

  submitPost: (id: string) =>
    adminFetch<PostDto>(`/posts/${id}/submit`, { method: 'POST' }),

  approvePost: (id: string) =>
    adminFetch<PostDto>(`/posts/${id}/approve`, { method: 'POST' }),

  rejectPost: (id: string, comment: string) =>
    adminFetch<PostDto>(`/posts/${id}/reject`, {
      method: 'POST',
      json: { comment },
    }),

  deletePost: (id: string) =>
    adminFetch(`/posts/${id}`, { method: 'DELETE' }),

  uploadImage: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return fetch(`${API_BASE_URL}/uploads`, {
      method: 'POST',
      credentials: 'include',
      body: form,
    }).then(async (res) => {
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Upload failed: ${res.status}`);
      }
      return res.json() as Promise<{ publicUrl: string; filename: string }>;
    });
  },

  auditLog: () => adminFetch<AuditLogDto[]>('/audit-log'),
};
