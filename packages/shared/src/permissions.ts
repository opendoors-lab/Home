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

  // Administration
  INVITE_USER: 'invite_user',
  MANAGE_USERS: 'manage_users',
  MANAGE_ROLES: 'manage_roles',
  ASSIGN_ROLES: 'assign_roles',
  VIEW_AUDIT_LOG: 'view_audit_log',
} as const;

export type PermissionKey = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ALL_PERMISSION_KEYS: PermissionKey[] = Object.values(PERMISSIONS);
