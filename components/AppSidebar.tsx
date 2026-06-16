"use client";

import * as React from "react";
import Image from "next/image";
import { LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useSidebarNav } from "./sidebar/useSidebarNav";
import { SidebarNavMenu } from "./sidebar/SidebarNavMenu";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { currentUser, logout } = useAuth();
  const navItems = useSidebarNav(currentUser);

  return (
    <Sidebar className='border-r border-slate-100 bg-white' {...props}>
      <SidebarHeader className='h-20 justify-center px-5 bg-white border-b border-slate-100'>
        <div className='flex items-center gap-3 px-2 py-6'>
          <div className='flex aspect-square size-10 items-center justify-center rounded-lg'>
            <Image
              src='/logo-udinus.png'
              alt='Logo Udinus'
              width={60}
              height={60}
              className='object-contain'
            />
          </div>
          <div className='flex flex-col leading-tight'>
            <span className='font-extrabold text-[15px] text-[#1a2b5e] tracking-wide'>
              SIMKATMAWA
            </span>
            <span className='text-[11px] font-semibold text-slate-400 tracking-widest uppercase'>
              UDINUS
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className='bg-white px-3 py-4'>
        <SidebarGroup>
          <SidebarNavMenu items={navItems} />
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='bg-white border-t border-slate-100 px-3 py-3'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => logout()}
              className='w-full px-8 py-5 flex items-center gap-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-600 transition-all group'
            >
              <LogOut
                size={18}
                className='text-slate-400 group-hover:text-red-500 shrink-0'
                strokeWidth={2}
              />
              <span className='font-medium text-[13px]'>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
