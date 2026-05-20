import React from "react";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Navbar } from "@/components/Navbar";
import { SidebarInset } from "@/components/ui/sidebar";

export default function QueueLayout({
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
