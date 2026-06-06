"use client";

import { useAuth } from "../hooks/useAuth";
// Update path import berikut:
import { hasPermission } from "@/features/auth/utils/permissions";
import { Permission } from "@/features/auth/types";

export function PermissionGuard({
  permission,
  children,
  fallback = null,
}: {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { currentUser } = useAuth();

  if (hasPermission(currentUser, permission)) {
    return <>{children}</>;
  }
  return <>{fallback}</>;
}
