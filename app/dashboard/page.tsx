"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Award, GraduationCap, Clock, Star } from "lucide-react";

export default function DashboardOverviewCards() {
  // 1. Data Dummy / State (Nantinya didapatkan dari API)
  const dataUser = {
    submission: {
      prestasi: 2,
      sertifikat: 0,
      rekognisi: 0,
    },
    ipk: 3.85,
    semester: "Semester Genap 2023/2024",
    statusPengajuanTerakhir: "Menunggu Validasi",
    keteranganStatus: "Prestasi: Juara 1 Web Design",
    poin: 150,
    peringkat: 45,
  };

  // 2. Logic Total Submission (Sesuai permintaan Anda)
  const totalSubmission =
    dataUser.submission.prestasi +
    dataUser.submission.sertifikat +
    dataUser.submission.rekognisi;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 animate-in fade-in duration-500'>
      {/* CARD 1: Total Submission */}
      <Card className='border-slate-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow'>
        <CardContent className='p-6 flex items-center gap-4'>
          <div className='h-14 w-14 bg-blue-50 text-[#0F4C81] flex items-center justify-center rounded-2xl shrink-0'>
            <Award size={28} strokeWidth={2} />
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-semibold text-slate-500 mb-0.5'>
              Total Submission
            </span>
            <span className='text-2xl font-bold text-slate-800'>
              {totalSubmission}
            </span>
            <span className='text-[11px] font-medium text-slate-400 mt-1'>
              {dataUser.submission.prestasi} Prestasi,{" "}
              {dataUser.submission.sertifikat} Sertifikat,{" "}
              {dataUser.submission.rekognisi} Rekognisi
            </span>
          </div>
        </CardContent>
      </Card>

      {/* CARD 2: IPK Terakhir */}
      <Card className='border-slate-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow'>
        <CardContent className='p-6 flex items-center gap-4'>
          <div className='h-14 w-14 bg-blue-50 text-[#0F4C81] flex items-center justify-center rounded-2xl shrink-0'>
            <GraduationCap size={28} strokeWidth={2} />
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-semibold text-slate-500 mb-0.5'>
              IPK Terakhir
            </span>
            <span className='text-2xl font-bold text-slate-800'>
              {dataUser.ipk}
            </span>
            <span className='text-[11px] font-medium text-slate-400 mt-1'>
              {dataUser.semester}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* CARD 3: Status Pengajuan */}
      <Card className='border-slate-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow'>
        <CardContent className='p-6 flex items-center gap-4'>
          <div className='h-14 w-14 bg-orange-50 text-orange-500 flex items-center justify-center rounded-2xl shrink-0'>
            <Clock size={28} strokeWidth={2} />
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-semibold text-slate-500 mb-0.5'>
              Status Pengajuan
            </span>
            <span className='text-lg font-bold text-orange-600 leading-tight'>
              {dataUser.statusPengajuanTerakhir}
            </span>
            <span className='text-[11px] font-medium text-slate-400 mt-1 truncate max-w-[140px]'>
              {dataUser.keteranganStatus}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* CARD 4: Poin SIMKATMAWA */}
      <Card className='border-slate-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow'>
        <CardContent className='p-6 flex items-center gap-4'>
          <div className='h-14 w-14 bg-yellow-50 text-yellow-500 flex items-center justify-center rounded-2xl shrink-0'>
            <Star size={28} strokeWidth={2} />
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-semibold text-slate-500 mb-0.5'>
              Poin SIMKATMAWA
            </span>
            <span className='text-2xl font-bold text-slate-800'>
              {dataUser.poin} Poin
            </span>
            <span className='text-[11px] font-medium text-slate-400 mt-1'>
              Peringkat #{dataUser.peringkat} di Fakultas
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
