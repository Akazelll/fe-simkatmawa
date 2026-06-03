import { RoleGuard } from "@/features/auth/components/RoleGuard";

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["superadmin", "admin"]}>{children}</RoleGuard>
  );
}
