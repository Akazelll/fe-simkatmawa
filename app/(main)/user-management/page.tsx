"use client";

import { useState } from "react";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/features/shared/components/Pagination";
import { UserTable } from "@/features/user-management/components/UserTable";
import { UserModal } from "@/features/user-management/components/UserModal";
import { DeleteUserModal } from "@/features/user-management/components/DeleteUserModal";
import { useUsers } from "@/features/user-management/hooks/useUsers";
import { TotalUserCard } from "@/features/user-management/components/TotalUserCard";

// IMPORT KOMPONEN SHARED & SKELETON
import { FilterSection } from "@/features/shared/components/FilterSection";
import { TableSkeleton } from "@/features/shared/components/TableSkeleton";
import { CardSkeleton } from "@/features/shared/components/CardSkeleton";

export default function UserManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("Semua Role");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);
  const [deleteUser, setDeleteUser] = useState<any>(null);

  const apiRoleFormat =
    roleFilter === "Semua Role" ? "all" : roleFilter.toLowerCase();

  const { data, meta, stats, isLoading, refetch } = useUsers({
    page: currentPage,
    search,
    role: apiRoleFormat,
  });

  return (
    <div className='flex flex-col gap-6 p-6 animate-in fade-in duration-500'>
      {/* ========================================== */}
      {/* BAGIAN STATIS: Langsung Render Tanpa Nunggu */}
      {/* ========================================== */}

      {/* --- HEADER & TOMBOL TAMBAH --- */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <PageHeader
          title='Manajemen Pengguna'
          description='Kelola akses, role, dan data pengguna sistem SIMKATMAWA.'
        />

        <Button
          onClick={() => setIsAddModalOpen(true)}
          className='h-10 px-5 rounded-xl text-sm font-semibold bg-[#0F4C81] text-white hover:bg-[#0c3e6b] transition-all w-full sm:w-auto shrink-0'
        >
          + Tambah Admin
        </Button>
      </div>

      {/* --- BAGIAN FILTER & SEARCH --- */}
      <FilterSection
        search={search}
        setSearch={setSearch}
        searchPlaceholder='Cari berdasarkan email...'
        category={roleFilter}
        setCategory={setRoleFilter}
        categories={["Semua Role", "Admin", "Mahasiswa"]}
      />

      {/* ========================================== */}
      {/* BAGIAN DINAMIS: Tampilkan Skeleton saat loading */}
      {/* ========================================== */}

      {/* --- KARTU STATISTIK --- */}
      {isLoading ? (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {[1, 2, 3].map((i) => (
            <CardSkeleton
              key={i}
              hasHeader={false}
              lines={2}
              className='h-28 justify-center'
            />
          ))}
        </div>
      ) : (
        <TotalUserCard stats={stats} />
      )}

      {/* --- TABEL --- */}
      <div className='space-y-4'>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <UserTable
              data={data}
              isLoading={false}
              onEdit={(user) => setEditUser(user)}
              onDelete={(user) => setDeleteUser(user)}
            />

            {meta && meta.last_page > 1 && (
              <Pagination
                page={meta.current_page}
                totalPages={meta.last_page}
                goTo={(page) => setCurrentPage(page)}
              />
            )}
          </>
        )}
      </div>

      {/* MODALS */}
      <UserModal
        isOpen={isAddModalOpen || !!editUser}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditUser(null);
        }}
        user={editUser}
        onSuccess={refetch}
      />

      <DeleteUserModal
        isOpen={!!deleteUser}
        onClose={() => setDeleteUser(null)}
        user={deleteUser}
        onSuccess={() => {
          setDeleteUser(null);
          refetch();
        }}
      />
    </div>
  );
}
