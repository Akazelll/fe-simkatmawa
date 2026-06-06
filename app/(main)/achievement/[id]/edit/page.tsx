"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { PrestasiEditForm } from "@/features/achievement/components/PrestasiEditForm";
import { prestasiService } from "@/features/achievement/services/prestasiService";
import { Prestasi } from "@/features/achievement/types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { CardSkeleton } from "@/features/shared/components/CardSkeleton";
import { FormPageHeader } from "@/features/shared/components/form/FormPageHeader";

export default function EditPrestasiPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { isLoaded: isAuthLoaded } = useAuth();

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
    <div className='flex flex-col gap-6 animate-in fade-in duration-500 max-w-5xl w-full mx-auto p-4 md:p-0'>
      <FormPageHeader
        title='Edit Prestasi Mandiri'
        description='Perbarui data pengajuan prestasi, mahasiswa, dan dosen pendamping.'
      />

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
            <CardSkeleton lines={4} />
          </div>
        ) : (
          data && <PrestasiEditForm detail={data} />
        )}
      </RoleGuard>
    </div>
  );
}
