"use client";

import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

interface UserData {
  id: string | number;
  name: string;
  email: string;
  mahasiswa?: { nim: string };
  dosen?: { nuptk: string };
}

export function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      router.push("/login");
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
      <div className='flex items-center gap-4'>
        <SidebarTrigger className='-ml-1' />
        <div className='h-4 w-px bg-slate-200' />
      </div>

      <div className='flex items-center gap-4 sm:gap-6'>
        <Button
          variant='ghost'
          size='icon'
          className='relative text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full'
        >
          <Bell size={20} />
          <span className='absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white'></span>
        </Button>

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
