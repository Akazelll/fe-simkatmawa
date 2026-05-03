"use client";

import * as React from "react";
import Link from "next/link";
import {
  Trophy,
  UploadCloud,
  Users,
  Plus,
  Trash2,
  GraduationCap,
  SendHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateCertificatePage() {
  const [members, setMembers] = React.useState<string[]>([""]);
  const addMember = () => setMembers([...members, ""]);

  const removeMember = (index: number) => {
    if (members.length > 1) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const updateMember = (index: number, value: string) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500 max-w-4xl w-full mx-auto p-4 md:p-0'>
      <div className='flex items-center gap-3'>
        <div className='flex items-center justify-center bg-[#6CBDFE1A] p-2 rounded-xl'>
          <Users size={18} className='text-[#0F4C81]' />
        </div>
        <p className='text-sm font-bold text-slate-700 leading-none'>
          Data Mahasiswa
        </p>
      </div>

      <Card className='w-full shadow-sm rounded-2xl border-slate-200 overflow-hidden bg-white'>
        <CardContent className='p-6 md:p-8 flex flex-col gap-4'>
          <Label
            htmlFor='NIM'
            className='text-slate-700 font-semibold text-sm md:text-base'
          >
            NIM Ketua dan Anggota Kelompok
          </Label>

          <div className='flex flex-col gap-3'>
            {members.map((nim, index) => (
              <div
                key={index}
                className='flex items-center gap-2 animate-in slide-in-from-top-1 duration-200'
              >
                <div className='relative flex-1'>
                  <span className='absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-extrabold text-slate-400 uppercase tracking-tighter'>
                    NIM {index + 1}
                  </span>
                  <Input
                    value={nim}
                    onChange={(e) => updateMember(index, e.target.value)}
                    placeholder='Contoh: A11.2024.15598'
                    required
                    className='h-11 md:h-12 pl-16 bg-[#E6E8EB] border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all'
                  />
                </div>

                {index === 0 ? (
                  <Button
                    type='button'
                    onClick={addMember}
                    className='h-11 w-11 md:h-12 md:w-12 p-0 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white rounded-xl shadow-sm shrink-0'
                  >
                    <Plus size={20} strokeWidth={3} />
                  </Button>
                ) : (
                  <Button
                    type='button'
                    onClick={() => removeMember(index)}
                    variant='ghost'
                    className='h-11 w-11 md:h-12 md:w-12 p-0 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl shrink-0'
                  >
                    <Trash2 size={18} />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <p className='text-[11px] text-slate-400 font-medium italic'>
            *Klik tombol + untuk menambahkan anggota kelompok.
          </p>
        </CardContent>
      </Card>

      <div className='flex items-center gap-3'>
        <div className='flex items-center justify-center bg-[#6CBDFE1A] p-2 rounded-xl'>
          <Trophy size={18} className='text-[#0F4C81]' />
        </div>
        <p className='text-sm font-bold text-slate-700 leading-none'>
          Detail Kegiatan Sertifikasi
        </p>
      </div>

      <Card className='w-full shadow-sm rounded-2xl border-slate-200 overflow-hidden bg-white'>
        <CardContent className='p-6 md:p-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            <div className='flex flex-col gap-6 w-full'>
              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='sertifikat'
                  className='text-slate-700 font-bold text-sm'
                >
                  Nama Skema Sertifikasi <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='sertifikat'
                  type='text'
                  placeholder='Nama Sertifikat'
                  required
                  className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all'
                />
              </div>

              {/* Jenis Kepesertaan */}
              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='url-kegiatan'
                  className='text-slate-700 font-bold text-sm'
                >
                  URL KEGIATAN <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='url-kegiatan'
                  type='url'
                  placeholder='Contoh: https://drive.google.com/...'
                  required
                  className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all'
                />
              </div>

              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='url-sertifikat'
                  className='text-slate-700 font-bold text-sm'
                >
                  Sertifikat/Piagam Sertifikasi{" "}
                  <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='url-sertifikat'
                  type='url'
                  placeholder='Contoh: https://drive.google.com/...'
                  required
                  className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all'
                />
              </div>
            </div>

            <div className='hidden lg:flex flex-col gap-6 pt-2 w-full'>
              {/* 1. Penyelenggara Kegiatan */}
              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='penyelenggara'
                  className='text-slate-700 font-bold text-sm'
                >
                  Penyelenggara Kegiatan <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='penyelenggara'
                  type='text'
                  placeholder='Contoh: Fakultas Ilmu Komputer'
                  required
                  className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all'
                />
              </div>

              <div className='grid grid-cols-2 gap-4 w-full'>
                <div className='flex flex-col gap-2.5'>
                  <Label
                    htmlFor='date-start'
                    className='text-slate-700 font-bold text-sm'
                  >
                    Tanggal Sertfikasi
                  </Label>
                  <Input
                    id='date-start'
                    type='date'
                    required
                    className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all text-slate-600'
                  />
                </div>
              </div>

              {/* 2. Tingkat Lomba */}
              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='tingkat'
                  className='text-slate-700 font-bold text-sm'
                >
                  Kategori Sertifikasi <span className='text-red-500'>*</span>
                </Label>
                <Select required>
                  <SelectTrigger
                    id='tingkat'
                    className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus:ring-[#0F4C81]/20 transition-all text-slate-600'
                  >
                    <SelectValue placeholder='Kategori....' />
                  </SelectTrigger>
                  <SelectContent className='rounded-xl border-slate-200'>
                    <SelectItem value='kota'>Kabupaten/Kota</SelectItem>
                    <SelectItem value='provinsi'>Provinsi</SelectItem>
                    <SelectItem value='nasional'>Nasional</SelectItem>
                    <SelectItem value='internasional'>Internasional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='flex items-center gap-3'>
        <div className='flex items-center justify-center bg-[#6CBDFE1A] p-2 rounded-xl'>
          <GraduationCap size={18} className='text-[#0F4C81]' />
        </div>
        <p className='text-sm font-bold text-slate-700 leading-none'>
          Data Dosen Pembimbing
        </p>
      </div>
      <Card className='w-full shadow-sm rounded-2xl border-slate-200 overflow-hidden bg-white'>
        <CardContent className='p-6 md:p-10'>
          {/* Grid Container: Membagi menjadi 2 kolom pada layar besar (lg) agar sejajar dengan card lainnya */}
          <div className='flex flex-col gap-6 w-full'>
            {/* ── KOLOM KIRI: Daftar Form Inputs ── */}
            <div className='flex flex-col gap-6 w-full'>
              {/* Nama - NIP Dosen Pembimbing */}
              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='dospem'
                  className='text-slate-700 font-bold text-sm'
                >
                  Nama - NIP Dosen Pembimbing{" "}
                  <span className='text-red-500'>*</span>
                </Label>
                <Select required>
                  <SelectTrigger
                    id='dospem'
                    className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus:ring-[#0F4C81]/20 transition-all text-slate-600'
                  >
                    <SelectValue placeholder='Pilih Dosen Pembimbing' />
                  </SelectTrigger>
                  <SelectContent className='rounded-xl border-slate-200'>
                    <SelectItem value='Dr. Andi Wijaya - NIP. 123456789'>
                      Dr. Andi Wijaya - NIP. 123456789
                    </SelectItem>
                    <SelectItem value='Dr. Siti Rahma - NIP. 987654321'>
                      Dr. Siti Rahma - NIP. 987654321
                    </SelectItem>
                    <SelectItem value='Dr. Budi Santoso - NIP. 456789123'>
                      Dr. Budi Santoso - NIP. 456789123
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Surat Tugas Dosen Pembimbing */}
              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='url-surat-tugas'
                  className='text-slate-700 font-bold text-sm'
                >
                  URL Surat Tugas Dosen Pembimbing{" "}
                  <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='url-surat-tugas'
                  type='url'
                  placeholder='Contoh: https://drive.google.com/...'
                  required
                  className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all'
                />
              </div>
            </div>

            {/* ── KOLOM KANAN: Penyeimbang Layout ── */}
          </div>
        </CardContent>
      </Card>

      <Card className='w-full shadow-sm rounded-2xl border-slate-200 overflow-hidden bg-white'>
        <CardContent className='p-6 md:p-10 flex flex-col gap-8'>
          {/* ── SEKSI PERNYATAAN ── */}
          <div className='flex flex-col gap-4'>
            <Label
              htmlFor='form-pernyataan'
              className='text-slate-700 font-bold text-sm'
            >
              Form Pernyataan <span className='text-red-500'>*</span>
            </Label>

            {/* Checkbox Setuju */}
            <div className='flex items-start space-x-3 p-4 bg-slate-50/50 rounded-xl border border-slate-100'>
              <Checkbox
                id='terms'
                required
                className='mt-1 border-slate-300 data-[state=checked]:bg-[#0F4C81] data-[state=checked]:border-[#0F4C81]'
              />
              <div className='grid gap-1.5 leading-none'>
                <label
                  htmlFor='terms'
                  className='text-sm font-medium text-slate-600 leading-relaxed cursor-pointer select-none'
                >
                  Dengan ini, saya menyatakan bahwa data yang saya input adalah
                  benar dan sesuai dengan kenyataan. Apabila di kemudian hari
                  ditemukan ketidaksesuaian atau kesalahan data, saya siap
                  menerima sanksi sesuai ketentuan yang berlaku.
                </label>
              </div>
            </div>
          </div>

          {/* ── TOMBOL AKSI (FOOTER) ── */}
          <div className='flex items-center justify-end gap-3 pt-6 border-t border-slate-100'>
            {/* Button Cancel */}
            <Button
              variant='ghost'
              className='rounded-xl font-bold text-slate-500 px-6 hover:bg-slate-100 transition-colors'
            >
              Batal
            </Button>

            {/* Button Submit */}
            <Button
              type='submit'
              className='bg-[#0F4C81] hover:bg-[#0c3e6b] text-white px-10 h-11 md:h-12 rounded-xl font-bold gap-2 shadow-sm transition-all hover:-translate-y-0.5'
            >
              <SendHorizontal />
              Kirim
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
