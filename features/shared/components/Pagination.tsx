import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

// Menyesuaikan Props agar menerima objek meta dari Laravel Backend
interface PaginationProps {
  meta?: {
    current_page: number;
    last_page: number;
    total: number;
  } | null;
  onPageChange: (page: number) => void;
}

export function Pagination({ meta, onPageChange }: PaginationProps) {
  // Jika meta tidak ada atau data kosong, jangan render paginasi
  if (!meta || meta.total === 0) return null;

  // Ekstrak nilai dari meta backend
  const page = meta.current_page;
  const totalPages = meta.last_page;
  const goTo = onPageChange;

  // Fungsi untuk menentukan deretan angka halaman yang akan ditampilkan
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    // Jika total halaman sedikit, tampilkan semua
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    }
    // Jika halaman banyak, gunakan Ellipsis (...)
    else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className='flex items-center justify-between px-6 py-4 border-t border-slate-100'>
      <button
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        className='flex items-center gap-1 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-800 disabled:opacity-30 disabled:hover:text-slate-500'
      >
        <ChevronLeft size={16} /> Previous
      </button>

      <div className='flex items-center gap-1.5'>
        {pageNumbers.map((p, index) => {
          if (p === "...") {
            return (
              <div
                key={`ellipsis-${index}`}
                className='flex size-8 items-center justify-center text-slate-400'
              >
                <MoreHorizontal size={16} />
              </div>
            );
          }

          return (
            <button
              key={index}
              onClick={() => goTo(p as number)}
              className={`flex size-8 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                p === page
                  ? "bg-[#0F4C81] text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        className='flex items-center gap-1 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-800 disabled:opacity-30 disabled:hover:text-slate-500'
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
}
