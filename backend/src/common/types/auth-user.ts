export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  accountStatus: string;
  isOwner: boolean;
}
