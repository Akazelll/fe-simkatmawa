"use client";

import { useAuth } from "../hooks/use-auth";
import { hasPermission } from "@/lib/auth/permissions";
import { Permission } from "@/lib/auth/types";

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
