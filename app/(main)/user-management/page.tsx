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
import { FilterSection } from "@/features/shared/components/FilterSection";
import { TableSkeleton } from "@/features/shared/components/TableSkeleton";

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

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleRoleChange = (val: string) => {
    setRoleFilter(val);
    setCurrentPage(1);
  };

  return (
    <div className='flex flex-col gap-6 p-6 animate-in fade-in duration-500'>
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

      <FilterSection
        search={search}
        setSearch={handleSearchChange}
        searchPlaceholder='Cari berdasarkan email...'
        category={roleFilter}
        setCategory={handleRoleChange}
        categories={["Semua Role", "Admin", "Mahasiswa"]}
      />

      <TotalUserCard stats={stats} isLoading={isLoading} />

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
              <Pagination meta={meta} onPageChange={setCurrentPage} />
            )}
          </>
        )}
      </div>

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
