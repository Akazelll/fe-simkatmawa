"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userService } from "../services/userService";

export function UserModal({ isOpen, onClose, user, onSuccess }: any) {
  const isEdit = !!user;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "admin",
    password: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      setErrorMsg("");
      const initialRole =
        user?.roles?.[0]?.name || user?.role || "admin";
      setFormData(
        user
          ? {
              name: user.name || "",
              email: user.email || "",
              role: initialRole,
              password: "",
            }
          : { name: "", email: "", role: "admin", password: "" },
      );
    }
  }, [isOpen, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMsg("");
    try {
      const payload: Record<string, any> = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };
      // Password cuma dikirim saat create (atau saat user mau ganti pas edit)
      if (!isEdit || formData.password) {
        payload.password = formData.password;
      }

      const response = isEdit
        ? await userService.updateUser(user.id, payload)
        : await userService.createUser(payload);

      if (response?.success === false) {
        setErrorMsg(response.message || "Gagal menyimpan data pengguna.");
        return;
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      const beMsg =
        error.response?.data?.message ||
        (error.response?.status === 422
          ? "Terdapat kesalahan pada input form. Silakan periksa kembali."
          : "Gagal menyimpan data pengguna.");
      setErrorMsg(beMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && !isProcessing && onClose()}
    >
      <DialogContent className='sm:max-w-md rounded-2xl'>
        <DialogHeader>
          <DialogTitle className='text-lg font-bold text-slate-900'>
            {isEdit ? "Edit Pengguna" : "Tambah Admin"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4 py-4'>
          {errorMsg && (
            <div className='flex items-center gap-2 p-3 text-sm font-medium text-red-700 bg-red-50 rounded-xl border border-red-200'>
              <AlertCircle className='w-4 h-4 shrink-0' />
              <p>{errorMsg}</p>
            </div>
          )}
          <div className='space-y-2'>
            <Label className='text-xs font-semibold text-slate-600'>
              Nama Lengkap
            </Label>
            <Input
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className='h-10 rounded-xl'
            />
          </div>
          <div className='space-y-2'>
            <Label className='text-xs font-semibold text-slate-600'>
              Email
            </Label>
            <Input
              required
              type='email'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className='h-10 rounded-xl'
            />
          </div>
          <div className='space-y-2'>
            <Label className='text-xs font-semibold text-slate-600'>Role</Label>
            <Select
              value={formData.role}
              onValueChange={
                (val) => setFormData({ ...formData, role: val || "admin" }) // <-- PERBAIKAN DI SINI
              }
              disabled={isEdit && user?.role === "mahasiswa"}
            >
              <SelectTrigger className='h-10 rounded-xl'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='admin'>Admin</SelectItem>
                <SelectItem value='superadmin'>Superadmin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {!isEdit && (
            <div className='space-y-2'>
              <Label className='text-xs font-semibold text-slate-600'>
                Password
              </Label>
              <Input
                required
                type='password'
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className='h-10 rounded-xl'
              />
            </div>
          )}
          <div className='flex justify-end gap-3 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              disabled={isProcessing}
              className='rounded-xl h-10'
            >
              Batal
            </Button>
            <Button
              type='submit'
              disabled={isProcessing}
              className='rounded-xl h-10 bg-[#0F4C81] text-white hover:bg-[#0c3e6b]'
            >
              {isProcessing ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
