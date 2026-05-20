import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Navbar } from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className='flex min-h-screen w-full bg-slate-50/50'>
        <AppSidebar />
        <SidebarInset className='flex flex-col w-full'>
          <Navbar />
          <main className='flex-1 overflow-y-auto p-8'>{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
