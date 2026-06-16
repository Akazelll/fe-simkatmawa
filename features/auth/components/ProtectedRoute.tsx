"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { hasRole } from "@/features/auth/utils/permissions";
import { UserRole } from "@/features/auth/types";

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
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (allowedRoles && currentUser && !hasRole(currentUser, allowedRoles)) {
      router.replace("/forbidden");
    }
  }, [isLoaded, isAuthenticated, currentUser, allowedRoles, router, pathname]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1a2b5e] border-t-transparent" />
          <p className="text-sm font-medium text-slate-500 animate-pulse">
            Memverifikasi sesi...
          </p>
        </div>
      </div>
    );
  }

  
  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles && currentUser && !hasRole(currentUser, allowedRoles)) {
    return null;
  }

  return <>{children}</>;
}