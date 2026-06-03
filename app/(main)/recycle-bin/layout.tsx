import { RoleGuard } from "@/features/auth/components/RoleGuard";

export default function RecycleBinLayout({
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
