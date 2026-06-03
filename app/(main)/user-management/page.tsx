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

// IMPORT KOMPONEN FILTER SECTION
import { FilterSection } from "@/features/shared/components/FilterSection";

export default function UserManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // State roleFilter disesuaikan dengan nilai string yang akan ditampilkan di Dropdown
  const [roleFilter, setRoleFilter] = useState("Semua Role");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);
  const [deleteUser, setDeleteUser] = useState<any>(null);

  // Menerjemahkan nilai dropdown ke format API (backend)
  const apiRoleFormat =
    roleFilter === "Semua Role" ? "all" : roleFilter.toLowerCase();

  const { data, meta, stats, isLoading, refetch } = useUsers({
    page: currentPage,
    search,
    role: apiRoleFormat,
  });

  return (
    <div className='flex flex-col gap-6 p-6 animate-in fade-in duration-500'>
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

      {/* --- KARTU STATISTIK --- */}
      <TotalUserCard stats={stats} />

      {/* --- BAGIAN FILTER & SEARCH (Menggunakan Shared Component) --- */}
      <FilterSection
        search={search}
        setSearch={setSearch}
        searchPlaceholder='Cari berdasarkan email...'
        // Kita "meminjam" prop category untuk digunakan sebagai Filter Role
        category={roleFilter}
        setCategory={setRoleFilter}
        categories={["Semua Role", "Admin", "Mahasiswa"]}
      />

      {/* --- TABEL --- */}
      <div className='space-y-4'>
        <UserTable
          data={data}
          isLoading={isLoading}
          onEdit={(user) => setEditUser(user)}
          onDelete={(user) => setDeleteUser(user)}
        />

        {!isLoading && meta && meta.last_page > 1 && (
          <Pagination
            page={meta.current_page}
            totalPages={meta.last_page}
            goTo={(page) => setCurrentPage(page)}
          />
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
