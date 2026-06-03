
import { RoleGuard } from "@/features/auth/components/RoleGuard";

export default function CertificateLayout({
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
