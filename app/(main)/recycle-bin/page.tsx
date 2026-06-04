"use client";

import { useState } from "react";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { FilterSection } from "@/features/shared/components/FilterSection";
import { Pagination } from "@/features/shared/components/Pagination";
import { usePaginationFilter } from "@/features/shared/hooks/usePaginationFilter";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { RecycleBinStats } from "@/features/recycle-bin/components/RecycleBinStats";
import { RecycleBinTable } from "@/features/recycle-bin/components/RecycleBinTable";
import { RestoreDialog } from "@/features/recycle-bin/components/RestoreDialog";
import { EmptyTrashState } from "@/features/recycle-bin/components/EmptyTrashState";
import { useRecycleBin } from "@/features/recycle-bin/hooks/useRecycleBin";
import { TrashedItem } from "@/features/recycle-bin/types";
import { TYPES, STATUSES, PAGE_SIZE } from "@/features/recycle-bin/constants";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { TableSkeleton } from "@/features/shared/components/TableSkeleton";
import { CardSkeleton } from "@/features/shared/components/CardSkeleton";
export default function RecycleBinPage() {
  const { isLoaded: isAuthLoaded } = useAuth();
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
    <div className='flex flex-col gap-6 p-6 animate-in fade-in duration-500'>
      <PageHeader
        title='Recycle Bin'
        description='Kelola data yang dihapus (soft delete). Data dapat dikembalikan ke tabel aktif.'
      />

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
      <RoleGuard allowedRoles={["superadmin"]}>
        {!isAuthLoaded || isLoading ? (
          <div className='space-y-6'>
            <CardSkeleton
              hasHeader={false}
              lines={2}
              className='h-28 max-w-sm'
            />
            <TableSkeleton />
          </div>
        ) : (
          <div className='space-y-6'>
            <RecycleBinStats count={trashedItems.length} />

            {filter.paginated.length > 0 ? (
              <>
                <RecycleBinTable
                  data={filter.paginated}
                  onRestoreClick={(item) => setSelectedItem(item)}
                />

                {filter.totalPages > 1 && (
                  <Pagination
                    page={filter.page}
                    totalPages={filter.totalPages}
                    goTo={filter.goTo}
                  />
                )}
              </>
            ) : (
              <EmptyTrashState />
            )}
          </div>
        )}
      </RoleGuard>

      <RestoreDialog
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onConfirm={handleRestore}
        isLoading={isRestoring}
        itemName={selectedItem?.name}
      />
    </div>
  );
}
