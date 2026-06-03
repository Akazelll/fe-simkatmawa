import { AppShell } from "@/components/AppShell";
import { RoleGuard } from "@/features/auth/components/RoleGuard";

export default function VerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["admin", "superadmin"]}>
      {children}
    </RoleGuard>
  );
}
