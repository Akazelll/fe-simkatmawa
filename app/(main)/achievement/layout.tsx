import { RoleGuard } from "@/features/auth/components/RoleGuard";

export default function AchievementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["mahasiswa"]}>
      {children}
    </RoleGuard>
  );
}
