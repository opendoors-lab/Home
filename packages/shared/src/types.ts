import type { AccountStatus, ApprovalDecision, AssignmentStatus, PostStatus } from './enums';
import type { PermissionKey } from './permissions';

export interface UserDto {
  id: string;
  email: string;
  name: string | null;
  accountStatus: AccountStatus;
  isOwner: boolean;
  mustChangePassword?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthMeResponse {
  user: UserDto;
  permissions: PermissionKey[];
  mustChangePassword?: boolean;
}

export interface PublicPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  authorName: string | null;
  publishedAt: string;
}

export interface PublicPostDetail extends PublicPostSummary {
  body: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PostApprovalDto {
  id: string;
  reviewerId: string;
  reviewerName: string | null;
  decision: ApprovalDecision;
  comment: string | null;
  createdAt: string;
}

export interface PostDto {
  id: string;
  slug: string;
  title: string;
  body: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  authorId: string;
  authorName: string | null;
  status: PostStatus;
  approvalCount: number;
  approvals: PostApprovalDto[];
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RoleDto {
  id: string;
  name: string;
  description: string | null;
  isSystem: boolean;
  permissionKeys: string[];
  createdAt: string;
}

export interface PermissionDto {
  id: string;
  key: string;
  label: string;
}

export interface RoleAssignmentDto {
  id: string;
  userId: string;
  userEmail: string;
  userName: string | null;
  roleId: string;
  roleName: string;
  status: AssignmentStatus;
  assignedById: string | null;
  createdAt: string;
}

export interface AuditLogDto {
  id: string;
  actorId: string | null;
  action: string;
  targetType: string | null;
  targetId: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}
