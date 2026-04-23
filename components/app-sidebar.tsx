"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  ScrollText,
  UserCheck,
  LogOut,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Submission",
    icon: Trophy,
    children: [
      { label: "Prestasi", icon: Trophy, href: "/achievement" },
      { label: "Sertifikat", icon: ScrollText, href: "/certificate "},
      { label: "Rekognisi", icon: UserCheck, href: "/recognition" },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const pathname = usePathname();

  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({
    Prestasi: true,
  });

  const toggleMenu = (label: string) =>
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <Sidebar className='border-r border-slate-100 bg-white' {...props}>
      <SidebarHeader className='h-20 justify-center px-5 bg-white border-b border-slate-100'>
        <div className='flex items-center gap-3'>
          <div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#1a2b5e]'>
            <span className='text-[9px] font-extrabold text-white tracking-wide'>
              SIM
            </span>
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
      <SidebarContent className='bg-white px-3 py-3'>
        <SidebarGroup>
          <SidebarMenu className='gap-0.5'>
            {navItems.map((item) => {
              const isOpen = openMenus[item.label] ?? false;
              const isActive = pathname === item.href;

              if (item.children) {
                return (
                  <React.Fragment key={item.label}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => toggleMenu(item.label)}
                        className='w-full px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all'
                      >
                        <item.icon
                          size={18}
                          className='text-slate-400 shrink-0'
                          strokeWidth={2}
                        />
                        <span className='flex-1 font-medium text-[13px]'>
                          {item.label}
                        </span>
                        {isOpen ? (
                          <ChevronUp size={14} className='text-slate-400' />
                        ) : (
                          <ChevronDown size={14} className='text-slate-400' />
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {isOpen && (
                      <SidebarMenuSub className='ml-4 pl-3 border-l border-slate-100 gap-0.5'>
                        {item.children.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <SidebarMenuSubItem key={child.label}>
                              <SidebarMenuSubButton
                                onClick={() => router.push(child.href)}
                                isActive={isChildActive}
                                className={`px-3 py-2 rounded-lg transition-all cursor-pointer
                                  ${
                                    isChildActive
                                      ? "bg-[#eef2fb] text-[#1a2b5e] font-semibold"
                                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                  }`}
                              >
                                <child.icon
                                  size={16}
                                  className={
                                    isChildActive
                                      ? "text-[#1a2b5e] shrink-0"
                                      : "text-slate-400 shrink-0"
                                  }
                                  strokeWidth={1.8}
                                />
                                <span className='font-medium text-[13px]'>
                                  {child.label}
                                </span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    )}
                  </React.Fragment>
                );
              }

              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={isActive}
                    onClick={() => router.push(item.href!)}
                    className={`w-full px-4 py-2.5 rounded-xl transition-all
                      ${
                        isActive
                          ? "bg-[#eef2fb] text-[#1a2b5e] hover:bg-[#e4eaf8] hover:text-[#1a2b5e] font-semibold data-[active=true]:bg-[#eef2fb] data-[active=true]:text-[#1a2b5e]"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                  >
                    <item.icon
                      size={18}
                      className={
                        isActive
                          ? "text-[#1a2b5e] shrink-0"
                          : "text-slate-400 shrink-0"
                      }
                      strokeWidth={2}
                    />
                    <span className='font-semibold text-[13px]'>
                      {item.label}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='bg-white border-t border-slate-100 px-3 py-3'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                router.push("/login");
              }}
              className='w-full px-4 py-2.5 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all group'
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
