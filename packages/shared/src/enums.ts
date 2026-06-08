export enum AccountStatus {
  INVITED = 'INVITED',
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
}

export enum AssignmentStatus {
  PENDING_OWNER_REVIEW = 'PENDING_OWNER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum PostStatus {
  DRAFT = 'DRAFT',
  PENDING_REVIEW = 'PENDING_REVIEW',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
}

export enum ApprovalDecision {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
}
