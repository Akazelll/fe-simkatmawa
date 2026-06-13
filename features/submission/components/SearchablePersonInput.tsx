// features/submission/components/SearchablePersonInput.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Check, ChevronsUpDown, Loader2, Search } from "lucide-react";
import { useDebounce } from "@/features/shared/hooks/useDebounce";
import {
  lookupService,
  LookupItem,
} from "@/features/submission/services/lookupService";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface SearchablePersonInputProps {
  type: "mahasiswa" | "dosen";
  value: string;
  onChange: (id: string, nama: string) => void;
  placeholder?: string;
  error?: boolean;
}

export function SearchablePersonInput({
  type,
  value,
  onChange,
  placeholder,
  error,
}: SearchablePersonInputProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState<LookupItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedLabel, setSelectedLabel] = useState<string>("");

  const debouncedSearch = useDebounce(searchQuery, 300);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!debouncedSearch) return;
    }

    const fetchOptions = async () => {
      if (!debouncedSearch) {
        setOptions([]);
        return;
      }

      setLoading(true);
      try {
        const data =
          type === "mahasiswa"
            ? await lookupService.searchMahasiswa(debouncedSearch)
            : await lookupService.searchDosen(debouncedSearch);

        setOptions(data);
      } catch (err) {
        console.error("Gagal mengambil data referensi", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [debouncedSearch, type]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal bg-slate-50",
            !value && "text-slate-400",
            error && "border-red-500 focus-visible:ring-red-500",
          )}
        >
          <span className='truncate'>
            {value ? selectedLabel || value : placeholder || `Cari ${type}...`}
          </span>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className='w-[var(--anchor-width,350px)] p-0'
        align='start'
      >
        <Command shouldFilter={false}>
          <div className='flex items-center border-b px-3'>
            <Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />
            <CommandInput
              placeholder={`Ketik nama ${type}...`}
              value={searchQuery}
              onValueChange={setSearchQuery}
              className='border-0 focus:ring-0'
            />
            {loading && (
              <Loader2 className='ml-2 h-4 w-4 animate-spin text-slate-400' />
            )}
          </div>

          <CommandList>
            {!loading && options.length === 0 && searchQuery && (
              <CommandEmpty className='py-4 text-center text-sm text-slate-500'>
                Data tidak ditemukan.
              </CommandEmpty>
            )}

            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.id}
                  onSelect={() => {
                    onChange(option.id, option.nama);
                    setSelectedLabel(option.label);
                    setOpen(false);
                  }}
                  className='cursor-pointer'
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className='truncate'>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
