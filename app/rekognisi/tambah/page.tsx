"use client";

import React from 'react';
import { 
  Users, Lightbulb, GraduationCap, Save, 
  Link as LinkIcon, ChevronLeft, Bell, User,
  AlertCircle, FileText, Image as ImageIcon
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from 'next/navigation';

export default function TambahRekognisiPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* HEADER */}
      <header className="flex justify-between items-center bg-white p-4 px-4 md:p-6 md:px-8 border-b border-slate-100 sticky top-0 z-20">
        <div className="flex flex-col">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-slate-400 hover:text-[#003580] font-bold text-[10px] uppercase tracking-widest transition-colors cursor-pointer w-fit mb-2 md:mb-3 group"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Daftar
          </button>
          <div>
            <h2 className="text-base md:text-xl font-extrabold text-slate-900 tracking-tight leading-none">Form Rekognisi Baru</h2>
            <p className="text-slate-500 text-[10px] md:text-[11px] font-medium mt-1.5 hidden sm:block">Lengkapi formulir berikut untuk menambahkan data rekognisi baru.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="text-slate-400 rounded-full cursor-pointer hover:bg-slate-50">
            <Bell size={20} />
          </Button>
          <div className="h-8 w-px bg-slate-200" />
          <div className="flex items-center gap-2 md:gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800 leading-none">Syakira Fara</p>
              <p className="text-[10px] text-slate-400 font-extrabold uppercase mt-1 tracking-widest">Mahasiswa</p>
            </div>
            <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#003580] border border-blue-100">
              <User size={18} />
            </div>
          </div>
        </div>
      </header>

      {/* BODY CONTENT */}
      <main className="max-w-6xl mx-auto w-full p-4 md:p-8 pb-20 space-y-6 md:space-y-10">
        
        {/* SECTION 1: DATA MAHASISWA */}
        <section className="bg-white p-5 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-5 md:space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-50 text-[#003580] rounded-xl flex items-center justify-center">
              <Users size={18} />
            </div>
            <h3 className="text-sm md:text-base font-bold text-slate-800">Data Mahasiswa</h3>
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

        {/* SECTION 2: DETAIL REKOGNISI */}
        <section className="bg-white p-5 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-5 md:space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-50 text-[#003580] rounded-xl flex items-center justify-center">
              <Lightbulb size={18} />
            </div>
            <h3 className="text-sm md:text-base font-bold text-slate-800">Detail Rekognisi</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 md:gap-y-6">
            <FormItem label="Kategori Kegiatan Rekognisi" placeholder="Hak Cipta / Buku" />
            <FormItem label="Nama Kegiatan" placeholder="Karya dan Publikasi" />
            
            <FormItem label="Tanggal Mulai Pelaksanaan" type="date" />
            <FormItem label="Tanggal Akhir Pelaksanaan" type="date" />

            <div className="md:col-span-2">
              <FormItem label="URL Kegiatan / URL Jurnal / URL Artikel" placeholder="https://..." icon={<LinkIcon size={14}/>} />
            </div>

            <FormItem label="Foto Kegiatan" placeholder="https://..." icon={<ImageIcon size={14}/>} />
            <FormItem label="Sertifikat / Piagam" placeholder="https://..." icon={<FileText size={14}/>} />
            
            <div className="md:col-span-2">
              <FormItem label="Scan Surat Pengakuan" placeholder="https://..." icon={<FileText size={14}/>} />
            </div>
          </div>
        </section>

        {/* SECTION 3: DATA KARYA */}
        <section className="bg-white p-5 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-5 md:space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-slate-50 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-50 text-[#003580] rounded-xl flex items-center justify-center">
                <FileText size={18} />
              </div>
              <h3 className="text-sm md:text-base font-bold text-slate-800">Data Karya</h3>
            </div>
            {/* ALERT INFO - full width on mobile, inline on desktop */}
            <div className="flex items-start md:items-center gap-2 bg-[#7A3E00] text-white px-3 py-2 md:px-4 rounded-lg text-[10px] font-medium">
              <AlertCircle size={14} className="shrink-0 mt-0.5 md:mt-0" />
              <span>Form ini hanya diisi oleh peserta dengan kategori yang menghasilkan karya (Buku, Artikel/Jurnal, Paten, dll).</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 md:gap-y-6">
            <FormItem label="Nama Lembaga/Mitra" placeholder="Contoh: Penerbit Andi, Jurnal Internasional Q1" />
            <FormSelect label="Jenis Karya" placeholder="Pilih jenis karya..." items={["Buku", "Artikel", "Paten", "HAKI"]} />
            
            <div className="md:col-span-2 space-y-2">
              <Label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">Deskripsi Karya</Label>
              <Textarea 
                placeholder="Jelaskan secara singkat substansi dan kontribusi karya yang dihasilkan..." 
                className="bg-slate-50 border-slate-200 rounded-xl min-h-[100px] focus-visible:ring-blue-100 text-sm"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">Manfaat Karya</Label>
              <Textarea 
                placeholder="Apa dampak atau manfaat dari karya ini bagi masyarakat atau institusi?" 
                className="bg-slate-50 border-slate-200 rounded-xl min-h-[100px] focus-visible:ring-blue-100 text-sm"
              />
            </div>

            <FormItem label="Nomor Surat Keterangan Pengakuan" placeholder="Masukkan nomor surat atau ID registrasi" />
            <FormItem label="Tanggal Surat" type="date" />
          </div>
        </section>

        {/* SECTION 4: DOSEN PEMBIMBING */}
        <section className="bg-white p-5 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-5 md:space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-50 text-[#003580] rounded-xl flex items-center justify-center">
              <GraduationCap size={18} />
            </div>
            <h3 className="text-sm md:text-base font-bold text-slate-800">Data Dosen Pembimbing</h3>
          </div>
          <div className="grid grid-cols-1 gap-5 md:gap-6">
            <FormSelect 
              label="NIDN/NIDK Dosen Pembimbing" 
              placeholder="0813039004 - Ir. Gede Surya Mahendra, S.Pd., M.Kom." 
              items={["Ir. Gede Surya Mahendra", "Dosen Lainnya"]} 
            />
            <FormItem label="Surat Tugas Dosen Pembimbing" placeholder="https://..." icon={<LinkIcon size={14}/>} />
          </div>
        </section>

        {/* PERNYATAAN & BUTTONS */}
        <div className="bg-white p-5 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6 md:space-y-8">
          <div className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-blue-50/50 rounded-xl border border-blue-100">
            <Checkbox id="terms" className="mt-1 border-blue-300 data-[state=checked]:bg-[#003580] cursor-pointer shrink-0" />
            <Label htmlFor="terms" className="text-xs md:text-[13px] leading-relaxed text-slate-600 font-medium cursor-pointer">
              Dengan ini, saya menyatakan bahwa data yang saya input adalah benar dan sesuai dengan kenyataan. Apabila di kemudian hari ditemukan ketidaksesuaian, saya siap menerima sanksi yang berlaku.
            </Label>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 md:gap-4">
            <Button variant="ghost" onClick={() => router.back()} className="px-6 md:px-8 h-11 font-bold text-slate-500 cursor-pointer w-full sm:w-auto">
              Batal
            </Button>
            <Button className="bg-[#003580] hover:bg-[#002a66] px-6 md:px-10 h-11 font-bold rounded-xl shadow-lg shadow-blue-900/10 cursor-pointer text-white w-full sm:w-auto">
              <Save size={18} className="mr-2" />
              Simpan Data
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper Components
function FormItem({ label, placeholder, type = "text", icon }: any) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">
        {label} <span className="text-red-500">*</span>
      </Label>
      <div className="relative w-full">
        <Input 
          type={type} 
          placeholder={placeholder} 
          className="bg-slate-50 border-slate-200 h-11 rounded-xl w-full focus-visible:ring-blue-100 transition-all focus:bg-white text-sm" 
        />
        {icon && <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">{icon}</div>}
      </div>
    </div>
  );
}

function FormSelect({ label, placeholder, items }: any) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">
        {label} <span className="text-red-500">*</span>
      </Label>
      <Select>
        <SelectTrigger className="bg-slate-50 border-slate-200 h-11 rounded-xl w-full text-slate-600 text-sm">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {items.map((item: string) => (
            <SelectItem key={item} value={item.toLowerCase()} className="cursor-pointer text-sm">
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}