import { UserRole, Permission, SubmissionStatus, User } from "./types";

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

export function canEditSubmission(
  user: User | null,
  submission: { status: SubmissionStatus },
): boolean {
  if (!user || !hasPermission(user, "submission:update-own")) return false;
  return submission.status === "PENDING" || submission.status === "REJECTED";
}

export function canDeleteSubmission(
  user: User | null,
  submission: { status: SubmissionStatus },
): boolean {
  if (!user || !hasPermission(user, "submission:delete-own")) return false;
  return submission.status === "PENDING";
}

export function canApproveSubmission(
  user: User | null,
  submission: { status: SubmissionStatus },
): boolean {
  if (!user || !hasPermission(user, "submission:approve")) return false;
  return submission.status === "PENDING";
}

export function canRejectSubmission(
  user: User | null,
  submission: { status: SubmissionStatus },
): boolean {
  if (!user || !hasPermission(user, "submission:reject")) return false;
  return submission.status === "PENDING";
}

export function canAccessRecycleBin(user: User | null): boolean {
  return hasPermission(user, "recycle-bin:read");
}

export function canRestoreDeletedData(user: User | null): boolean {
  return hasPermission(user, "recycle-bin:restore");
}
