"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { hasRole } from "@/lib/auth/permissions";
import { UserRole } from "@/lib/auth/types";

export function RoleGuard({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}) {
  const { currentUser, isLoaded, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (!hasRole(currentUser, allowedRoles)) {
      router.replace("/forbidden");
    }
  }, [isLoaded, isAuthenticated, currentUser, allowedRoles, router]);
  if (!isLoaded || !isAuthenticated || !hasRole(currentUser, allowedRoles)) {
    return null;
  }
  return <>{children}</>;
}
