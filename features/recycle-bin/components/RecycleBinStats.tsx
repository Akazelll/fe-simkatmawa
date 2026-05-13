import { Trash2, RefreshCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function RecycleBinStats({ count }: { count: number }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <Card className='border-slate-200 shadow-sm rounded-2xl bg-white'>
        <CardContent className='p-6 flex items-center gap-4'>
          <div className='size-12 rounded-xl flex items-center justify-center bg-rose-50'>
            <Trash2 className='text-rose-500' size={24} />
          </div>
          <div>
            <p className='text-sm font-medium text-slate-500'>
              Total Data Terhapus
            </p>
            <p className='text-2xl font-bold text-slate-800'>{count}</p>
          </div>
        </CardContent>
      </Card>
      <Card className='border-slate-200 shadow-sm rounded-2xl bg-white'>
        <CardContent className='p-6 flex items-center gap-4'>
          <div className='size-12 rounded-xl flex items-center justify-center bg-sky-50'>
            <RefreshCcw className='text-sky-600' size={24} />
          </div>
          <div>
            <p className='text-sm font-medium text-slate-500'>
              Menunggu Restore
            </p>
            <p className='text-2xl font-bold text-slate-800'>{count}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
