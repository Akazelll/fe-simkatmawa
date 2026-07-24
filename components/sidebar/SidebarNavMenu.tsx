"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { NavItem, NavChild } from "./useSidebarNav";

interface SidebarNavMenuProps {
  items: NavItem[];
}

export function SidebarNavMenu({ items }: SidebarNavMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({
    "Daftar Prestasi": true,
    "Prestasi Mandiri": true,
    "Rekognisi": true,
    "Submission": true,
    "Verification": true,
  });

  const isPathActive = React.useCallback(
    (href?: string) => {
      if (!href) return false;

      if (href.includes("?")) {
        const [baseHref, queryStr] = href.split("?");
        const isBaseMatching =
          pathname === baseHref || pathname.startsWith(baseHref + "/");
        if (!isBaseMatching) return false;

        const hrefParams = new URLSearchParams(queryStr);
        let allParamsMatch = true;
        hrefParams.forEach((val, key) => {
          if (searchParams.get(key) !== val) {
            allParamsMatch = false;
          }
        });

        return allParamsMatch;
      }

      return pathname === href || pathname.startsWith(href + "/");
    },
    [pathname, searchParams],
  );

  const toggleMenu = (label: string) =>
    setOpenMenus((p) => ({ ...p, [label]: !p[label] }));

  // Helper untuk mengecek apakah child / subchild aktif
  const isChildTreeActive = React.useCallback(
    (child: NavChild): boolean => {
      if (child.href && isPathActive(child.href)) return true;
      if (child.children) {
        return child.children.some((sub) => isChildTreeActive(sub));
      }
      return false;
    },
    [isPathActive],
  );

  const renderChildItem = (child: NavChild, depth = 1) => {
    const isChildActive = isChildTreeActive(child);
    const isOpen = openMenus[child.label] ?? isChildActive;

    if (child.children && child.children.length > 0) {
      return (
        <React.Fragment key={child.label}>
          <SidebarMenuSubItem>
            <Tooltip>
              <TooltipTrigger render={<div className='w-full flex' />}>
                <SidebarMenuSubButton
                  onClick={() => toggleMenu(child.label)}
                  className={`px-2.5 py-1.5 flex items-center justify-between gap-2 rounded-lg transition-colors cursor-pointer w-full ${
                    isChildActive
                      ? "text-[#1A4D87] font-semibold bg-slate-100/80"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className='flex items-center gap-2 min-w-0 flex-1 pr-1'>
                    <child.icon
                      size={14}
                      className={
                        isChildActive ? "text-[#1A4D87] shrink-0" : "text-slate-400 shrink-0"
                      }
                      strokeWidth={1.8}
                    />
                    <span className='font-medium text-[12.5px] truncate'>{child.label}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp
                      size={13}
                      className={isChildActive ? "text-[#1A4D87] shrink-0" : "text-slate-400 shrink-0"}
                    />
                  ) : (
                    <ChevronDown
                      size={13}
                      className={isChildActive ? "text-[#1A4D87] shrink-0" : "text-slate-400 shrink-0"}
                    />
                  )}
                </SidebarMenuSubButton>
              </TooltipTrigger>
              <TooltipContent side='right' align='center' className='font-semibold text-xs bg-slate-900 text-white shadow-md z-50'>
                {child.label}
              </TooltipContent>
            </Tooltip>
          </SidebarMenuSubItem>

          {isOpen && (
            <SidebarMenuSub className='mx-0 px-0 ml-2.5 pl-2 border-l border-slate-200/60 gap-0.5 my-0.5'>
              {child.children.map((subChild) => renderChildItem(subChild, depth + 1))}
            </SidebarMenuSub>
          )}
        </React.Fragment>
      );
    }

    const isDirectActive = child.href ? isPathActive(child.href) : false;

    return (
      <SidebarMenuSubItem key={child.label}>
        <Tooltip>
          <TooltipTrigger render={<div className='w-full flex' />}>
            <SidebarMenuSubButton
              onClick={() => child.href && router.push(child.href)}
              isActive={isDirectActive}
              className={`px-2.5 py-1.5 flex items-center gap-2 rounded-lg transition-colors cursor-pointer w-full ${
                isDirectActive
                  ? "bg-[#1A4D87]! text-white! hover:bg-[#1A4D87]! hover:text-white! font-semibold shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <child.icon
                size={14}
                className={
                  isDirectActive ? "text-white! shrink-0" : "text-slate-400 shrink-0"
                }
                strokeWidth={1.8}
              />
              <span className='font-medium text-[12px] truncate'>{child.label}</span>
            </SidebarMenuSubButton>
          </TooltipTrigger>
          <TooltipContent side='right' align='center' className='font-semibold text-xs bg-slate-900 text-white shadow-md z-50'>
            {child.label}
          </TooltipContent>
        </Tooltip>
      </SidebarMenuSubItem>
    );
  };

  return (
    <TooltipProvider delay={200}>
      <SidebarMenu className='gap-0.5'>
        {items.map((item) => {
          const isOpen = openMenus[item.label] ?? false;
          const isActive = item.href ? isPathActive(item.href) : false;
          const isChildActive = item.children?.some((child) => isChildTreeActive(child));

          if (item.children) {
            return (
              <React.Fragment key={item.label}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => toggleMenu(item.label)}
                    className={`w-full px-4 py-3 min-h-[44px] flex items-center gap-3 rounded-xl transition-colors ${
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
                    <span className='flex-1 text-[13px] text-left font-semibold truncate'>
                      {item.label}
                    </span>
                    {isOpen ? (
                      <ChevronUp
                        size={14}
                        className={isChildActive ? "text-[#1A4D87] shrink-0" : "text-slate-400 shrink-0"}
                      />
                    ) : (
                      <ChevronDown
                        size={14}
                        className={isChildActive ? "text-[#1A4D87] shrink-0" : "text-slate-400 shrink-0"}
                      />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {isOpen && (
                  <SidebarMenuSub className='mx-0 px-0 ml-3.5 pl-2 border-l border-slate-100 gap-0.5'>
                    {item.children.map((child) => renderChildItem(child))}
                  </SidebarMenuSub>
                )}
              </React.Fragment>
            );
          }

          return (
            <SidebarMenuItem key={item.label}>
              <Tooltip>
                <TooltipTrigger render={<div className='w-full flex' />}>
                  <SidebarMenuButton
                    isActive={isActive}
                    onClick={() => router.push(item.href!)}
                    className={`w-full px-4 py-3 min-h-[44px] flex items-center gap-3 rounded-xl transition-colors ${
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
                      className={`text-[13px] truncate ${isActive ? "font-semibold" : "font-medium"}`}
                    >
                      {item.label}
                    </span>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side='right' align='center' className='font-semibold text-xs bg-slate-900 text-white shadow-md z-50'>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </TooltipProvider>
  );
}
