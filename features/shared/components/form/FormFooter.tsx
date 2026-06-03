"use client";

import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface FormFooterProps {
  onSubmit?: () => void;
  onCancel?: () => void;
  backHref?: string;
  submitLabel?: string;
}

export function FormFooter({
  onSubmit,
  onCancel,
  backHref,
  submitLabel = "Simpan Data",
}: FormFooterProps) {
  const router = useRouter();

  const handleCancel = () => {
    if (onCancel) return onCancel();
    if (backHref) return router.push(backHref);
    router.back();
  };

  return (
    <div className='flex items-center justify-between gap-3 pt-2'>
      <Button
        type='button'
        variant='ghost'
        onClick={handleCancel}
        className='gap-2 rounded-xl px-5 h-11 font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors'
      >
        <ArrowLeft size={16} />
        Kembali
      </Button>

      <Button
        type='submit'
        onClick={onSubmit}
        className='gap-2 rounded-xl px-6 h-11 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-bold shadow-sm transition-all hover:-translate-y-0.5'
      >
        <Save size={16} />
        {submitLabel}
      </Button>
    </div>
  );
}
