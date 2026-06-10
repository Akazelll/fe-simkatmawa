// features/auth/utils/permissions.ts
import { User, UserRole, Permission } from "@/features/auth/types";

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  mahasiswa: [
    "submission:create",
    "submission:read-own",
    "submission:update-own",
    "submission:delete-own",
  ],
  admin: [
    "submission:read-all",
    "submission:approve",
    "submission:reject",
    "queue:read",
  ],
  superadmin: [
    "submission:read-all",
    "submission:approve",
    "submission:reject",
    "queue:read",
    "recycle-bin:read",
    "recycle-bin:restore",
    "settings:manage",
    "kemdikbud-credential:manage",
  ],
};

export function hasPermission(
  user: User | null,
  permission: Permission,
): boolean {
  if (!user) return false;
  const permissions = ROLE_PERMISSIONS[user.role] || [];
  return permissions.includes(permission);
}

export function hasAnyPermission(
  user: User | null,
  permissions: Permission[],
): boolean {
  if (!user) return false;
  const userPerms = ROLE_PERMISSIONS[user.role] || [];
  return permissions.some((p) => userPerms.includes(p));
}

export function hasRole(
  user: User | null,
  role: UserRole | UserRole[],
): boolean {
  if (!user) return false;
  if (Array.isArray(role)) return role.includes(user.role);
  return user.role === role;
}
