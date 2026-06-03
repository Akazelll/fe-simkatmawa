import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Navbar } from "@/components/Navbar";
import { Breadcrumbs } from "@/features/shared/components/Breadcrumbs";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className='flex min-h-screen w-full bg-slate-50/50'>
        <AppSidebar />
        <SidebarInset className='flex flex-col w-full'>
          <Navbar />
          <main className='flex-1 overflow-y-auto'>
            <div className='px-8 pt-6'>
              <Breadcrumbs />
            </div>
            <div className='px-8 pt-4 pb-8'>{children}</div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
