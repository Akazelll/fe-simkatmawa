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
  search: string;
  setSearch: (val: string) => void;
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
        {/* Search */}
        <div className='relative flex-1'>
          <Search
            size={18}
            className='absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400'
          />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className='h-[48px] w-full rounded-2xl border-slate-200 bg-[#FAFAFA] pl-12 pr-4 text-sm leading-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0'
          />
        </div>

        {/* Status */}
        {statuses && setStatus && status !== undefined && (
          <Select
            value={status}
            onValueChange={(val) => {
              if (val) setStatus(val);
            }}
          >
            <SelectTrigger className='h-[48px] min-h-[48px] w-full lg:w-[170px] rounded-2xl border-slate-200 bg-white px-4 text-sm leading-none shadow-none flex items-center focus:ring-0 focus:ring-offset-0'>
              <SelectValue placeholder='All Status' />
            </SelectTrigger>

            <SelectContent className='rounded-xl border-slate-200'>
              {statuses.map((s) => (
                <SelectItem key={s} value={s} className='h-11 text-sm'>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Category */}
        {categories && setCategory && category !== undefined && (
          <Select
            value={category}
            onValueChange={(val) => {
              if (val) setCategory(val);
            }}
          >
            <SelectTrigger className='h-[48px] min-h-[48px] w-full lg:w-[170px] rounded-2xl border-slate-200 bg-white px-4 text-sm leading-none shadow-none flex items-center focus:ring-0 focus:ring-offset-0'>
              <SelectValue placeholder='All Levels' />
            </SelectTrigger>

            <SelectContent className='rounded-xl border-slate-200'>
              {categories.map((c) => (
                <SelectItem key={c} value={c} className='h-11 text-sm'>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Year */}
        {years && setYear && year !== undefined && (
          <Select
            value={year}
            onValueChange={(val) => {
              if (val) setYear(val);
            }}
          >
            <SelectTrigger className='h-[48px] min-h-[48px] w-full lg:w-[170px] rounded-2xl border-slate-200 bg-white px-4 text-sm leading-none shadow-none flex items-center focus:ring-0 focus:ring-offset-0'>
              <SelectValue placeholder='All Years' />
            </SelectTrigger>

            <SelectContent className='rounded-xl border-slate-200'>
              {years.map((y) => (
                <SelectItem key={y} value={y} className='h-11 text-sm'>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
