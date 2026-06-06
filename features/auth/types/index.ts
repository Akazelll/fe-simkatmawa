export type UserRole = "mahasiswa" | "admin" | "superadmin";

export type Permission =
  | "submission:create"
  | "submission:read-own"
  | "submission:read-all"
  | "submission:update-own"
  | "submission:delete-own"
  | "submission:approve"
  | "submission:reject"
  | "queue:read"
  | "recycle-bin:read"
  | "recycle-bin:restore"
  | "settings:manage"
  | "kemdikbud-credential:manage";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  nim?: string;
  password?: string;
}
