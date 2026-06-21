"use client";

import { useState } from "react";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { FilterSection } from "@/features/shared/components/FilterSection";
import { Pagination } from "@/features/shared/components/Pagination";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { RecycleBinStats } from "@/features/recycle-bin/components/RecycleBinStats";
import { RecycleBinTable } from "@/features/recycle-bin/components/RecycleBinTable";
import { RestoreDialog } from "@/features/recycle-bin/components/RestoreDialog";
import { EmptyTrashState } from "@/features/recycle-bin/components/EmptyTrashState";
import { useRecycleBin } from "@/features/recycle-bin/hooks/useRecycleBin";
import { TrashedItem } from "@/features/recycle-bin/types";
import { TRASH_TYPES, STATUSES } from "@/features/recycle-bin/constants";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { TableSkeleton } from "@/features/shared/components/TableSkeleton";
import { CardSkeleton } from "@/features/shared/components/CardSkeleton";

const TYPE_LABELS = TRASH_TYPES.map((t) => t.label);

export default function RecycleBinPage() {
  const { isLoaded: isAuthLoaded } = useAuth();

  // State paginasi/filter — semuanya dikirim ke backend (server-side).
  const [activeType, setActiveType] = useState<string>(TRASH_TYPES[0].key);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Semua Status");
  const [selectedItem, setSelectedItem] = useState<TrashedItem | null>(null);

  const isUserType = activeType === "user";
  // Filter status_internal tidak berlaku untuk akun pengguna.
  const statusParam =
    isUserType || status.startsWith("Semua") ? undefined : status;

  const {
    items,
    meta,
    totalTrash,
    isLoading,
    isFetching,
    restoreItem,
    isRestoring,
  } = useRecycleBin({
    type: activeType,
    page,
    search: search || undefined,
    status: statusParam,
  });

  const currentLabel =
    TRASH_TYPES.find((t) => t.key === activeType)?.label ?? TYPE_LABELS[0];

  // Ganti tipe/filter selalu kembali ke halaman 1 (reset di handler, bukan effect).
  const handleTypeChange = (label: string) => {
    const found = TRASH_TYPES.find((t) => t.label === label);
    if (found) {
      setActiveType(found.key);
      setPage(1);
    }
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleStatusChange = (val: string) => {
    setStatus(val);
    setPage(1);
  };

  const handleRestore = () => {
    if (!selectedItem) return;

    restoreItem(
      { type: selectedItem.originalType, id: selectedItem.id },
      {
        onSuccess: () => setSelectedItem(null),
      },
    );
  };

  const showInitialSkeleton = !isAuthLoaded || isLoading;

  return (
    <div className='flex flex-col gap-6 p-6 animate-in fade-in duration-500'>
      <PageHeader
        title='Recycle Bin'
        description='Kelola data yang dihapus. Data dapat dikembalikan ke tabel aktif.'
      />

      <FilterSection
        search={search}
        setSearch={handleSearchChange}
        searchPlaceholder='Cari nama pengajuan atau akun...'
        category={currentLabel}
        setCategory={handleTypeChange}
        categories={TYPE_LABELS}
        categoryLabel='Filter Tipe'
        status={isUserType ? undefined : status}
        setStatus={isUserType ? undefined : handleStatusChange}
        statuses={isUserType ? undefined : STATUSES}
        statusLabel='Filter Status'
      />

      <RoleGuard allowedRoles={["superadmin", "admin"]}>
        {showInitialSkeleton ? (
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
            <RecycleBinStats count={totalTrash} />

            {items.length > 0 ? (
              <div
                className={
                  isFetching
                    ? "opacity-60 transition-opacity"
                    : "transition-opacity"
                }
              >
                <RecycleBinTable
                  data={items}
                  onRestoreClick={(item) => setSelectedItem(item)}
                />

                {/* PERBAIKAN: Menggunakan props 'meta' dan 'onPageChange' terbaru */}
                {meta && meta.last_page > 1 && (
                  <Pagination meta={meta} onPageChange={setPage} />
                )}
              </div>
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
