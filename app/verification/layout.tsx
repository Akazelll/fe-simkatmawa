import React from "react";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/components/navbar";
import { AppSidebar } from "@/components/app-sidebar";

export default function VerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["admin", "superadmin"]}>
      {/* {children} */}
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
