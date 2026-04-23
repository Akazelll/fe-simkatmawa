"use client";

import * as React from "react";
import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className='flex h-20 shrink-0 items-center justify-between border-b bg-white px-8'>
      <div className='flex items-center gap-4'>
        <SidebarTrigger className='-ml-1' />
        <div className='h-4 w-px bg-slate-200' />
        <h1 className='text-lg font-bold text-slate-800'>{title}</h1>
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
          <DropdownMenuTrigger className='flex items-center gap-3 cursor-pointer group hover:bg-slate-50 p-1.5 pr-2 rounded-xl transition-colors border-none bg-transparent outline-none text-left'>
            <div className='text-right hidden sm:block'>
              <p className='text-sm font-bold text-slate-800 leading-none group-hover:text-[#0F4C81] transition-colors'>
                Adam Raga
              </p>
              <p className='text-[11px] text-slate-500 mt-1'>A11.2024.15598</p>
            </div>
            <Avatar className='h-9 w-9 border border-slate-100 shadow-sm'>
              <AvatarFallback className='bg-[#0F4C81] text-white text-xs font-semibold'>
                AR
              </AvatarFallback>
            </Avatar>
            <ChevronDown
              size={16}
              className='text-slate-400 transition-transform data-[state=open]:rotate-180'
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align='end'
            className='w-56 rounded-xl border-slate-100 shadow-sm mt-1'
          >
            <DropdownMenuLabel className='font-bold text-slate-700'>
              Akun Saya
            </DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-slate-100' />
            <DropdownMenuItem className='cursor-pointer gap-2 py-2 text-slate-600 focus:bg-slate-50'>
              <User size={16} />
              <span className='font-medium'>Profil Lengkap</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              variant='destructive'
              className='cursor-pointer gap-2 py-2 focus:bg-red-50'
            >
              <LogOut size={16} />
              <span className='font-medium'>Keluar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
