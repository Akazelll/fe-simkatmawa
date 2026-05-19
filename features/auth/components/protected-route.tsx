"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../hooks/use-auth";
import { hasRole } from "@/lib/auth/permissions";
import { UserRole } from "@/lib/auth/types";

export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}) {
  const { currentUser, isAuthenticated, isLoaded } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isAuthenticated) {
      router.replace(`/login?redirect=${pathname}`);
      return;
    }

    if (allowedRoles && !hasRole(currentUser, allowedRoles)) {
      router.replace("/forbidden");
    }
  }, [isLoaded, isAuthenticated, currentUser, allowedRoles, router, pathname]);

  if (!isLoaded || !isAuthenticated) return null; // or show loading skeleton

  if (allowedRoles && !hasRole(currentUser, allowedRoles)) return null;

  return <>{children}</>;
}
