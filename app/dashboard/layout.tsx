import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
          {/* HEADER TOP BAR */}
          <header className='flex h-20 shrink-0 items-center justify-between border-b bg-white px-8'>
            <div className='flex items-center gap-4'>
              <SidebarTrigger className='-ml-1' />
              <div className='h-4 w-px bg-slate-200' />
              <h1 className='text-lg font-bold text-slate-800'>Dashboard</h1>
            </div>

            <div className='flex items-center gap-6'>
              <button className='relative text-slate-400 hover:text-slate-600 transition-colors'>
                <Bell size={20} />
                <span className='absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white'></span>
              </button>
              <div className='h-8 w-px bg-slate-200'></div>
              <div className='flex items-center gap-3'>
                <div className='text-right hidden sm:block'>
                  <p className='text-sm font-bold text-slate-800 leading-none'>
                    Adam Raga
                  </p>
                  <p className='text-[11px] text-slate-500 mt-1'>
                    A11.2024.15598
                  </p>
                </div>
                <Avatar className='h-9 w-9 border border-slate-100'>
                  <AvatarFallback className='bg-[#0F4C81] text-white text-xs'>
                    AR
                  </AvatarFallback>
                </Avatar>
                <ChevronDown size={16} className='text-slate-400' />
              </div>
            </div>
          </header>

          {/* CONTENT AREA */}
          <main className='flex-1 overflow-y-auto p-8'>{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
