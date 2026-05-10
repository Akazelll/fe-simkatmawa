"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { UserStats } from "@/features/user-management/components/UserStats";
import { UserTable } from "@/features/user-management/components/UserTable";
import { AddAdminModal } from "@/features/user-management/components/AddAdminModal";
import { UpdateAdminModal } from "@/features/user-management/components/UpdateAdminModal";
import { DEFAULT_ADMINS } from "@/features/user-management/constants";
import { AdminUser } from "@/features/user-management/types";

export default function UserManagementPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const handleEditClick = (user: AdminUser) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <PageHeader
        title='User Management'
        description='Kelola akses dan peranan pengguna admin serta pantau statistik mahasiswa'
        buttonText='Add Admin'
        buttonIcon={UserPlus}
        onButtonClick={() => setIsAddModalOpen(true)}
      />

      <UserStats />

      <UserTable data={DEFAULT_ADMINS} onEdit={handleEditClick} />

      <AddAdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <UpdateAdminModal
        isOpen={isUpdateModalOpen}
        user={selectedUser}
        onClose={handleCloseUpdateModal}
      />
    </div>
  );
}
