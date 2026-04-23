import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className='max-w-5xl space-y-8 animate-in fade-in duration-500'>
      <div className='space-y-1'>
        <h2 className='text-2xl font-bold tracking-tight text-slate-900'>
          Overview
        </h2>
        <p className='text-slate-500 text-sm font-medium'>
          Ringkasan aktivitas sistem hari ini.
        </p>
      </div>

      <Card className='border-0 shadow-sm rounded-[24px] bg-white overflow-hidden relative border-l-[6px] border-l-[#0F4C81]'>
        <CardHeader className='pb-2 pt-8 px-10'>
          <CardTitle className='text-3xl font-extrabold text-[#0F4C81] tracking-tight'>
            Selamat Datang, Adam Raga!
          </CardTitle>
        </CardHeader>
        <CardContent className='px-10 pb-10'>
          <p className='text-slate-600 leading-relaxed text-lg max-w-4xl'>
            Sistem Informasi Manajemen Pemeringkatan Kemahasiswaan (SIMKATMAWA)
            merupakan portal terintegrasi Universitas Dian Nuswantoro untuk
            melakukan pencatatan, pemantauan, dan pemeringkatan berbagai
            aktivitas, prestasi, serta kegiatan kemahasiswaan guna mendukung
            capaian prestasi tingkat nasional maupun internasional.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
    