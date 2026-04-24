"use client";

import React from 'react';
import { 
  Users, Trophy, GraduationCap, Save, 
  Link as LinkIcon, ChevronLeft, Bell, User 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from 'next/navigation';

export default function TambahPrestasiPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* HEADER UTAMA */}
      <header className="px-4 md:px-8 py-4 md:py-6 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="flex flex-col gap-1">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-slate-400 hover:text-[#003580] font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer w-fit"
          >
            <ChevronLeft size={14} />
            Kembali ke Daftar
          </button>
          <h2 className="text-base md:text-xl font-bold text-slate-900 tracking-tight">Tambah Prestasi Baru</h2>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="text-slate-400 cursor-pointer">
            <Bell size={20} />
          </Button>
          <div className="h-8 w-px bg-slate-200" />
          <div className="flex items-center gap-2 md:gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800 leading-none">Syakira Fara</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Mahasiswa</p>
            </div>
            <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 border border-blue-100">
              <User size={18} />
            </div>
          </div>
        </div>
      </header>

      {/* ISI FORM */}
      <main className="p-4 md:p-8 space-y-6 md:space-y-10 max-w-5xl">
        
        {/* SECTION 1: PESERTA LOMBA */}
        <section className="bg-white p-5 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-5 md:space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-50 text-[#003580] rounded-xl flex items-center justify-center">
              <Users size={18} />
            </div>
            <h3 className="text-sm md:text-base font-bold text-slate-800">Peserta Lomba</h3>
          </div>
          
          <div className="space-y-2">
            <Label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">
              NIM Ketua dan Anggota Kelompok <span className="text-red-500">*</span>
            </Label>
            <Input 
              placeholder="Contoh: A11.2021.12345 (Ketua), A11.2021.12346 (Anggota 1), ..." 
              className="bg-slate-50 border-slate-200 h-11 rounded-xl w-full focus-visible:ring-blue-100 text-sm"
            />
          </div>
        </section>

        {/* SECTION 2: DETAIL LOMBA */}
        <section className="bg-white p-5 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-5 md:space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-50 text-[#003580] rounded-xl flex items-center justify-center">
              <Trophy size={18} />
            </div>
            <h3 className="text-sm md:text-base font-bold text-slate-800">Detail Lomba</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 md:gap-y-6">
            <FormItem label="Nama Lomba" placeholder="Esai Nasional" />
            <FormItem label="Penyelenggara Kegiatan" placeholder="DIKTISAINTEK" />
            <FormSelect label="Jenis Kepesertaan" placeholder="Individu" items={["Individu", "Kelompok"]} />
            <FormSelect label="Kategori" placeholder="Nasional" items={["Nasional", "Internasional"]} />
            <FormSelect label="Jumlah PT Terlibat" placeholder=">= 21 PT" items={["< 5 PT", "5-20 PT", ">= 21 PT"]} />
            <FormSelect label="Jumlah Negara" placeholder="Pilih..." items={["1 Negara", ">= 5 Negara"]} />
            <FormItem label="Jumlah Peserta" placeholder="Contoh: 100" />
            <FormSelect label="Capaian" placeholder="Pilih Capaian..." items={["Juara 1", "Juara 2", "Juara 3"]} />
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <FormItem label="Tgl Mulai" type="date" />
              <FormItem label="Tgl Akhir" type="date" />
            </div>
            <FormSelect label="Jenis Prestasi" placeholder="Pilih..." items={["Sains", "Seni", "Olahraga"]} />
            <FormSelect label="Mode Pelaksanaan" placeholder="Luring" items={["Luring", "Daring"]} />
            <FormItem label="URL Sertifikat" placeholder="https://..." icon={<LinkIcon size={16}/>} />
          </div>
        </section>

        {/* SECTION 3: DOSEN PEMBIMBING */}
        <section className="bg-white p-5 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-5 md:space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-50 text-[#003580] rounded-xl flex items-center justify-center">
              <GraduationCap size={18} />
            </div>
            <h3 className="text-sm md:text-base font-bold text-slate-800">Data Dosen Pembimbing</h3>
          </div>
          <div className="grid grid-cols-1 gap-5 md:gap-6">
            <FormSelect label="Nama Dosen" placeholder="Pilih Dosen..." items={["Ir. Gede Surya Mahendra", "Dosen Lainnya"]} />
            <FormItem label="Link Surat Tugas" placeholder="https://..." icon={<LinkIcon size={16}/>} />
          </div>
        </section>

        {/* PERNYATAAN & AKSI */}
        <div className="bg-white p-5 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6 md:space-y-8">
          <div className="flex items-start gap-3 md:gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
            <Checkbox id="terms" className="mt-1 border-blue-300 data-[state=checked]:bg-[#003580] cursor-pointer shrink-0" />
            <Label htmlFor="terms" className="text-xs md:text-sm leading-relaxed text-slate-600 font-medium cursor-pointer">
                Dengan ini, saya menyatakan bahwa data yang saya input adalah benar dan sesuai dengan kenyataan. Apabila di kemudian hari ditemukan ketidaksesuaian atau kesalahan data, saya siap menerima sanksi sesuai ketentuan yang berlaku.
            </Label>
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 md:gap-4">
            <Button variant="ghost" onClick={() => router.back()} className="px-6 md:px-8 h-11 font-bold text-slate-500 cursor-pointer w-full sm:w-auto">Batal</Button>
            <Button className="bg-[#003580] hover:bg-[#002a66] px-6 md:px-10 h-11 font-bold rounded-xl shadow-lg shadow-blue-900/10 cursor-pointer text-white w-full sm:w-auto">
              <Save size={18} /> Simpan Data
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helpers
function FormItem({ label, placeholder, type = "text", icon }: any) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">{label} *</Label>
      <div className="relative w-full">
        <Input type={type} placeholder={placeholder} className="bg-slate-50 border-slate-200 h-11 rounded-xl w-full text-sm" />
        {icon && <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">{icon}</div>}
      </div>
    </div>
  );
}

function FormSelect({ label, placeholder, items }: any) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">{label} *</Label>
      <Select>
        <SelectTrigger className="bg-slate-50 border-slate-200 h-11 rounded-xl w-full text-sm">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="rounded-xl">{items.map((i:any) => <SelectItem key={i} value={i.toLowerCase()} className="text-sm">{i}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  );
}