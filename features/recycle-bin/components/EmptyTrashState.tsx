import { FileQuestion } from "lucide-react";

export function EmptyTrashState() {
  return (
    <div className='flex flex-col items-center justify-center py-16 px-4 bg-white border border-slate-200 border-dashed rounded-2xl'>
      <div className='size-16 bg-slate-50 rounded-full flex items-center justify-center mb-4'>
        <FileQuestion className='text-slate-400' size={32} />
      </div>
      <h3 className='text-lg font-bold text-slate-800 mb-1'>
        Recycle Bin Kosong
      </h3>
      <p className='text-sm text-slate-500 text-center max-w-sm'>
        Tidak ada data pengajuan yang dihapus saat ini. Data yang dihapus (soft
        delete) akan muncul di sini.
      </p>
    </div>
  );
}
