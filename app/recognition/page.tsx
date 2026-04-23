"use client";

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

interface Rekognisi {
  id: string;
  name: string;
  initials: string;
  color: string;
  grade: string;
  komentar: string;
  status: "Active" | "Inactive";
}

/* ─── Dummy data ─────────────────────────────────────────────── */
const ALL_DATA: Rekognisi[] = [
  {
    id: "STD001",
    name: "Emma Wilson",
    initials: "EW",
    color: "#6366f1",
    grade: "Grade 10",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD002",
    name: "Michael Chen",
    initials: "MC",
    color: "#0ea5e9",
    grade: "Grade 10",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD003",
    name: "Sophia Rodriguez",
    initials: "SR",
    color: "#10b981",
    grade: "Grade 11",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD004",
    name: "James Anderson",
    initials: "JA",
    color: "#f59e0b",
    grade: "Grade 9",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD005",
    name: "Olivia Brown",
    initials: "OB",
    color: "#ec4899",
    grade: "Grade 12",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD006",
    name: "William Taylor",
    initials: "WT",
    color: "#14b8a6",
    grade: "Grade 10",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD007",
    name: "Ava Martinez",
    initials: "AM",
    color: "#8b5cf6",
    grade: "Grade 11",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD008",
    name: "Ethan Davis",
    initials: "ED",
    color: "#f97316",
    grade: "Grade 9",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD009",
    name: "Mia Thompson",
    initials: "MT",
    color: "#06b6d4",
    grade: "Grade 10",
    komentar: "-",
    status: "Inactive",
  },
  {
    id: "STD010",
    name: "Noah Garcia",
    initials: "NG",
    color: "#84cc16",
    grade: "Grade 11",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD011",
    name: "Isabella Lee",
    initials: "IL",
    color: "#e11d48",
    grade: "Grade 12",
    komentar: "-",
    status: "Active",
  },
  {
    id: "STD012",
    name: "Liam Walker",
    initials: "LW",
    color: "#7c3aed",
    grade: "Grade 9",
    komentar: "-",
    status: "Inactive",
  },
];

const PAGE_SIZE = 8;
const GRADE = ["Semua Grade", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
const STATUSES = ["Semua Status", "Active", "Inactive"];

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

export default function RekognisiPage() {
  const [search, setSearch] = React.useState("");
  const [grade, setGrade] = React.useState("Semua Grade");
  const [status, setStatus] = React.useState("Semua Status");
  const [page, setPage] = React.useState(1);

  const filtered = ALL_DATA.filter((row) => {
    const matchSearch =
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.id.toLowerCase().includes(search.toLowerCase());
    const matchGrade = grade === "Semua Grade" || row.grade === grade;
    const matchStatus = status === "Semua Status" || row.status === status;
    return matchSearch && matchGrade && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goTo = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  React.useEffect(() => setPage(1), [search, grade, status]);

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <div className='flex flex-wrap items-center gap-3'>
        <div className='relative flex-1 min-w-[200px] max-w-xs'>
          <Search
            size={15}
            className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Cari Rekognisi...'
            className='pl-9 bg-white border-slate-200 text-sm h-10 rounded-xl shadow-sm focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81]'
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className='h-10 gap-2 inline-flex items-center px-4 bg-white border border-slate-200 text-slate-600 font-medium text-sm rounded-xl shadow-sm hover:bg-slate-50 transition-colors border-none'>
            {grade}
            <ChevronDown size={14} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='rounded-xl'>
            {GRADE.map((k) => (
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

        <div className='flex-1' />

        <Button className='h-10 gap-2 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-bold text-sm rounded-xl shadow-sm px-5 transition-all hover:-translate-y-0.5'>
          <Plus size={16} />
          Tambah Rekognisi
        </Button>
      </div>

      <Card className='border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white'>
        <Table>
          <TableHeader>
            <TableRow className='border-slate-100 hover:bg-transparent'>
              <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400 pl-6 w-32'>
                No
              </TableHead>
              <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
                Nama
              </TableHead>
              <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
                Grade
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
            {paginated.map((row) => (
              <TableRow
                key={row.id}
                className='border-slate-100 hover:bg-slate-50/70 transition-colors'
              >
                <TableCell className='pl-6 font-semibold text-sm text-slate-600'>
                  {row.id}
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2.5'>
                    <AvatarUser initials={row.initials} color={row.color} />
                    <span className='font-medium text-sm text-slate-700'>
                      {row.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className='text-sm text-slate-600'>
                  {row.grade}
                </TableCell>
                <TableCell className='text-sm text-slate-400'>
                  {row.komentar}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`rounded-full px-3 py-0.5 text-xs font-semibold border-0 ${row.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}
                  >
                    {row.status}
                  </Badge>
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
