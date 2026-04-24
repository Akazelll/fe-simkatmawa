"use client";

import Link from 'next/link';
import React from 'react';
import { 
  Plus, Search, SlidersHorizontal, ChevronLeft, ChevronRight, 
  Eye, Edit3, Trash2, ChevronDown, Bell, User,
} from 'lucide-react';
import { 
  flexRender, 
  getCoreRowModel, 
  getPaginationRowModel, 
  useReactTable,
  ColumnDef
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- DATA ---
type SertifikatData = {
  id: string; initials: string; fullName: string; category: string; dateCreated: string; comment: string; status: string;
};

const columns: ColumnDef<SertifikatData>[] = [
  { accessorKey: "id", header: "NO" },
  {
    accessorKey: "fullName",
    header: "KEGIATAN",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="w-8 h-8 border border-slate-100">
          <AvatarFallback className="bg-blue-50 text-blue-700 font-bold text-[10px]">{row.original.initials}</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-slate-800 text-sm">{row.original.fullName}</span>
      </div>
    ),
  },
  { accessorKey: "category", header: "KATEGORI" },
  { accessorKey: "dateCreated", header: "TANGGAL" },
  { accessorKey: "comment", header: "KOMENTAR" },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: () => <Badge className="rounded-full px-3 py-0.5 text-[10px] font-bold bg-green-50 text-green-700 border-green-200">Active</Badge>,
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: () => (
      <div className="flex items-center gap-1 justify-end">
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full text-blue-500 cursor-pointer"><Eye size={16} /></Button>
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full text-green-500 cursor-pointer"><Edit3 size={16} /></Button>
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full text-red-500 cursor-pointer"><Trash2 size={16} /></Button>
      </div>
    ),
  },
];

const dataSertifikat: SertifikatData[] = [
  { id: "STD001", initials: "EW", fullName: "Emma Wilson", category: "Nasional", dateCreated: "12/04/2026", comment: "-", status: "Active" },
  { id: "STD002", initials: "MC", fullName: "Michael Chen", category: "Internasional", dateCreated: "11/04/2026", comment: "-", status: "Active" },
];

export default function SertifikatPage() {
  const table = useReactTable({
    data: dataSertifikat, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* 1. HEADER HALAMAN (Nama User & Notifikasi) */}
      <header className="px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-20">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Sertifikat</h2>
                {/* Sapaan menyesuaikan ukuran layar */}
                <p className="text-slate-500 text-xs sm:text-sm font-medium">Kelola data sertifikat mahasiswa</p>
              </div>
      
              <div className="flex items-center gap-2 sm:gap-4">
                <Button variant="ghost" size="icon" className="text-slate-400 cursor-pointer hidden xs:flex">
                  <Bell size={20} />
                </Button>
                
                <div className="h-8 w-px bg-slate-200 hidden sm:block" />
                
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Info teks disembunyikan di layar sangat kecil agar tidak sempit */}
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-800 leading-none">Syakira Fara</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Mahasiswa</p>
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-50 rounded-full flex items-center justify-center text-[#003580] border border-blue-100 shadow-sm">
                    <User size={18} />
                  </div>
                </div>
              </div>
            </header>

      <div className="p-4 md:p-8 space-y-4 md:space-y-6">
        
        {/* 2. FILTER & TAMBAH SECTION */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3 flex-1 w-full">
            <div className="relative w-full sm:w-auto sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input placeholder="Cari sertifikat..." className="pl-10 h-10 bg-white border-slate-200 rounded-lg text-sm w-full" />
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 gap-2 rounded-lg border-slate-200 text-xs font-semibold cursor-pointer">
                    Semua Kategori <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-xl"><DropdownMenuItem className="cursor-pointer text-xs">Sains</DropdownMenuItem></DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 gap-2 rounded-lg border-slate-200 text-xs font-semibold cursor-pointer">
                    Semua Status <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-xl"><DropdownMenuItem className="cursor-pointer text-xs">Active</DropdownMenuItem></DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" className="h-10 gap-2 text-slate-500 text-xs font-bold cursor-pointer hidden md:flex">
                <SlidersHorizontal size={14} /> More Filters
              </Button>
            </div>
          </div>

          <Link href="/sertifikat/tambah" className="w-full sm:w-auto">
            <Button className="bg-[#003178] hover:bg-[#002a66] text-white font-bold rounded-lg gap-2 h-10 px-5 cursor-pointer shadow-sm w-full sm:w-auto">
              <Plus size={16} /> Tambah Sertifikat
            </Button>
          </Link>
        </div>

        {/* 3. TABLE */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="font-bold text-slate-500 text-[10px] uppercase py-3 px-3 md:px-6 whitespace-nowrap">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 px-3 md:px-6 text-slate-700 text-sm font-medium whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* 4. PAGINATION */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="gap-1 md:gap-2 text-slate-500 font-bold cursor-pointer hover:bg-slate-100 h-9 text-xs md:text-sm"
            onClick={() => table.previousPage()}
          >
            <ChevronLeft size={16} /> <span className="hidden sm:inline">Previous</span>
          </Button>
          
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((p) => (
              <Button key={p} variant={p === 1 ? "default" : "ghost"} className={`w-8 h-8 rounded-lg text-xs font-bold cursor-pointer ${p === 1 ? "bg-[#003178]" : ""}`}>
                {p}
              </Button>
            ))}
          </div>

          <Button 
            variant="ghost" 
            className="gap-1 md:gap-2 text-slate-500 font-bold cursor-pointer hover:bg-slate-100 h-9 text-xs md:text-sm"
            onClick={() => table.nextPage()}
          >
            <span className="hidden sm:inline">Next</span> <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}