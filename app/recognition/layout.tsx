import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import { RoleGuard } from "@/features/auth/components/RoleGuard";

export default function CertificateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["mahasiswa"]}>
      <SidebarProvider>
        <div className='flex min-h-screen w-full bg-slate-50/50'>
          <AppSidebar />
          <SidebarInset className='flex flex-col w-full'>
            <Navbar />
            <main className='flex-1 overflow-y-auto p-8'>{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </RoleGuard>
  );
}
