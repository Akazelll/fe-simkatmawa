"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pencil, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { PrestasiDetailView } from "@/features/achievement/components/PrestasiDetailView";
import { prestasiService } from "@/features/achievement/services/prestasiService";
import { Prestasi } from "@/features/achievement/types";

export default function PrestasiDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [data, setData] = useState<Prestasi | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDetail = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await prestasiService.getPrestasiDetail(id);
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || "Gagal mengambil detail prestasi");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Terjadi kesalahan pada server");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return (
    <RoleGuard allowedRoles={["mahasiswa"]}>
      <div className='flex flex-col gap-6 animate-in fade-in duration-500 max-w-5xl w-full mx-auto'>
        <div className='flex items-center justify-between gap-3'>
          <Button
            type='button'
            variant='ghost'
            onClick={() => router.push("/achievement")}
            className='gap-2 rounded-xl px-4 h-10 font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-700'
          >
            <ArrowLeft size={16} />
            Kembali
          </Button>

          {data?.can_edit && (
            <Button
              onClick={() => router.push(`/achievement/${id}/edit`)}
              className='gap-2 rounded-xl px-5 h-10 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-bold shadow-sm'
            >
              <Pencil size={16} />
              Edit
            </Button>
          )}
        </div>

        {error && (
          <div className='flex items-center gap-2 p-4 text-red-700 bg-red-50 rounded-lg border border-red-200'>
            <AlertCircle className='w-5 h-5' />
            <p>{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className='flex justify-center items-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm'>
            <Loader2 className='w-8 h-8 animate-spin text-[#1a2b5e]' />
          </div>
        ) : (
          data && <PrestasiDetailView data={data} />
        )}
      </div>
    </RoleGuard>
  );
}
