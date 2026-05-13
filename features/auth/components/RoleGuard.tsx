"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Mock get role from auth state/token
    const userRole = "superadmin";

    if (allowedRoles.includes(userRole)) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
      router.push("/dashboard");
    }
  }, [allowedRoles, router]);

  if (isAuthorized === null) return null; // Wait for check

  if (!isAuthorized) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] gap-4'>
        <ShieldAlert className='text-rose-500' size={64} />
        <h2 className='text-2xl font-bold text-slate-800'>Akses Ditolak</h2>
        <p className='text-slate-500'>
          Hanya Superadmin yang dapat mengakses halaman ini.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
