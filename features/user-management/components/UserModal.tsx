"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { userService } from "@/features/user-management/services/userService";
import { toast } from "sonner";
import { UserFormFields, UserFormData } from "./UserFormFields";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any | null;
  onSuccess: () => void;
}

export function UserModal({
  isOpen,
  onClose,
  user,
  onSuccess,
}: UserModalProps) {
  const isEdit = !!user;
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    role: "",
    password: "",
  });
  useEffect(() => {
    if (user && isOpen) {
      const userRole = user.roles?.[0]?.name || user.role || "";
      const capitalizedRole =
        userRole.charAt(0).toUpperCase() + userRole.slice(1);

      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: capitalizedRole,
        password: "",
      });
    } else if (isOpen) {
      setFormData({ name: "", email: "", role: "", password: "" });
    }
  }, [user, isOpen]);

  const handleFieldChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.role) {
      toast.error("Validasi Gagal", {
        description: "Semua kolom wajib diisi.",
      });
      return;
    }

    if (!isEdit && !formData.password) {
      toast.error("Validasi Gagal", {
        description: "Password wajib diisi untuk pengguna baru.",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        role: formData.role.toLowerCase(),
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      if (isEdit) {
        await userService.updateUser(user.id, payload);
        toast.success("Berhasil diperbarui", {
          description: `Data pengguna ${formData.name} telah disimpan.`,
        });
      } else {
        await userService.createUser(payload);
        toast.success("Berhasil ditambahkan", {
          description: `Pengguna ${formData.name} berhasil dibuat.`,
        });
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Error submitting user:", error);
      toast.error("Gagal menyimpan data", {
        description:
          error?.response?.data?.message || "Terjadi kesalahan pada server.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isProcessing && onClose()}>
      <DialogContent className='sm:max-w-md rounded-2xl p-6 border-slate-200'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold text-slate-800'>
            {isEdit ? "Update Pengguna" : "Tambah Admin Baru"}
          </DialogTitle>
          <DialogDescription className='text-sm text-slate-500'>
            {isEdit
              ? `Perbarui informasi akun untuk ${formData.name || "pengguna ini"}.`
              : "Isi detail di bawah untuk menambahkan pengguna admin baru."}
          </DialogDescription>
        </DialogHeader>

        <UserFormFields
          formData={formData}
          onChange={handleFieldChange}
          isEdit={isEdit}
        />

        <DialogFooter className='gap-2 sm:gap-0 pt-2 border-t border-slate-100'>
          <Button
            type='button'
            variant='ghost'
            onClick={onClose}
            disabled={isProcessing}
            className='rounded-xl font-semibold text-slate-500 hover:bg-slate-100'
          >
            Batal
          </Button>
          <Button
            type='button'
            onClick={handleSubmit}
            disabled={isProcessing}
            className='bg-[#0F4C81] hover:bg-[#0c3e6b] text-white rounded-xl font-bold px-8 shadow-sm'
          >
            {isProcessing ? "Menyimpan..." : "Simpan Data"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
