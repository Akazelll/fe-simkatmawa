"use client";

import { useState } from "react";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { FilterSection } from "@/features/shared/components/FilterSection";
import { Pagination } from "@/features/shared/components/Pagination";
import { usePaginationFilter } from "@/features/shared/hooks/usePaginationFilter";
import { RoleGuard } from "@/features/auth/components/RoleGuard";

import { RecycleBinStats } from "../components/RecycleBinStats";
import { RecycleBinTable } from "../components/RecycleBinTable";
import { RestoreDialog } from "../components/RestoreDialog";
import { EmptyTrashState } from "../components/EmptyTrashState";
import { useRecycleBin } from "../hooks/useRecycleBin";
import { TrashedItem } from "../types";
import { TYPES, STATUSES, PAGE_SIZE } from "../constants";
import { Skeleton } from "@/components/ui/skeleton";

export function RecycleBinPage() {
  const { trashedItems, isLoading, restoreItem, isRestoring } = useRecycleBin();
  const [selectedItem, setSelectedItem] = useState<TrashedItem | null>(null);

  const filter = usePaginationFilter<TrashedItem>({
    data: trashedItems,
    pageSize: PAGE_SIZE,
    filterFn: (row, search, category, status) => {
      const matchSearch = row.name.toLowerCase().includes(search.toLowerCase());
      const matchType = category === "Semua Tipe" || row.type === category;
      const matchStatus = status === "Semua Status" || row.status === status;
      return matchSearch && matchType && matchStatus;
    },
  });

  const handleRestore = () => {
    if (!selectedItem) return;
    restoreItem(selectedItem.id, {
      onSuccess: () => setSelectedItem(null),
    });
  };

  return (
    <RoleGuard allowedRoles={["superadmin"]}>
      <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
        <PageHeader
          title='Recycle Bin'
          description='Kelola data yang dihapus (soft delete). Data dapat dikembalikan ke tabel aktif.'
        />

        {isLoading ? (
          <Skeleton className='w-full h-32 rounded-2xl' />
        ) : (
          <RecycleBinStats count={trashedItems.length} />
        )}

        <FilterSection
          search={filter.search}
          setSearch={filter.setSearch}
          searchPlaceholder='Cari nama pengajuan...'
          category={filter.category}
          setCategory={filter.setCategory}
          categories={TYPES}
          categoryLabel='Filter Tipe'
          status={filter.status}
          setStatus={filter.setStatus}
          statuses={STATUSES}
          statusLabel='Filter Status'
        />

        {isLoading ? (
          <Skeleton className='w-full h-[400px] rounded-2xl' />
        ) : filter.paginated.length > 0 ? (
          <>
            <RecycleBinTable
              data={filter.paginated}
              onRestoreClick={(item) => setSelectedItem(item)}
            />
            <Pagination
              page={filter.page}
              totalPages={filter.totalPages}
              goTo={filter.goTo}
            />
          </>
        ) : (
          <EmptyTrashState />
        )}

        <RestoreDialog
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          onConfirm={handleRestore}
          isLoading={isRestoring}
          itemName={selectedItem?.name}
        />
      </div>
    </RoleGuard>
  );
}
