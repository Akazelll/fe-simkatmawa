// features/auth/components/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
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

    if (allowedRoles && currentUser && !hasRole(currentUser, allowedRoles)) {
      router.replace("/forbidden");
    }
  }, [isLoaded, isAuthenticated, currentUser, allowedRoles, router, pathname]);

  if (!isLoaded) {
    // Tampilkan skeleton atau spinner loading minimalis
    return (
      <div className='min-h-screen flex items-center justify-center'>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) return null;
  if (allowedRoles && currentUser && !hasRole(currentUser, allowedRoles))
    return null;

  return <>{children}</>;
}
