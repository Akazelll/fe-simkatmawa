import { Shield, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TotalUserCardProps {
  stats?: {
    totalAdmin?: number;
    totalMahasiswa?: number;
  };
}

export function TotalUserCard({ stats }: TotalUserCardProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <Card className='rounded-2xl border-slate-200 bg-white shadow-sm'>
        <CardContent className='p-6 flex items-center gap-4'>
          <div className='w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center border border-sky-100'>
            <Shield className='text-sky-600' size={24} />
          </div>
          <div>
            <p className='text-sm font-semibold text-slate-500'>Total Admin</p>
            <h3 className='text-2xl font-bold text-slate-900'>
              {stats?.totalAdmin || 0}
            </h3>
          </div>
        </CardContent>
      </Card>

      <Card className='rounded-2xl border-slate-200 bg-white shadow-sm'>
        <CardContent className='p-6 flex items-center gap-4'>
          <div className='w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100'>
            <Users className='text-emerald-600' size={24} />
          </div>
          <div>
            <p className='text-sm font-semibold text-slate-500'>
              Total Mahasiswa
            </p>
            <h3 className='text-2xl font-bold text-slate-900'>
              {stats?.totalMahasiswa || 0}
            </h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
