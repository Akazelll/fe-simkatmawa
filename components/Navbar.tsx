"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, LogOut } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api, tokenStorage } from "@/lib/api";
import { Breadcrumbs } from "@/features/shared/components/Breadcrumbs";
import { NotificationDropdown } from "@/features/notification/components/NotificationDropdown";
import { useNotifications } from "@/features/notification/hooks/useNotifications";

interface UserData {
  id: string | number;
  name: string;
  email: string;
  mahasiswa?: { nim: string };
  dosen?: { nuptk: string };
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifWrapRef = useRef<HTMLDivElement>(null);
  const notif = useNotifications();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!notifWrapRef.current?.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/me");
        if (response.data?.success) {
          setUser(response.data.data);
        } else {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Gagal mengambil sesi pengguna:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Gagal melakukan revoking token di server:", error);
    } finally {
      localStorage.removeItem("token");
      if (tokenStorage) tokenStorage.clear();
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/login";
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "--";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
  };

  const getSubLabel = (currentUser: UserData | null) => {
    if (!currentUser) return "";
    return currentUser.email;
  };

  return (
    <header
      className={`sticky top-0 z-50 flex h-20 shrink-0 items-center justify-between px-8 transition-all duration-300 ${
        isScrolled
          ? "bg-white/20 backdrop-blur-md border-b border-slate-200"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className='flex items-center gap-4 min-w-0 flex-1'>
        <SidebarTrigger className='-ml-1 shrink-0' />
        {/* Tambahkan hidden sm:block pada garis pemisah */}
        <div className='h-4 w-px bg-slate-200 shrink-0 hidden sm:block' />
        {/* Tambahkan hidden sm:block pada pembungkus Breadcrumbs */}
        <div className='min-w-0 overflow-hidden hidden sm:block'>
          <Breadcrumbs />
        </div>
      </div>

      <div className='flex items-center gap-4 sm:gap-6'>
        <div ref={notifWrapRef} className='relative'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsNotifOpen((o) => !o)}
            aria-label='Notifikasi'
            className='relative text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full'
          >
            <Bell size={20} />
            {notif.unreadCount > 0 && (
              <span className='absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 inline-flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-white'>
                {notif.unreadCount > 9 ? "9+" : notif.unreadCount}
              </span>
            )}
          </Button>

          {isNotifOpen && (
            <NotificationDropdown
              items={notif.items}
              isLoading={notif.isLoading}
              onClose={() => setIsNotifOpen(false)}
              onMarkAsRead={notif.markAsRead}
              onMarkAllAsRead={notif.markAllAsRead}
            />
          )}
        </div>

        <div className='h-8 w-px bg-slate-200 hidden sm:block'></div>

        <DropdownMenu>
          <DropdownMenuTrigger className='flex items-center gap-3 cursor-pointer group hover:bg-slate-50 p-1.5 pr-2 rounded-xl transition-colors border-none bg-transparent outline-none'>
            <div className='flex flex-col items-end text-right hidden sm:flex'>
              <p className='text-sm font-bold text-slate-800 leading-none group-hover:text-[#0F4C81] transition-colors line-clamp-1 max-w-[180px]'>
                {isLoading ? "Memuat..." : user?.name}
              </p>
              <p className='text-[11px] text-slate-500 mt-1 tracking-wider'>
                {isLoading ? "..." : getSubLabel(user)}
              </p>
            </div>

            <Avatar className='h-9 w-9 border border-slate-100 shadow-sm'>
              <AvatarFallback className='bg-[#0F4C81] text-white text-xs font-semibold tracking-wider'>
                {isLoading ? "..." : getInitials(user?.name)}
              </AvatarFallback>
            </Avatar>

            <ChevronDown
              size={16}
              className='text-slate-400 transition-transform data-[state=open]:rotate-180'
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align='end'
            className='w-48 rounded-xl border-slate-100 shadow-sm mt-1 p-1'
          >
            <DropdownMenuItem
              onClick={handleLogout}
              className='cursor-pointer flex items-center justify-between py-2 focus:bg-red-50 text-red-600 focus:text-red-600 rounded-lg'
            >
              <span className='font-medium'>Logout</span>
              <LogOut size={16} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
