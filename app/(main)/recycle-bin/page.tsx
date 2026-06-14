"use client";

import { useState, useEffect } from "react";
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

  // Debugging: Melihat jumlah data yang benar-benar tersimpan di React State
  useEffect(() => {
    if (!isLoading) {
      console.log(
        "Total data di Recycle Bin Frontend:",
        trashedItems.length,
        trashedItems,
      );
    }
  }, [trashedItems, isLoading]);

  const filter = usePaginationFilter<TrashedItem>({
    data: trashedItems || [],
    pageSize: PAGE_SIZE,
    // Menambahkan parameter 'year' agar sesuai dengan hook usePaginationFilter Anda
    filterFn: (row, search, category, status, year) => {
      const matchSearch =
        !search || row.name.toLowerCase().includes(search.toLowerCase());

      // Menggunakan .startsWith("Semua") agar mentolerir "Semua Kategori" atau "Semua Tipe"
      const matchType =
        !category || category.startsWith("Semua") || row.type === category;

      const matchStatus =
        !status || status.startsWith("Semua") || row.status === status;

      return matchSearch && matchType && matchStatus;
    },
  });

  const handleRestore = () => {
    if (!selectedItem) return;

    restoreItem(
      { type: selectedItem.originalType, id: selectedItem.id },
      {
        onSuccess: () => setSelectedItem(null),
      },
    );
  };

  return (
    <div className='flex flex-col gap-6 p-6 animate-in fade-in duration-500'>
      <PageHeader
        title='Recycle Bin'
        description='Kelola data yang dihapus. Data dapat dikembalikan ke tabel aktif.'
      />

      <FilterSection
        search={filter.search}
        setSearch={filter.setSearch}
        searchPlaceholder='Cari nama pengajuan atau akun...'
        category={filter.category}
        setCategory={filter.setCategory}
        categories={TYPES}
        categoryLabel='Filter Tipe'
        status={filter.status}
        setStatus={filter.setStatus}
        statuses={STATUSES}
        statusLabel='Filter Status'
      />

      <RoleGuard allowedRoles={["superadmin", "admin"]}>
        {!isAuthLoaded || isLoading ? (
          <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <CardSkeleton
                hasHeader={false}
                lines={2}
                className='h-28 justify-center'
              />
              <CardSkeleton
                hasHeader={false}
                lines={2}
                className='h-28 justify-center'
              />
            </div>
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
