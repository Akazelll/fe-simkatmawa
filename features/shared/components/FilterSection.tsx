"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSectionProps {
  search?: string;
  setSearch?: (val: string) => void;
  searchPlaceholder?: string;

  category?: string;
  setCategory?: (val: string) => void;
  categories?: string[];

  year?: string;
  setYear?: (val: string) => void;
  years?: string[];

  status?: string;
  setStatus?: (val: string) => void;
  statuses?: string[];
  statusLabel?: string;
}

export function FilterSection({
  search,
  setSearch,
  searchPlaceholder = "Search submissions...",

  category,
  setCategory,
  categories,

  year,
  setYear,
  years,

  status,
  setStatus,
  statuses,
}: FilterSectionProps) {
  return (
    <div className='w-full rounded-2xl border border-slate-200 bg-white p-6'>
      <div className='flex flex-col gap-4 lg:flex-row lg:items-center'>
        {search !== undefined && setSearch !== undefined && (
          <div className='relative flex-1 min-w-50'>
            <Search
              size={18}
              className='absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400'
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className='h-12 w-full rounded-2xl border-slate-200 bg-[#FAFAFA] pl-12 pr-4 text-sm leading-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0'
            />
          </div>
        )}

        {categories && setCategory && category !== undefined && (
          <Select
            value={category}
            onValueChange={(val) => val && setCategory(val)}
          >
            <SelectTrigger className='h-12 min-h-12 w-full lg:w-48 rounded-2xl border-slate-200 bg-white px-4 shadow-none flex items-center focus:ring-0 focus:ring-offset-0'>
              <div className='flex flex-col items-start justify-center gap-0.5 text-left w-full overflow-hidden'>
                <span className='text-sm font-semibold text-slate-700 leading-none block truncate'>
                  <SelectValue />
                </span>
              </div>
            </SelectTrigger>
            <SelectContent className='rounded-xl border-slate-200'>
              {categories.map((c) => (
                <SelectItem key={c} value={c} className='text-sm'>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {years && setYear && year !== undefined && (
          <Select value={year} onValueChange={(val) => val && setYear(val)}>
            <SelectTrigger className='h-12 min-h-12 w-full lg:w-42 rounded-2xl border-slate-200 bg-white px-4 shadow-none flex items-center focus:ring-0 focus:ring-offset-0'>
              <div className='flex flex-col items-start justify-center gap-0.5 text-left w-full overflow-hidden'>
                <span className='text-sm font-semibold text-slate-700 leading-none block truncate'>
                  <SelectValue />
                </span>
              </div>
            </SelectTrigger>
            <SelectContent className='rounded-xl border-slate-200'>
              {years.map((y) => (
                <SelectItem key={y} value={y} className='text-sm'>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {statuses && setStatus && status !== undefined && (
          <Select value={status} onValueChange={(val) => val && setStatus(val)}>
            <SelectTrigger className='h-12 min-h-12 w-full lg:w-48 rounded-2xl border-slate-200 bg-white px-4 shadow-none flex items-center focus:ring-0 focus:ring-offset-0'>
              <div className='flex flex-col items-start justify-center gap-0.5 text-left w-full overflow-hidden'>
                <span className='text-sm font-semibold text-slate-700 leading-none block truncate'>
                  <SelectValue />
                </span>
              </div>
            </SelectTrigger>
            <SelectContent className='rounded-xl border-slate-200'>
              {statuses.map((s) => (
                <SelectItem key={s} value={s} className='text-sm'>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
