import { RoleGuard } from "@/features/auth/components/RoleGuard";

export default function RecognitionLayout({
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
