import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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
import { AdminUser } from "../types";

interface UpdateAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser | null; 
}

export function UpdateAdminModal({
  isOpen,
  onClose,
  user,
}: UpdateAdminModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, role: user.role });
    }
  }, [user]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md rounded-2xl p-6 border-slate-200'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold text-slate-800'>
            Update Admin
          </DialogTitle>
          <DialogDescription className='text-sm text-slate-500'>
            Perbarui informasi akun untuk {user?.name}.
          </DialogDescription>
        </DialogHeader>

        <div className='flex flex-col gap-4 py-4'>
          <div className='flex flex-col gap-2'>
            <Label className='text-sm font-semibold text-slate-700'>Nama</Label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className='h-11 rounded-xl bg-slate-50/50 border-slate-200'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label className='text-sm font-semibold text-slate-700'>
              Email
            </Label>
            <Input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className='h-11 rounded-xl bg-slate-50/50 border-slate-200'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label className='text-sm font-semibold text-slate-700'>Role</Label>
            <Select
              value={formData.role}
              onValueChange={(val) =>
                val && setFormData({ ...formData, role: val })
              }
            >
              <SelectTrigger className='h-11 rounded-xl bg-slate-50/50 border-slate-200'>
                <SelectValue placeholder='Pilih Role' />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-slate-200'>
                <SelectItem value='Admin'>Admin</SelectItem>
                <SelectItem value='Superadmin'>Superadmin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className='text-[11px] text-slate-400 italic'>
            *Password tidak dapat diubah di sini demi keamanan.
          </p>
        </div>

        <DialogFooter className='gap-2 pt-2 border-t border-slate-100'>
          <Button
            variant='ghost'
            onClick={onClose}
            className='rounded-xl font-semibold text-slate-500'
          >
            Cancel
          </Button>
          <Button
            onClick={onClose}
            className='bg-[#0F4C81] hover:bg-[#0c3e6b] text-white rounded-xl font-bold px-8'
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
