"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck } from "lucide-react";

export function SettingsInfoAlert() {
  return (
    <Alert className='bg-blue-50 border-blue-100 text-blue-800 flex items-start p-4 rounded-xl shadow-sm'>
      <ShieldCheck className='w-5 h-5 text-blue-600 shrink-0 mt-0.5 mr-3' />
      <AlertDescription className='text-sm font-medium leading-relaxed'>
        Token login ke Kemdiktisaintek dikelola otomatis oleh sistem. Anda hanya
        perlu mengubah kredensial jika pihak Kemdiktisaintek mengganti email
        atau password akun API pusat.
      </AlertDescription>
    </Alert>
  );
}
