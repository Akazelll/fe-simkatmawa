"use client";

export function PasswordMask({ hasPassword }: { hasPassword: boolean }) {
  if (!hasPassword) {
    return <span className='text-slate-400 italic'>Belum disimpan</span>;
  }

  return (
    <span className='font-mono font-bold tracking-widest text-slate-700'>
      ●●●●●●●●{" "}
      <span className='font-sans font-medium text-xs text-green-600 tracking-normal ml-1'>
        (Tersimpan)
      </span>
    </span>
  );
}
