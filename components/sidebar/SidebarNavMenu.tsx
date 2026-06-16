"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { NavItem } from "./useSidebarNav";

interface SidebarNavMenuProps {
  items: NavItem[];
}

export function SidebarNavMenu({ items }: SidebarNavMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({
    Submission: true,
    Verification: true,
  });

  const isPathActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");
  const toggleMenu = (label: string) =>
    setOpenMenus((p) => ({ ...p, [label]: !p[label] }));

  return (
    <SidebarMenu className='gap-0.5'>
      {items.map((item) => {
        const isOpen = openMenus[item.label] ?? false;
        const isActive = item.href ? isPathActive(item.href) : false;
        const isChildActive = item.children?.some((child) =>
          isPathActive(child.href),
        );

        if (item.children) {
          return (
            <React.Fragment key={item.label}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => toggleMenu(item.label)}
                  className={`w-full px-8 py-6 flex items-center gap-3 rounded-xl transition-colors ${
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
                  <span className='flex-1 text-[13px] text-left'>
                    {item.label}
                  </span>
                  {isOpen ? (
                    <ChevronUp
                      size={14}
                      className={
                        isChildActive ? "text-[#1A4D87]" : "text-slate-400"
                      }
                    />
                  ) : (
                    <ChevronDown
                      size={14}
                      className={
                        isChildActive ? "text-[#1A4D87]" : "text-slate-400"
                      }
                    />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>

              {isOpen && (
                <SidebarMenuSub className='ml-4 pl-3 border-l border-slate-100 gap-0.5'>
                  {item.children.map((child) => {
                    const isChildItemActive = isPathActive(child.href);
                    return (
                      <SidebarMenuSubItem key={child.label}>
                        <SidebarMenuSubButton
                          onClick={() => router.push(child.href)}
                          isActive={isChildItemActive}
                          className={`px-3 py-2 flex items-center gap-3 rounded-lg transition-colors cursor-pointer ${
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
              className={`w-full px-8 py-5 flex items-center gap-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-[#1A4D87]! text-white! hover:bg-[#1A4D87]! hover:text-white! font-semibold shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon
                size={18}
                className={
                  isActive ? "text-white! shrink-0" : "text-slate-400 shrink-0"
                }
                strokeWidth={2}
              />
              <span
                className={`text-[13px] ${isActive ? "font-semibold" : "font-medium"}`}
              >
                {item.label}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
