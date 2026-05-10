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
  SquareCheckBig,
  Activity,
  Rows3,
  Settings,
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
      { label: "Sertifikat", icon: ScrollText, href: "/certificate" },
      { label: "Rekognisi", icon: UserCheck, href: "/recognition" },
    ],
  },
  {
    label: "Activity Log",
    icon: Activity,
    href: "/activity",
  },
  {
    label: "Verification",
    icon: SquareCheckBig,
    href: "/verification",
  },
  {
    label: "Queue Monitoring",
    icon: Rows3,
    href: "/queue",
  },
  {
    label: " User Management",
    icon: UserCheck,
    href: "/user-management",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const pathname = usePathname();

  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({
    Submission: true,
  });

  const toggleMenu = (label: string) =>
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));

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

      {/* CONTENT */}
      <SidebarContent className='bg-white px-3 py-3'>
        <SidebarGroup>
          <SidebarMenu className='gap-0.5'>
            {navItems.map((item) => {
              const isOpen = openMenus[item.label] ?? false;
              const isActive = pathname === item.href;
              const isChildActive = item.children?.some(
                (child) => pathname === child.href,
              );

              if (item.children) {
                return (
                  <React.Fragment key={item.label}>
                    {/* PARENT MENU */}
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => toggleMenu(item.label)}
                        className={`w-full px-8 py-5 rounded-xl transition-all ${
                          isChildActive
                            ? "!bg-[#1A4D87] !text-white hover:!bg-[#1A4D87] hover:!text-white font-semibold"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <item.icon
                          size={18}
                          className={
                            isChildActive
                              ? "!text-white shrink-0"
                              : "text-slate-400 shrink-0"
                          }
                          strokeWidth={2}
                        />

                        <span className='flex-1 font-medium text-[13px]'>
                          {item.label}
                        </span>

                        {isOpen ? (
                          <ChevronUp
                            size={14}
                            className={
                              isChildActive ? "!text-white" : "text-slate-400"
                            }
                          />
                        ) : (
                          <ChevronDown
                            size={14}
                            className={
                              isChildActive ? "!text-white" : "text-slate-400"
                            }
                          />
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* SUB MENU */}
                    {isOpen && (
                      <SidebarMenuSub className='ml-4 pl-3 border-l border-slate-100 gap-0.5'>
                        {item.children.map((child) => {
                          const isChildItemActive = pathname === child.href;

                          return (
                            <SidebarMenuSubItem key={child.label}>
                              <SidebarMenuSubButton
                                onClick={() => router.push(child.href)}
                                isActive={isChildItemActive}
                                className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
                                  isChildItemActive
                                    ? "!bg-[#1A4D87] !text-white hover:!bg-[#1A4D87] hover:!text-white font-semibold"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                              >
                                <child.icon
                                  size={16}
                                  className={
                                    isChildItemActive
                                      ? "!text-white shrink-0"
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
                    className={`w-full px-8 py-5 rounded-xl transition-all ${
                      isActive
                        ? "!bg-[#1A4D87] !text-white hover:!bg-[#1A4D87] hover:!text-white font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <item.icon
                      size={18}
                      className={
                        isActive
                          ? "!text-white shrink-0"
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

      {/* FOOTER */}
      <SidebarFooter className='bg-white border-t border-slate-100 px-3 py-3'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => router.push("/login")}
              className='w-full px-8 py-5 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-600 transition-all group'
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
