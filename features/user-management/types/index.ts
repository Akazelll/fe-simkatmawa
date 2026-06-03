export type Role = "Admin" | "Superadmin";
export type Status = "Active" | "Inactive";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  lastLogin: Date;
}
