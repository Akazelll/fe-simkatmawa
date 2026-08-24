"use client";

import { useParams } from "next/navigation";
import { Download, Loader2 } from "lucide-react";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { VerificationFilterBar } from "@/features/verification/components/VerificationFilterBar";
import {
  VerificationTable,
  VERIFICATION_TABLE_COLUMNS,
} from "@/features/verification/components/VerificationTable";
import { Pagination } from "@/features/shared/components/Pagination";
import { useVerifikasiList } from "@/features/verification/hooks/useVerifikasiList";
import { useExportExcel } from "@/features/verification/hooks/useExportExcel";
import { TipeKegiatan } from "@/features/verification/types";
import { TableSkeleton } from "@/features/shared/components/TableSkeleton";
import { useSkeletonRows } from "@/features/shared/hooks/useSkeletonRows";
import { ExportLogButton } from "@/features/activity/components/ExportLogButton";

type VerificationUrlType = "prestasi" | "sertifikat" | "sertifikasi" | "rekognisi";

const TITLE_MAP: Record<TipeKegiatan, string> = {
  prestasi: "Daftar Prestasi Mandiri",
  rekognisi: "Daftar Rekognisi",
  sertifikasi: "Daftar Sertifikasi",
};

export default function VerificationTypePage() {
  const params = useParams<{ type: VerificationUrlType }>();

  const rawType = params?.type || "prestasi";
  const apiType: TipeKegiatan =
    rawType === "sertifikat" ? "sertifikasi" : (rawType as TipeKegiatan);

  const title = TITLE_MAP[apiType] || "Daftar Pengajuan Admin";

  const { data, meta, isLoading, params: queryParams, updateParams } = useVerifikasiList(apiType);
  const { isExporting, exportExcel } = useExportExcel();

  const skeletonRows = useSkeletonRows(
    `verification:${apiType}`,
    data.length,
    !isLoading,
  );

  return (
    <RoleGuard allowedRoles={["admin", "superadmin"]}>
      <div className='flex flex-col gap-6 animate-in fade-in duration-500 w-full'>
        {/* Page Header */}
        <PageHeader
          title={title}
          description='Kelola, filter, cari, dan verifikasi seluruh pengajuan mahasiswa.'
        >
          <ExportLogButton
            onClick={() => exportExcel(apiType, queryParams)}
            disabled={isExporting}
          >
            {isExporting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Download className='mr-2 h-4 w-4' />
            )}
            {isExporting ? "Mengunduh..." : "Export Excel"}
          </ExportLogButton>
        </PageHeader>

        {/* Filter Bar */}
        <VerificationFilterBar
          tipeKegiatan={apiType}
          params={queryParams}
          updateParams={updateParams}
          total={meta?.total}
        />

        {/* Table & Pagination */}
        <div className='space-y-4 w-full'>
          {isLoading ? (
            <TableSkeleton
              columns={VERIFICATION_TABLE_COLUMNS}
              rows={skeletonRows}
            />
          ) : (
            <>
              <VerificationTable
                tipeKegiatan={apiType}
                data={data}
                isLoading={isLoading}
                params={queryParams}
                updateParams={updateParams}
              />

              {meta && (
                <Pagination
                  meta={meta}
                  onPageChange={(page) => updateParams({ page })}
                />
              )}
            </>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
