"use client";

import * as React from "react";
import Image from "next/image";
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
  Recycle,
  Award,
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

// Import Auth Hooks dan RBAC Permission Helper
import { useAuth } from "@/features/auth/hooks/use-auth";
import { hasRole } from "@/lib/auth/permissions";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const pathname = usePathname();

  // Ambil state current user dan fungsi logout
  const { currentUser, logout } = useAuth();

  const isPathActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({
    Submission: true,
  });

  const toggleMenu = (label: string) =>
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));

  // Render navigation item dinamis sesuai role yang sedang login
  const navItems = React.useMemo(() => {
    const items: any[] = [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
      },
    ];

    if (hasRole(currentUser, "mahasiswa")) {
      items.push(
        {
          label: "Submission",
          icon: Award,
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
      );
    }

    if (hasRole(currentUser, ["admin", "superadmin"])) {
      items.push(
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
          label: "Activity Log",
          icon: Activity,
          href: "/activity",
        },
      );
    }

    if (hasRole(currentUser, "superadmin")) {
      items.push(
        {
          label: "User Management",
          icon: UserCheck,
          href: "/user-management",
        },
        {
          label: "Recycle Bin",
          icon: Recycle,
          href: "/recycle-bin",
        },
        {
          label: "Settings",
          icon: Settings,
          href: "/settings",
        },
      );
    }

    return items;
  }, [currentUser]);

  return (
    <Sidebar className='border-r border-slate-100 bg-white' {...props}>
      <SidebarHeader className='h-20 justify-center px-5 bg-white border-b border-slate-100'>
        <div className='flex items-center gap-3 px-4 py-6'>
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

      <SidebarContent className='bg-white px-3 py-3'>
        <SidebarGroup>
          <SidebarMenu className='gap-0.5'>
            {navItems.map((item) => {
              const isOpen = openMenus[item.label] ?? false;
              const isActive = item.href ? isPathActive(item.href) : false;
              const isChildActive = item.children?.some((child: any) =>
                isPathActive(child.href),
              );

              if (item.children) {
                return (
                  <React.Fragment key={item.label}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => toggleMenu(item.label)}
                        className={`w-full px-8 py-6 rounded-xl transition-colors ${
                          isChildActive
                            ? "bg-transparent text-[#1A4D87] hover:bg-slate-50 hover:text-[#1A4D87] font-semibold"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <item.icon
                          size={18}
                          className={
                            isChildActive
                              ? "text-[#1A4D87] shrink-0"
                              : "text-slate-400 shrink-0"
                          }
                          strokeWidth={2}
                        />

                        <span className='flex-1 text-[13px]'>{item.label}</span>

                        {isOpen ? (
                          <ChevronUp
                            size={14}
                            className={
                              isChildActive
                                ? "text-[#1A4D87]"
                                : "text-slate-400"
                            }
                          />
                        ) : (
                          <ChevronDown
                            size={14}
                            className={
                              isChildActive
                                ? "text-[#1A4D87]"
                                : "text-slate-400"
                            }
                          />
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* SUB MENU */}
                    {isOpen && (
                      <SidebarMenuSub className='ml-4 pl-3 border-l border-slate-100 gap-0.5'>
                        {item.children.map((child: any) => {
                          const isChildItemActive = isPathActive(child.href);

                          return (
                            <SidebarMenuSubItem key={child.label}>
                              <SidebarMenuSubButton
                                onClick={() => router.push(child.href)}
                                isActive={isChildItemActive}
                                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                                  isChildItemActive
                                    ? "bg-[#1A4D87]! text-white! hover:bg-[#1A4D87]! hover:text-white! font-semibold shadow-sm"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                              >
                                <child.icon
                                  size={16}
                                  className={
                                    isChildItemActive
                                      ? "text-white! shrink-0"
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
                    className={`w-full px-8 py-5 rounded-xl transition-colors ${
                      isActive
                        ? "bg-[#1A4D87]! text-white! hover:bg-[#1A4D87]! hover:text-white! font-semibold shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <item.icon
                      size={18}
                      className={
                        isActive
                          ? "text-white! shrink-0"
                          : "text-slate-400 shrink-0"
                      }
                      strokeWidth={2}
                    />

                    <span
                      className={`text-[13px] ${
                        isActive ? "font-semibold" : "font-medium"
                      }`}
                    >
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
              onClick={() => logout()}
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
