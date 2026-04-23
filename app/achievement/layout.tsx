import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";

export default function AchievementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className='flex min-h-screen w-full bg-slate-50/50'>
        <AppSidebar />
        <SidebarInset className='flex flex-col w-full'>
          {/* Menggunakan Komponen Navbar dengan judul yang berbeda */}
          <Navbar title='Prestasi' />

          {/* CONTENT AREA */}
          <main className='flex-1 overflow-y-auto p-8'>{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
