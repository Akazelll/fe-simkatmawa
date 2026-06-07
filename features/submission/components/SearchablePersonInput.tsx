"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Search, UserRound, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/features/shared/hooks/useDebounce";

type SearchablePersonInputProps<T> = {
  label?: string;
  placeholder?: string;
  value?: T | null;
  disabled?: boolean;
  getOptionLabel: (item: T) => string;
  getOptionDescription?: (item: T) => string;
  onSearch: (query: string) => Promise<T[]>;
  onSelect: (item: T) => void;
  onClear?: () => void;
};

export function SearchablePersonInput<T>({
  label,
  placeholder = "Ketik nama atau nomor identitas...",
  value,
  disabled,
  getOptionLabel,
  getOptionDescription,
  onSearch,
  onSelect,
  onClear,
}: SearchablePersonInputProps<T>) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 350);

  useEffect(() => {
    if (value) {
      setQuery(getOptionLabel(value));
      setOptions([]);
      setOpen(false);
    }
  }, [value, getOptionLabel]);

  useEffect(() => {
    const fetchOptions = async () => {
      if (value) return;

      const keyword = debouncedQuery.trim();

      if (keyword.length < 2) {
        setOptions([]);
        setOpen(false);
        return;
      }

      try {
        setLoading(true);
        const result = await onSearch(keyword);
        setOptions(result);
        setOpen(true);
      } catch (error) {
        console.error("Gagal mengambil data sugesti:", error);
        setOptions([]);
        setOpen(false);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [debouncedQuery, onSearch, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClear = () => {
    setQuery("");
    setOptions([]);
    setOpen(false);
    onClear?.();
  };

  return (
    <div ref={wrapperRef} className='relative space-y-1.5'>
      {label && (
        <label className='text-sm font-semibold text-slate-700'>{label}</label>
      )}

      <div className='relative'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />

        <Input
          value={query}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);

            if (value) {
              onClear?.();
            }
          }}
          className='h-11 pl-9 pr-10'
        />

        {loading ? (
          <Loader2 className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-slate-400' />
        ) : query ? (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={handleClear}
            className='absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2'
          >
            <X className='h-4 w-4 text-slate-400' />
          </Button>
        ) : null}
      </div>

      {open && !value && (
        <div className='absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-xl border bg-white shadow-lg'>
          {options.length > 0 ? (
            options.map((item, index) => (
              <button
                key={index}
                type='button'
                onClick={() => {
                  onSelect(item);
                  setOpen(false);
                }}
                className='flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-slate-50'
              >
                <div className='mt-0.5 rounded-full bg-blue-50 p-2'>
                  <UserRound className='h-4 w-4 text-blue-600' />
                </div>

                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-semibold text-slate-800'>
                    {getOptionLabel(item)}
                  </p>

                  {getOptionDescription && (
                    <p className='mt-0.5 truncate text-xs text-slate-500'>
                      {getOptionDescription(item)}
                    </p>
                  )}
                </div>
              </button>
            ))
          ) : (
            <div className='px-4 py-3 text-sm text-slate-500'>
              Data tidak ditemukan.
            </div>
          )}
        </div>
      )}

      {!value && query.trim().length > 0 && query.trim().length < 2 && (
        <p className='text-xs text-slate-400'>
          Ketik minimal 2 karakter untuk mencari data.
        </p>
      )}
    </div>
  );
}
