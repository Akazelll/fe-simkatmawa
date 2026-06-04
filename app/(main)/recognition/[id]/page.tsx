"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pencil, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { RekognisiDetailView } from "@/features/recognition/components/RekognisiDetailView";
import { rekognisiService } from "@/features/recognition/services/rekognisiService";
import { Rekognisi } from "@/features/recognition/types";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { CardSkeleton } from "@/features/shared/components/CardSkeleton";

export default function RekognisiDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { isLoaded: isAuthLoaded } = useAuth();

  const [data, setData] = useState<Rekognisi | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDetail = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await rekognisiService.getRekognisiDetail(id);
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || "Gagal mengambil detail rekognisi");
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
    <div className='flex flex-col gap-6 animate-in fade-in duration-500 max-w-5xl w-full mx-auto'>
      <div className='flex items-center justify-between gap-3'>
        <Button
          type='button'
          variant='ghost'
          onClick={() => router.push("/recognition")}
          className='gap-2 rounded-xl px-4 h-10 font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-700'
        >
          <ArrowLeft size={16} />
          Kembali
        </Button>

        {!isLoading && data?.can_edit && (
          <Button
            onClick={() => router.push(`/recognition/${id}/edit`)}
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

      <RoleGuard allowedRoles={["mahasiswa"]}>
        {!isAuthLoaded || isLoading ? (
          <div className='space-y-6'>
            <CardSkeleton lines={6} />
            <CardSkeleton lines={4} />
          </div>
        ) : (
          data && <RekognisiDetailView data={data} />
        )}
      </RoleGuard>
    </div>
  );
}
