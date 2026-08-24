"use client";

import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { TipeKegiatan, PengajuanItem, VerifikasiQueryParams } from "../types";
import { VerificationTableHeader } from "./VerificationTableHeader";
import { VerificationTableRows } from "./VerificationTableRows";
import { VerificationTableSkeleton } from "./VerificationTableSkeleton";

interface VerificationTableProps {
  tipeKegiatan: TipeKegiatan;
  data: PengajuanItem[];
  isLoading?: boolean;
  params?: VerifikasiQueryParams;
  updateParams?: (newParams: Partial<VerifikasiQueryParams>) => void;
}

export function VerificationTable({
  tipeKegiatan,
  data,
  isLoading,
  params,
  updateParams,
}: VerificationTableProps) {
  const handleSort = (key: string) => {
    if (!updateParams) return;
    if (params?.sort_by !== key) {
      updateParams({ sort_by: key, sort_dir: "asc" });
    } else if (params?.sort_dir === "asc") {
      updateParams({ sort_by: key, sort_dir: "desc" });
    } else {
      updateParams({ sort_by: undefined, sort_dir: undefined });
    }
  };

  const handleSort = (key: string) => {
    if (!updateParams) return;
    if (params?.sort_by !== key) {
      updateParams({ sort_by: key, sort_dir: "asc" });
    } else if (params?.sort_dir === "asc") {
      updateParams({ sort_by: key, sort_dir: "desc" });
    } else {
      updateParams({ sort_by: undefined, sort_dir: undefined });
    }
  };

  const nameSortKey = tipeKegiatan === "prestasi" ? "lomba" : "nama";

  if (isLoading) {
    return <VerificationTableSkeleton />;
  }

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden p-0 w-full">
      <div className="w-full overflow-x-auto">
        <Table className="w-full">
          <VerificationTableHeader
            tipeKegiatan={tipeKegiatan}
            params={params}
            onSort={handleSort}
          />
          <VerificationTableRows tipeKegiatan={tipeKegiatan} data={data} />
        </Table>
      </div>
    </Card>
  );
}

export { VERIFICATION_TABLE_COLUMNS } from "../utils/VerificationTableUtils";