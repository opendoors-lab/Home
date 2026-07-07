export const PERMISSIONS = {
  // Posting
  CREATE_POST: 'create_post',
  EDIT_OWN_POST: 'edit_own_post',
  EDIT_ANY_POST: 'edit_any_post',
  DELETE_POST: 'delete_post',
  SUBMIT_POST: 'submit_post',

  // Review
  APPROVE_POST: 'approve_post',
  REJECT_POST: 'reject_post',
  VIEW_PENDING_QUEUE: 'view_pending_queue',
  APPROVE_OWN_POST: 'approve_own_post',

  // Administration
  INVITE_USER: 'invite_user',
  MANAGE_USERS: 'manage_users',
  MANAGE_ROLES: 'manage_roles',
  ASSIGN_ROLES: 'assign_roles',
  VIEW_AUDIT_LOG: 'view_audit_log',
} as const;

export type PermissionKey = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ALL_PERMISSION_KEYS: PermissionKey[] = Object.values(PERMISSIONS);

/** Human-readable permission labels for admin UI */
export const PERMISSION_LABELS: Record<PermissionKey, string> = {
  [PERMISSIONS.CREATE_POST]: 'Create posts',
  [PERMISSIONS.EDIT_OWN_POST]: 'Edit own posts',
  [PERMISSIONS.EDIT_ANY_POST]: 'Edit any post',
  [PERMISSIONS.DELETE_POST]: 'Delete posts',
  [PERMISSIONS.SUBMIT_POST]: 'Submit posts for review',
  [PERMISSIONS.APPROVE_POST]: 'Approve posts',
  [PERMISSIONS.REJECT_POST]: 'Reject posts',
  [PERMISSIONS.VIEW_PENDING_QUEUE]: 'View pending review queue',
  [PERMISSIONS.APPROVE_OWN_POST]: 'Approve own post',
  [PERMISSIONS.INVITE_USER]: 'Invite users',
  [PERMISSIONS.MANAGE_USERS]: 'Manage users',
  [PERMISSIONS.MANAGE_ROLES]: 'Manage roles',
  [PERMISSIONS.ASSIGN_ROLES]: 'Assign roles to users',
  [PERMISSIONS.VIEW_AUDIT_LOG]: 'View audit log',
};
