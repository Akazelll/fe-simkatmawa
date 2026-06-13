"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  lookupService,
  LookupItem,
} from "@/features/submission/services/lookupService";
import { useDebounce } from "@/features/shared/hooks/useDebounce";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onPick: (m: LookupItem) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export function DosenNameAutocomplete({
  value,
  onChange,
  onPick,
  placeholder,
  className,
  required,
}: Props) {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<LookupItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Mencegah API terpanggil setiap kali tombol ditekan (jeda 300ms)
  const debouncedSearch = useDebounce(value, 300);

  // Menutup dropdown jika user klik di luar kotak
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Fetching data dari lookupService
  useEffect(() => {
    async function fetchDosen() {
      if (debouncedSearch.trim().length < 2) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const data = await lookupService.searchDosen(debouncedSearch);
        setResults(data);
      } catch (err) {
        setError("Gagal mengambil data dosen pembimbing.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchDosen();
  }, [debouncedSearch]);

  const handlePick = (dosen: LookupItem) => {
    onPick(dosen);
    setOpen(false);
  };

  const showDropdown = open && value.trim().length >= 2;

  return (
    <div ref={wrapperRef} className='relative w-full'>
      <Input
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          if (value.trim().length >= 2) {
            setOpen(true);
          }
        }}
        placeholder={placeholder}
        required={required}
        autoComplete='off'
        className={className}
      />

      {isLoading && (
        <Loader2
          size={16}
          className='absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 animate-spin pointer-events-none'
        />
      )}

      {showDropdown && (
        <div className='absolute z-[999] mt-2 w-full bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden max-h-72 overflow-y-auto'>
          {isLoading && results.length === 0 ? (
            <div className='px-4 py-3 text-sm text-slate-500 flex items-center gap-2'>
              <Loader2 size={14} className='animate-spin' />
              Mencari...
            </div>
          ) : error ? (
            <div className='px-4 py-3 text-sm text-rose-600'>{error}</div>
          ) : results.length === 0 ? (
            <div className='px-4 py-3 text-sm text-slate-500'>
              Tidak ada hasil untuk{" "}
              <span className='font-semibold text-slate-700'>
                &ldquo;{value}&rdquo;
              </span>
            </div>
          ) : (
            <ul className='divide-y divide-slate-100'>
              {results.map((dosen) => (
                <li key={dosen.id}>
                  <button
                    type='button'
                    onClick={() => handlePick(dosen)}
                    className='w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors'
                  >
                    <div className='flex flex-col gap-0.5 min-w-0'>
                      <span className='text-sm font-semibold text-slate-800 truncate'>
                        {dosen.nama}
                      </span>
                      <span className='text-xs text-slate-500 font-mono'>
                        {dosen.nuptk ? `NUPTK: ${dosen.nuptk}` : "Tanpa NUPTK"}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
