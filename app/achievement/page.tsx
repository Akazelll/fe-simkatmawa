"use client";

import * as React from "react";
import {
  Bell,
  ChevronDown,
  Eye,
  Filter,
  Pencil,
  Plus,
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* ─── Types ─────────────────────────────────────────────────── */
interface Prestasi {
  id: string;
  name: string;
  initials: string;
  color: string;
  kegiatan: string;
  komentar: string;
  status: "Active" | "Inactive";
}

/* ─── Dummy data ─────────────────────────────────────────────── */
const ALL_DATA: Prestasi[] = [
  {
    id: "STD001",
    name: "Emma Wilson",
    initials: "EW",
    color: "#6366f1",
    kegiatan: "Grade 10",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD002",
    name: "Michael Chen",
    initials: "MC",
    color: "#0ea5e9",
    kegiatan: "Grade 10",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD003",
    name: "Sophia Rodriguez",
    initials: "SR",
    color: "#10b981",
    kegiatan: "Grade 11",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD004",
    name: "James Anderson",
    initials: "JA",
    color: "#f59e0b",
    kegiatan: "Grade 9",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD005",
    name: "Olivia Brown",
    initials: "OB",
    color: "#ec4899",
    kegiatan: "Grade 12",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD006",
    name: "William Taylor",
    initials: "WT",
    color: "#14b8a6",
    kegiatan: "Grade 10",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD007",
    name: "Ava Martinez",
    initials: "AM",
    color: "#8b5cf6",
    kegiatan: "Grade 11",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD008",
    name: "Ethan Davis",
    initials: "ED",
    color: "#f97316",
    kegiatan: "Grade 9",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD009",
    name: "Mia Thompson",
    initials: "MT",
    color: "#06b6d4",
    kegiatan: "Grade 10",
    komentar: "-",
    status: "Inactive",
  },
  {
    id: "STD010",
    name: "Noah Garcia",
    initials: "NG",
    color: "#84cc16",
    kegiatan: "Grade 11",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD011",
    name: "Isabella Lee",
    initials: "IL",
    color: "#e11d48",
    kegiatan: "Grade 12",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD012",
    name: "Liam Walker",
    initials: "LW",
    color: "#7c3aed",
    kegiatan: "Grade 9",
    komentar: "-",
    status: "Inactive",
  },
];

const PAGE_SIZE = 8;
const KATEGORI = [
  "Semua Kategori",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];
const STATUSES = ["Semua Status", "Active", "Inactive"];

/* ─── Avatar ────────────────────────────────────────────────── */
function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span
      className='inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white'
      style={{ backgroundColor: color }}
    >
      {initials}
    </span>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function PrestasiPage() {
  const [search, setSearch] = React.useState("");
  const [kategori, setKategori] = React.useState("Semua Kategori");
  const [status, setStatus] = React.useState("Semua Status");
  const [page, setPage] = React.useState(1);

  /* Filtering */
  const filtered = ALL_DATA.filter((row) => {
    const matchSearch =
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.id.toLowerCase().includes(search.toLowerCase());
    const matchKategori =
      kategori === "Semua Kategori" || row.kegiatan === kategori;
    const matchStatus = status === "Semua Status" || row.status === status;
    return matchSearch && matchKategori && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goTo = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  React.useEffect(() => setPage(1), [search, kategori, status]);

  return (
    <div className='flex flex-col gap-6 p-6 min-h-full bg-[#f8f9fc]'>
      {/* ── Top bar ─────────────────────────────────────────── */}
      <div className='flex items-start justify-between'>
        <div>
          <h1 className='text-2xl font-extrabold text-slate-800 tracking-tight'>
            Prestasi
          </h1>
          <p className='text-sm text-slate-400 mt-0.5 font-medium'>
            Kelola data prestasi mahasiswa
          </p>
        </div>

        <div className='flex items-center gap-3'>
          <button className='relative p-2 rounded-full hover:bg-slate-100 transition-colors'>
            <Bell size={20} className='text-slate-500' />
            <span className='absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500' />
          </button>
          <div className='text-right'>
            <p className='text-sm font-bold text-slate-700 leading-tight'>
              John Doe
            </p>
            <p className='text-xs text-slate-400 font-medium'>Mahasiswa</p>
          </div>
          <div className='flex size-9 items-center justify-center rounded-full bg-slate-200 text-slate-500'>
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <circle cx='12' cy='8' r='4' />
              <path d='M4 20c0-4 3.6-7 8-7s8 3 8 7' />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Filters + CTA ───────────────────────────────────── */}
      <div className='flex flex-wrap items-center gap-3'>
        {/* Search */}
        <div className='relative flex-1 min-w-[200px] max-w-xs'>
          <Search
            size={15}
            className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Cari prestasi...'
            className='pl-9 bg-white border-slate-200 text-sm h-10 rounded-xl shadow-sm focus-visible:ring-[#1a2b5e]/20 focus-visible:border-[#1a2b5e]'
          />
        </div>

        {/* Kategori */}
        <DropdownMenu>
          <DropdownMenuTrigger className='h-10 gap-2 inline-flex items-center px-4 bg-white border border-slate-200 text-slate-600 font-medium text-sm rounded-xl shadow-sm hover:bg-slate-50 transition-colors'>
            {kategori}
            <ChevronDown size={14} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='rounded-xl'>
            {KATEGORI.map((k) => (
              <DropdownMenuItem
                key={k}
                onClick={() => setKategori(k)}
                className='text-sm cursor-pointer'
              >
                {k}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status */}
        <DropdownMenu>
          <DropdownMenuTrigger className='h-10 gap-2 inline-flex items-center px-4 bg-white border border-slate-200 text-slate-600 font-medium text-sm rounded-xl shadow-sm hover:bg-slate-50 transition-colors'>
            {status}
            <ChevronDown size={14} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='rounded-xl'>
            {STATUSES.map((s) => (
              <DropdownMenuItem
                key={s}
                onClick={() => setStatus(s)}
                className='text-sm cursor-pointer'
              >
                {s}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* More Filters */}
        <Button
          variant='ghost'
          className='h-10 gap-2 text-slate-500 font-medium text-sm hover:bg-slate-100 rounded-xl'
        >
          <Filter size={15} />
          More Filters
        </Button>

        <div className='flex-1' />

        {/* Tambah Prestasi */}
        <Button className='h-10 gap-2 bg-[#1a2b5e] hover:bg-[#243570] text-white font-bold text-sm rounded-xl shadow-md shadow-[#1a2b5e]/25 px-5 transition-all hover:-translate-y-0.5'>
          <Plus size={16} />
          Tambah Prestasi
        </Button>
      </div>

      {/* ── Table ───────────────────────────────────────────── */}
      <div className='bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow className='border-slate-100 hover:bg-transparent'>
              <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400 pl-6 w-32'>
                No
              </TableHead>
              <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
                Kegiatan
              </TableHead>
              <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
                Tanggal Dibuat
              </TableHead>
              <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
                Komentar
              </TableHead>
              <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
                Status
              </TableHead>
              <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400 text-right pr-6'>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className='text-center py-16 text-slate-400 text-sm'
                >
                  Tidak ada data ditemukan
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((row) => (
                <TableRow
                  key={row.id}
                  className='border-slate-100 hover:bg-slate-50/70 transition-colors'
                >
                  <TableCell className='pl-6 font-semibold text-sm text-slate-600'>
                    {row.id}
                  </TableCell>

                  <TableCell>
                    <div className='flex items-center gap-2.5'>
                      <Avatar initials={row.initials} color={row.color} />
                      <span className='font-medium text-sm text-slate-700'>
                        {row.name}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className='text-sm text-slate-600'>
                    {row.kegiatan}
                  </TableCell>
                  <TableCell className='text-sm text-slate-400'>
                    {row.komentar}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={`rounded-full px-3 py-0.5 text-xs font-semibold border-0 ${
                        row.status === "Active"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {row.status}
                    </Badge>
                  </TableCell>

                  <TableCell className='pr-6'>
                    <div className='flex items-center justify-end gap-1.5'>
                      <button className='p-1.5 rounded-lg text-sky-500 hover:bg-sky-50 transition-colors'>
                        <Eye size={16} strokeWidth={2} />
                      </button>
                      <button className='p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 transition-colors'>
                        <Pencil size={16} strokeWidth={2} />
                      </button>
                      <button className='p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors'>
                        <Trash2 size={16} strokeWidth={2} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Pagination ──────────────────────────────────────── */}
      <div className='flex items-center justify-between px-1 pb-2'>
        <button
          onClick={() => goTo(page - 1)}
          disabled={page === 1}
          className='flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <div className='flex items-center gap-1.5'>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goTo(p)}
              className={`size-9 rounded-full text-sm font-bold transition-all ${
                p === page
                  ? "bg-[#1a2b5e] text-white shadow-md shadow-[#1a2b5e]/30"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={() => goTo(page + 1)}
          disabled={page === totalPages}
          className='flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
