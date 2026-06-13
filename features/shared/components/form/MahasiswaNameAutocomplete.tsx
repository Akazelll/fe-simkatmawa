"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useMahasiswaSearch } from "@/features/shared/hooks/useMahasiswaSearch";
import { MahasiswaSearchResult } from "@/features/shared/services/mahasiswaService";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onPick: (m: MahasiswaSearchResult) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export function MahasiswaNameAutocomplete({
  value,
  onChange,
  onPick,
  placeholder,
  className,
  required,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { results, isLoading, error } = useMahasiswaSearch(value);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handlePick = (mahasiswa: MahasiswaSearchResult) => {
    onPick(mahasiswa);
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
              {results.map((mahasiswa) => (
                <li key={mahasiswa.nim}>
                  <button
                    type='button'
                    onClick={() => handlePick(mahasiswa)}
                    className='w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors'
                  >
                    <div className='flex flex-col gap-0.5 min-w-0'>
                      <span className='text-sm font-semibold text-slate-800 truncate'>
                        {mahasiswa.nama}
                      </span>

                      <span className='text-xs text-slate-500 font-mono'>
                        {mahasiswa.nim}
                        {mahasiswa.program_studi && (
                          <span className='text-slate-300'>
                            {" "}
                            · {mahasiswa.program_studi}
                          </span>
                        )}
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
