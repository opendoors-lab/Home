import { ALL_PERMISSION_KEYS, PERMISSIONS, type PermissionKey } from './permissions';

export interface AdminPageDefinition {
  /** Route path; use :id for dynamic segments */
  pattern: string;
  label: string;
  /** User needs at least one of these permissions (owner bypasses) */
  permissions?: PermissionKey[];
  ownerOnly?: boolean;
  hideFromNav?: boolean;
}

/** Admin areas and the permissions that unlock them. Owner configures roles. */
export const ADMIN_PAGES: AdminPageDefinition[] = [
  {
    pattern: '/admin',
    label: 'Dashboard',
    permissions: [...ALL_PERMISSION_KEYS],
  },
  {
    pattern: '/admin/posts/mine',
    label: 'My posts',
    permissions: [PERMISSIONS.CREATE_POST, PERMISSIONS.EDIT_OWN_POST],
  },
  {
    pattern: '/admin/posts/new',
    label: 'New post',
    permissions: [PERMISSIONS.CREATE_POST],
  },
  {
    pattern: '/admin/posts/all',
    label: 'All posts',
    permissions: [PERMISSIONS.EDIT_ANY_POST],
  },
  {
    pattern: '/admin/posts/:id/edit',
    label: 'Edit post',
    permissions: [
      PERMISSIONS.CREATE_POST,
      PERMISSIONS.EDIT_OWN_POST,
      PERMISSIONS.EDIT_ANY_POST,
    ],
    hideFromNav: true,
  },
  {
    pattern: '/admin/review',
    label: 'Review queue',
    permissions: [PERMISSIONS.VIEW_PENDING_QUEUE],
  },
  {
    pattern: '/admin/users',
    label: 'Users',
    permissions: [PERMISSIONS.MANAGE_USERS, PERMISSIONS.INVITE_USER],
  },
  {
    pattern: '/admin/roles',
    label: 'Roles',
    permissions: [PERMISSIONS.MANAGE_ROLES, PERMISSIONS.ASSIGN_ROLES],
  },
  {
    pattern: '/admin/role-approvals',
    label: 'Role approvals',
    permissions: [PERMISSIONS.ASSIGN_ROLES],
  },
  {
    pattern: '/admin/audit',
    label: 'Audit log',
    permissions: [PERMISSIONS.VIEW_AUDIT_LOG, PERMISSIONS.ASSIGN_ROLES],
  },
];

/** Extra page/action hints for permissions that do not map 1:1 to a nav route */
const PERMISSION_ACTION_HINTS: Partial<Record<PermissionKey, string[]>> = {
  [PERMISSIONS.DELETE_POST]: ['Delete on post pages'],
  [PERMISSIONS.SUBMIT_POST]: ['Submit for review on Edit post'],
  [PERMISSIONS.APPROVE_POST]: ['Approve on Review queue'],
  [PERMISSIONS.REJECT_POST]: ['Reject on Review queue'],
  [PERMISSIONS.APPROVE_OWN_POST]: [
    'Auto-publish own posts; single approval counts as two for others',
  ],
  [PERMISSIONS.ASSIGN_ROLES]: ['Assign roles on Users page'],
  [PERMISSIONS.MANAGE_ROLES]: ['Create and edit roles'],
};

export const ADMIN_DASHBOARD_CARDS = ADMIN_PAGES.filter(
  (p) => p.pattern !== '/admin' && !p.hideFromNav && !p.ownerOnly,
);

function patternToRegex(pattern: string): RegExp {
  const escaped = pattern.replace(/:[^/]+/g, '[^/]+');
  return new RegExp(`^${escaped}$`);
}

export function matchAdminPage(pathname: string): AdminPageDefinition | null {
  const exact = ADMIN_PAGES.find((p) => p.pattern === pathname);
  if (exact) return exact;

  for (const page of ADMIN_PAGES) {
    if (!page.pattern.includes(':')) continue;
    if (patternToRegex(page.pattern).test(pathname)) return page;
  }
  return null;
}

export function canAccessAdminPage(
  page: AdminPageDefinition,
  isOwner: boolean,
  permissions: readonly string[],
): boolean {
  if (isOwner) return true;
  if (page.ownerOnly) return false;
  if (!page.permissions?.length) return true;
  return page.permissions.some((p) => permissions.includes(p));
}

export function getAccessibleAdminPages(
  isOwner: boolean,
  permissions: readonly string[],
): AdminPageDefinition[] {
  return ADMIN_PAGES.filter((p) => canAccessAdminPage(p, isOwner, permissions));
}

export function getDefaultAdminLanding(
  isOwner: boolean,
  permissions: readonly string[],
): string {
  if (isOwner) return '/admin';
  const first = getAccessibleAdminPages(isOwner, permissions).find(
    (p) => p.pattern !== '/admin',
  );
  return first?.pattern ?? '/admin';
}

export function getPagesForPermission(key: PermissionKey): string[] {
  const pages = ADMIN_PAGES.filter((p) => p.permissions?.includes(key)).map(
    (p) => p.label,
  );
  const hints = PERMISSION_ACTION_HINTS[key] ?? [];
  return [...new Set([...pages, ...hints])];
}
