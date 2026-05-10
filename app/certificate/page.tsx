"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import {
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
import { Card } from "@/components/ui/card";
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

interface Certificate {
  id: string;
  name: string;
  level: string;
  penyelenggara: string;
  status:
    | "Pending"
    | "Rejected"
    | "Approved_Unsynced"
    | "Sync_Failed"
    | "Sync_Success";
  tanggal: Date;
}

const ALL_DATA: Certificate[] = [
  {
    id: "ACH-001",
    name: "Juara 1 Competitive Programming",
    level: "Nasional",
    penyelenggara: "Universitas Indonesia",
    status: "Sync_Success",
    tanggal: new Date("2026-01-15"),
  },
  {
    id: "ACH-002",
    name: "Finalis UI/UX Design Competition",
    level: "Regional",
    penyelenggara: "Dicoding Indonesia",
    status: "Pending",
    tanggal: new Date("2026-02-10"),
  },
  {
    id: "ACH-003",
    name: "Best Innovation Project",
    level: "Internasional",
    penyelenggara: "Google Developer Student Club",
    status: "Approved_Unsynced",
    tanggal: new Date("2026-03-05"),
  },
  {
    id: "ACH-004",
    name: "Juara 2 Hackathon Cyber Security",
    level: "Nasional",
    penyelenggara: "Kominfo",
    status: "Sync_Failed",
    tanggal: new Date("2026-03-22"),
  },
  {
    id: "ACH-005",
    name: "Peserta Web Development Bootcamp",
    level: "Lokal",
    penyelenggara: "Universitas Dian Nuswantoro",
    status: "Rejected",
    tanggal: new Date("2026-04-01"),
  },
  {
    id: "ACH-006",
    name: "Juara 3 Mobile App Competition",
    level: "Nasional",
    penyelenggara: "Telkom Indonesia",
    status: "Sync_Success",
    tanggal: new Date("2026-04-18"),
  },
  {
    id: "ACH-007",
    name: "Top 10 Data Science Challenge",
    level: "Internasional",
    penyelenggara: "Kaggle",
    status: "Pending",
    tanggal: new Date("2026-05-02"),
  },
  {
    id: "ACH-008",
    name: "Best Presenter Seminar Teknologi",
    level: "Regional",
    penyelenggara: "IEEE Student Branch",
    status: "Approved_Unsynced",
    tanggal: new Date("2026-05-09"),
  },
];

const PAGE_SIZE = 8;
const KATEGORI = [
  "Semua Kategori",
  "Nasional",
  "Regional",
  "Internasional",
  "Lokal",
];
const STATUSES = [
  "Semua Status",
  "Pending",
  "Rejected",
  "Approved_Unsynced",
  "Sync_Failed",
  "Sync_Success",
];

function AvatarUser({ initials, color }: { initials: string; color: string }) {
  return (
    <span
      className='inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white'
      style={{ backgroundColor: color }}
    >
      {initials}
    </span>
  );
}

export default function SertifikatPage() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [grade, setGrade] = React.useState("Semua Kategori");
  const [status, setStatus] = React.useState("Semua Status");
  const [page, setPage] = React.useState(1);

  const filtered = ALL_DATA.filter((row) => {
    const matchSearch =
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.id.toLowerCase().includes(search.toLowerCase());
    const matchGrade = grade === "Semua Kategori" || row.level === grade;
    const matchStatus = status === "Semua Status" || row.status === status;
    return matchSearch && matchGrade && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goTo = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  React.useEffect(() => setPage(1), [search, grade, status]);

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold text-slate-800'>Sertifikat</h1>

          <p className='text-slate-600 text-sm'>
            Kelola data sertifikat mahasiswa
          </p>
        </div>

        <Button
          onClick={() => router.push("/certificate/create")}
          className='h-10 gap-2 bg-[#155DFC] hover:bg-[#124cb0] text-white font-bold text-sm rounded-xl shadow-sm px-5 transition-all hover:-translate-y-0.5'
        >
          <Plus size={16} />
          Tambah Sertifikat
        </Button>
      </div>
      <div className='flex flex-wrap items-center gap-3'>
        <div className='relative flex-1 min-w-[200px] max-w-xs'>
          <Search
            size={15}
            className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Cari Sertifikat...'
            className='pl-9 bg-white border-slate-200 text-sm h-10 rounded-xl shadow-sm focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81]'
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className='h-10 gap-2 inline-flex items-center px-4 bg-white border border-slate-200 text-slate-600 font-medium text-sm rounded-xl shadow-sm hover:bg-slate-50 transition-colors border-none'>
            {grade}
            <ChevronDown size={14} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='rounded-xl'>
            {KATEGORI.map((k) => (
              <DropdownMenuItem
                key={k}
                onClick={() => setGrade(k)}
                className='text-sm cursor-pointer'
              >
                {k}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className='h-10 gap-2 inline-flex items-center px-4 bg-white border border-slate-200 text-slate-600 font-medium text-sm rounded-xl shadow-sm hover:bg-slate-50 transition-colors border-none'>
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

        <Button
          variant='ghost'
          className='h-10 gap-2 text-slate-500 font-medium text-sm hover:bg-slate-100 rounded-xl'
        >
          <Filter size={15} />
          More Filters
        </Button>
      </div>

      <Card className='border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white'>
        <Table>
          <TableHeader>
            <TableRow className='border-slate-100 hover:bg-transparent'>
              <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
                Nama
              </TableHead>
              <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
                Level
              </TableHead>
              <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
                Penyelenggara
              </TableHead>
              <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
                Status
              </TableHead>
              <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
                Tanggal
              </TableHead>
              <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400 text-right pr-6'>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((row) => (
              <TableRow
                key={row.name}
                className='border-slate-100 hover:bg-slate-50/70 transition-colors'
              >
                <TableCell className='pl-6 font-semibold text-sm text-slate-600'>
                  {row.name}
                </TableCell>

                <TableCell className='text-sm text-slate-600'>
                  {row.level}
                </TableCell>

                <TableCell className='text-sm text-slate-600'>
                  {row.penyelenggara}
                </TableCell>

                <TableCell>
                  <Badge
                    className={`rounded-full px-3 py-0.5 text-xs font-semibold border-0 ${row.status === "Sync_Success" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell className='text-sm text-slate-600'>
                  {new Date(row.tanggal).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className='pr-6 text-right'>
                  <div className='flex items-center justify-end gap-1.5'>
                    <button className='p-1.5 rounded-lg text-sky-500 hover:bg-sky-50 transition-colors'>
                      <Eye size={16} />
                    </button>
                    <button className='p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 transition-colors'>
                      <Pencil size={16} />
                    </button>
                    <button className='p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors'>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <div className='flex items-center justify-between px-6 py-4 border-t border-slate-100'>
        <button
          onClick={() => goTo(page - 1)}
          disabled={page === 1}
          className='text-sm font-semibold text-slate-500 disabled:opacity-30 flex items-center gap-1'
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <div className='flex gap-1.5'>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goTo(p)}
              className={`size-8 rounded-md text-sm font-bold ${p === page ? "bg-[#0F4C81] text-white" : "text-slate-500"}`}
            >
              {p}
            </button>
          ))}
        </div>
        <button
          onClick={() => goTo(page + 1)}
          disabled={page === totalPages}
          className='text-sm font-semibold text-slate-500 disabled:opacity-30 flex items-center gap-1'
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
