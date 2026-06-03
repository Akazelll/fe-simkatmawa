import { RoleGuard } from "@/features/auth/components/RoleGuard";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["superadmin"]}>
      {children}
    </RoleGuard>
  );
}
