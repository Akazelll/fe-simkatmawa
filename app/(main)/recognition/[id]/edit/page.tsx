"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { RekognisiEditForm } from "@/features/recognition/components/RekognisiEditForm";
import { rekognisiService } from "@/features/recognition/services/rekognisiService";
import { Rekognisi } from "@/features/recognition/types";

export default function EditRekognisiPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

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
    <RoleGuard allowedRoles={["mahasiswa"]}>
      {error && (
        <div className='max-w-5xl mx-auto flex items-center gap-2 p-4 text-red-700 bg-red-50 rounded-lg border border-red-200'>
          <AlertCircle className='w-5 h-5' />
          <p>{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className='max-w-5xl mx-auto flex justify-center items-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm'>
          <Loader2 className='w-8 h-8 animate-spin text-[#1a2b5e]' />
        </div>
      ) : (
        data && <RekognisiEditForm detail={data} />
      )}
    </RoleGuard>
  );
}
