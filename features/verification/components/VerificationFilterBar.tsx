"use client";

import { memo, useEffect, useState, useMemo } from "react";
import { Search, X, SlidersHorizontal, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/features/shared/hooks/useDebounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TipeKegiatan, VerifikasiQueryParams } from "../types";

interface VerificationFilterBarProps {
  tipeKegiatan: TipeKegiatan;
  params: VerifikasiQueryParams;
  updateParams: (newParams: Partial<VerifikasiQueryParams>) => void;
  total?: number;
}

const STATUS_CHIPS = [
  { value: "all", label: "Semua" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
  { value: "SYNC_SUCCESS", label: "Sync Sukses" },
  { value: "SYNC_FAILED", label: "Sync Gagal" },
];

const KATEGORI_OPTIONS = [
  { value: "all", label: "Semua Kategori" },
  { value: "RISNOV", label: "Inovasi Saintek (RISNOV)" },
  { value: "RISNOVSSH", label: "Inovasi Soshum (RISNOVSSH)" },
  { value: "SENBUD", label: "Seni Budaya (SENBUD)" },
  { value: "OLAHRAGA", label: "Olahraga" },
  { value: "MINAT", label: "Minat Khusus" },
];

const KATEGORI_LABELS = Object.fromEntries(KATEGORI_OPTIONS.map((o) => [o.value, o.label]));

const JENIS_GROUP_OPTIONS = [
  { value: "all", label: "Semua Jenis" },
  { value: "juri", label: "Juri" },
  { value: "keynote", label: "Keynote" },
  { value: "karya_seni", label: "Karya Seni" },
  { value: "buku", label: "Buku" },
  { value: "paten", label: "Paten" },
  { value: "publikasi", label: "Publikasi" },
  { value: "duta", label: "Duta" },
  { value: "produk", label: "Produk" },
];

const JENIS_GROUP_LABELS = Object.fromEntries(JENIS_GROUP_OPTIONS.map((o) => [o.value, o.label]));

const LEVEL_OPTIONS = [
  { value: "all", label: "Semua Level" },
  { value: "LOKAL", label: "Lokal" },
  { value: "WILAYAH", label: "Wilayah" },
  { value: "NASIONAL", label: "Nasional" },
  { value: "INTERNASIONAL", label: "Internasional" },
];

const LEVEL_LABELS = Object.fromEntries(LEVEL_OPTIONS.map((o) => [o.value, o.label]));

const LIMIT_OPTIONS = [10, 20, 50, 100];

function VerificationFilterBarComponent({
  tipeKegiatan,
  params,
  updateParams,
  total,
}: VerificationFilterBarProps) {
  // Input search lokal dengan debounce 400ms
  const [searchValue, setSearchValue] = useState(params.search ?? "");
  const debouncedSearch = useDebounce(searchValue, 400);

  // Propagasi pencarian ke parent ketika nilai debounce berubah
  useEffect(() => {
    const currentSearch = params.search ?? "";
    if (debouncedSearch !== currentSearch) {
      updateParams({ search: debouncedSearch ? debouncedSearch : undefined });
    }
  }, [debouncedSearch, params.search, updateParams]);

  // Handle toggle multi-select status chip
  const selectedStatuses = useMemo(() => {
    if (!params.status || params.status === "all") return ["all"];
    return params.status.split(",");
  }, [params.status]);

  const handleStatusClick = (value: string) => {
    if (value === "all") {
      updateParams({ status: "all" });
      return;
    }

    let current = selectedStatuses.filter((s) => s !== "all");
    if (current.includes(value)) {
      current = current.filter((s) => s !== value);
    } else {
      current.push(value);
    }

    if (current.length === 0) {
      updateParams({ status: "all" });
    } else {
      updateParams({ status: current.join(",") });
    }
  };

  // Generate opsi tahun
  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = currentYear; y >= 2020; y--) {
      years.push(String(y));
    }
    return years;
  }, []);

  return (
    <div className='w-full space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
      {/* Search Bar, Total Counter & Per Page Limit */}
      <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
        {/* Input Search */}
        <div className='relative flex-1 min-w-[260px]'>
          <Search
            size={18}
            className='absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400'
          />
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='Cari nama mahasiswa, NIM, atau nama kegiatan...'
            className='h-12 w-full rounded-2xl border-slate-200 bg-[#FAFAFA] pl-12 pr-10 text-sm shadow-none transition-colors focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#0F4C81]'
          />
          {searchValue && (
            <button
              type='button'
              onClick={() => {
                setSearchValue("");
                updateParams({ search: undefined });
              }}
              className='absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Total & Limit Dropdown */}
        <div className='flex items-center gap-3 shrink-0 self-end lg:self-auto'>
          {total !== undefined && (
            <div className='flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-600 shrink-0'>
              <Layers size={14} className='text-[#0F4C81]' />
              <span>
                Total: <strong className='text-sm text-slate-900 font-bold'>{total}</strong> data
              </span>
            </div>
          )}

          <div className='flex items-center gap-2'>
            <span className='text-sm font-semibold text-slate-500 whitespace-nowrap hidden sm:inline'>
              Tampilkan:
            </span>
            <Select
              value={String(params.limit ?? 10)}
              onValueChange={(val) => val && updateParams({ limit: Number(val) })}
            >
<SelectTrigger className='h-12 min-h-12 w-32 rounded-2xl border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-none flex items-center focus:ring-0 focus:ring-offset-0'>
              <SelectValue labels={Object.fromEntries(LIMIT_OPTIONS.map((l) => [String(l), `${l} data`]))} />
            </SelectTrigger>
              <SelectContent className='rounded-xl border-slate-200'>
                {LIMIT_OPTIONS.map((limit) => (
                  <SelectItem key={limit} value={String(limit)} className='text-sm'>
                    {limit} data
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Filter Status Chips */}
      <div className='flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none'>
        <span className='text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 shrink-0 flex items-center gap-1.5'>
          <SlidersHorizontal size={14} />
          Status:
        </span>
        {STATUS_CHIPS.map((chip) => {
          const isActive = selectedStatuses.includes(chip.value);
          return (
            <button
              key={chip.value}
              type='button'
              onClick={() => handleStatusClick(chip.value)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border cursor-pointer ${
                isActive
                  ? "bg-[#0F4C81] text-white border-[#0F4C81] shadow-sm"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Secondary Dropdowns Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-3 border-t border-slate-100'>
        {/* Kategori - Hanya Prestasi */}
        {tipeKegiatan === "prestasi" && (
          <div className='space-y-1.5'>
            <label className='text-xs font-bold text-slate-500 uppercase tracking-wider'>
              Kategori Prestasi
            </label>
            <Select
              value={params.kategori ?? "all"}
              onValueChange={(val) => val && updateParams({ kategori: val === "all" ? undefined : val })}
            >
              <SelectTrigger className='h-12 min-h-12 w-full rounded-2xl border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-none flex items-center focus:ring-0 focus:ring-offset-0'>
                <SelectValue labels={KATEGORI_LABELS} />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-slate-200'>
                {KATEGORI_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className='text-sm'>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Jenis Group - Hanya Rekognisi */}
        {tipeKegiatan === "rekognisi" && (
          <div className='space-y-1.5'>
            <label className='text-xs font-bold text-slate-500 uppercase tracking-wider'>
              Jenis Rekognisi
            </label>
            <Select
              value={params.jenis_group ?? "all"}
              onValueChange={(val) => val && updateParams({ jenis_group: val === "all" ? undefined : val })}
            >
              <SelectTrigger className='h-12 min-h-12 w-full rounded-2xl border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-none flex items-center focus:ring-0 focus:ring-offset-0'>
                <SelectValue labels={JENIS_GROUP_LABELS} />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-slate-200'>
                {JENIS_GROUP_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className='text-sm'>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Level Filter */}
        <div className='space-y-1.5'>
          <label className='text-xs font-bold text-slate-500 uppercase tracking-wider'>
            Level
          </label>
          <Select
            value={params.level ?? "all"}
            onValueChange={(val) => val && updateParams({ level: val === "all" ? undefined : val })}
          >
            <SelectTrigger className='h-12 min-h-12 w-full rounded-2xl border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-none flex items-center focus:ring-0 focus:ring-offset-0'>
              <SelectValue labels={LEVEL_LABELS} />
            </SelectTrigger>
            <SelectContent className='rounded-xl border-slate-200'>
              {LEVEL_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className='text-sm'>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tahun Filter */}
        <div className='space-y-1.5'>
          <label className='text-xs font-bold text-slate-500 uppercase tracking-wider'>
            Tahun
          </label>
          <Select
            value={params.tahun ? String(params.tahun) : "all"}
            onValueChange={(val) => updateParams({ tahun: !val || val === "all" ? undefined : val })}
          >
            <SelectTrigger className='h-12 min-h-12 w-full rounded-2xl border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-none flex items-center focus:ring-0 focus:ring-offset-0'>
              <SelectValue
                labels={{
                  all: "Semua Tahun",
                  ...Object.fromEntries(yearOptions.map((y) => [y, y])),
                }}
              />
            </SelectTrigger>
            <SelectContent className='rounded-xl border-slate-200'>
              <SelectItem value='all' className='text-sm'>
                Semua Tahun
              </SelectItem>
              {yearOptions.map((year) => (
                <SelectItem key={year} value={year} className='text-sm'>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export const VerificationFilterBar = memo(VerificationFilterBarComponent);
