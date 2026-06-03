import { RoleGuard } from "@/features/auth/components/RoleGuard";

export default function QueueLayout({
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
