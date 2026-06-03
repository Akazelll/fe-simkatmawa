import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  goTo: (p: number) => void;
}

export function Pagination({ page, totalPages, goTo }: PaginationProps) {
  return (
    <div className='flex items-center justify-between px-6 py-4 border-t border-slate-100'>
      <button
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        className='text-sm font-semibold text-slate-500 disabled:opacity-30 flex items-center gap-1'
      >
        <ChevronLeft size={16} /> Previous
      </button>
      <div className='flex gap-1.5'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => goTo(p)}
            className={`size-8 rounded-md text-sm font-bold ${p === page ? "bg-[#0F4C81] text-white" : "text-slate-500"}`}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        className='text-sm font-semibold text-slate-500 disabled:opacity-30 flex items-center gap-1'
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
}
