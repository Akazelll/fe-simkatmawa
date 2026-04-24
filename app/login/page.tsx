"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast.success("Login Berhasil", {
      description: "Selamat datang kembali di SIMKATMAWA",
    });

    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col items-center justify-center p-4 sm:p-6 font-sans text-[#191C1E]">
      
      {/* LOGO & TITLE SECTION - Responsive Width */}
      <div className="flex flex-col items-center mb-6 text-center w-full max-w-[320px] sm:max-w-sm">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm border border-slate-100">
          <div className="w-7 h-7 bg-blue-100 rounded flex items-center justify-center">
            <span className="text-[#003178] font-bold italic text-xs">SIM</span>
          </div>
        </div>
        <h1 className="text-xl font-black text-[#003178] mb-1 tracking-tight uppercase">SIMKATMAWA</h1>
        <p className="text-[10px] leading-tight text-[#434652] font-semibold uppercase tracking-wider">
          Sistem Informasi Manajemen Pemeringkatan Kemahasiswaan
        </p>
      </div>

      {/* LOGIN CARD - Responsive Padding & Width */}
      <div className="w-full max-w-[450px] bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 mb-6 transition-all">
        <h2 className="text-xl font-bold text-[#191C1E] mb-1 text-center">Selamat Datang</h2>
        <p className="text-sm text-[#434652] mb-8 text-center">Masukkan email dan kata sandi anda</p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* EMAIL */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email" className="text-[10px] font-bold text-[#434652] uppercase ml-1">Email</Label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C3C6D4] z-10 group-focus-within:text-[#003178] transition-colors" />
              <Input 
                id="email"
                type="email" 
                placeholder="username@mhs.dinus.ac.id"
                className="pl-12 h-12 bg-[#F3F4F6] border-none rounded-xl focus-visible:ring-2 focus-visible:ring-[#003178]/20 text-sm"
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="grid w-full items-center gap-1.5">
            <div className="flex justify-between items-center px-1">
              <Label htmlFor="password" className="text-[10px] font-bold text-[#434652] uppercase">Kata Sandi</Label>
              <a href="#" className="text-[11px] font-bold text-[#003178] hover:underline">Lupa?</a>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C3C6D4] z-10 group-focus-within:text-[#003178] transition-colors" />
              <Input 
                id="password"
                type="password" 
                placeholder="••••••••••••"
                className="pl-12 h-12 bg-[#F3F4F6] border-none rounded-xl focus-visible:ring-2 focus-visible:ring-[#003178]/20 text-sm"
                required
              />
            </div>
          </div>

          {/* CHECKBOX - Mobile Friendly Target */}
          <div className="flex items-center space-x-3 pt-1 px-1">
            <input 
              type="checkbox" 
              id="keep"
              className="h-4 w-4 rounded border-slate-300 text-[#003178] accent-[#003178] cursor-pointer"
            />
            <label htmlFor="keep" className="text-[13px] text-[#434652] cursor-pointer font-medium select-none">Biarkan saya tetap masuk</label>
          </div>

          {/* BUTTON */}
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl text-sm font-bold text-white bg-[#003178] hover:bg-[#0D47A1] active:scale-[0.98] transition-all shadow-lg shadow-blue-900/10 cursor-pointer"
            >
              Masuk
            </Button>
          </div>
        </form>
      </div>

      {/* FOOTER */}
      <p className="text-[13px] text-[#434652] text-center px-4">
        Tidak punya akun? <a href="#" className="font-bold text-[#003178] hover:underline">Daftar</a>
      </p>

    </div>
  );
}