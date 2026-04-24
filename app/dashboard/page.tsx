"use client";

import React from 'react';
import { Trophy, Bell, User, FileText, Edit3, Award, BadgeCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const stats = [
    { label: "Total Prestasi", value: "12", icon: Trophy, color: "bg-[#003580]" },
    { label: "Total Sertifikat", value: "05", icon: Award, color: "bg-[#003580]" },
    { label: "Total Rekognisi", value: "03", icon: BadgeCheck, color: "bg-[#003580]" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HEADER SECTION - Responsive Padding & Alignment */}
      <header className="px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-20">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h2>
          {/* Sapaan menyesuaikan ukuran layar */}
          <p className="text-slate-500 text-xs sm:text-sm font-medium">Selamat Datang Kembali, Syakira!</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="text-slate-400 cursor-pointer hidden xs:flex">
            <Bell size={20} />
          </Button>
          
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />
          
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Info teks disembunyikan di layar sangat kecil agar tidak sempit */}
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800 leading-none">Syakira Fara</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Mahasiswa</p>
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-50 rounded-full flex items-center justify-center text-[#003580] border border-blue-100 shadow-sm">
              <User size={18} />
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT SECTION - Padding dinamis */}
      <main className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
        
        {/* STATS CARDS - Berubah dari 1 kolom ke 3 kolom secara cerdas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="border-slate-200 shadow-sm cursor-default hover:shadow-md transition-all active:scale-[0.98] sm:active:scale-100">
              <CardContent className="p-5 sm:p-6 flex justify-between items-center">
                <div>
                  <p className="text-[10px] sm:text-[12px] font-bold text-slate-500 uppercase tracking-tight">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl shadow-md shadow-blue-900/10`}>
                  <stat.icon className="text-white" size={20} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AKTIVITAS TERBARU - Responsif Padding */}
        <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 px-5 sm:px-8 py-4 sm:py-6 bg-white">
            <CardTitle className="text-base sm:text-lg font-bold text-[#003580]">Aktivitas Terbaru</CardTitle>
            <Button variant="link" className="text-blue-600 font-bold text-[11px] sm:text-xs p-0 h-auto cursor-pointer hover:text-blue-800">
              Lihat Semua
            </Button>
          </CardHeader>
          <CardContent className="px-5 sm:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 bg-white">
            <ActivityItem 
              icon={<FileText size={18} />}
              title="Gemastik XVI - Programming"
              desc="National Level Achievement"
              status="Menunggu"
              time="2 hours ago"
            />
            <ActivityItem 
              icon={<Trophy size={18} />}
              title="UI/UX Design - Google"
              desc="International Certificate"
              status="Disetujui"
              time="Yesterday"
            />
            <ActivityItem 
              icon={<BadgeCheck size={18} />}
              title="Internal Organization: BEM FIK"
              desc="Recognition status updated"
              status="Disetujui"
              time="3 days ago"
            />
          </CardContent>
        </Card>

      </main>
    </div>
  );
}

function ActivityItem({ icon, title, desc, status, time }: any) {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'disetujui': return "bg-green-100 text-green-700 border-green-200";
      case 'ditolak': return "bg-red-100 text-red-700 border-red-200";
      case 'menunggu': return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="flex items-center justify-between group cursor-pointer p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-all active:bg-slate-100">
      <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
        <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-white group-hover:text-blue-600 transition-colors">
          {icon}
        </div>
        <div className="overflow-hidden">
          {/* Menambahkan truncate agar judul tidak berantakan di layar kecil */}
          <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-blue-700 transition-colors truncate">{title}</h4>
          <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">{desc}</p>
        </div>
      </div>
      <div className="text-right space-y-1 flex-shrink-0 ml-2">
        <Badge variant="outline" className={`rounded-full text-[8px] sm:text-[10px] font-bold px-2 sm:px-3 py-0 uppercase tracking-tight border ${getStatusStyle(status)}`}>
          {status}
        </Badge>
        <p className="text-[8px] sm:text-[10px] text-slate-400 font-medium">{time}</p>
      </div>
    </div>
  );
}