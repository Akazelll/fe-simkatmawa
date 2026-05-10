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

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddAdminModal({ isOpen, onClose }: AddAdminModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md rounded-2xl p-6 border-slate-200'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold text-slate-800'>
            Add New Admin
          </DialogTitle>
          <DialogDescription className='text-sm text-slate-500'>
            Isi detail di bawah untuk menambahkan pengguna admin baru.
          </DialogDescription>
        </DialogHeader>

        <div className='flex flex-col gap-4 py-4'>
          <div className='flex flex-col gap-2'>
            <Label
              htmlFor='name'
              className='text-sm font-semibold text-slate-700'
            >
              Nama
            </Label>
            <Input
              id='name'
              placeholder='Contoh: Adam Raga'
              className='h-11 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-[#0F4C81]/20'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label
              htmlFor='email'
              className='text-sm font-semibold text-slate-700'
            >
              Email
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='admin@domain.com'
              className='h-11 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-[#0F4C81]/20'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label
              htmlFor='role'
              className='text-sm font-semibold text-slate-700'
            >
              Role
            </Label>
            <Select>
              <SelectTrigger className='h-11 rounded-xl bg-slate-50/50 border-slate-200 focus:ring-[#0F4C81]/20 shadow-none'>
                <SelectValue placeholder='Pilih Role' />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-slate-200'>
                <SelectItem value='Admin'>Admin</SelectItem>
                <SelectItem value='Superadmin'>Superadmin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col gap-2'>
            <Label
              htmlFor='password'
              className='text-sm font-semibold text-slate-700'
            >
              Password
            </Label>
            <Input
              id='password'
              type='password'
              placeholder='••••••••'
              className='h-11 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-[#0F4C81]/20'
            />
          </div>
        </div>

        <DialogFooter className='gap-2 sm:gap-0 pt-2 border-t border-slate-100'>
          <Button
            type='button'
            variant='ghost'
            onClick={onClose}
            className='rounded-xl font-semibold text-slate-500 hover:bg-slate-100'
          >
            Cancel
          </Button>
          <Button
            type='button'
            onClick={onClose}
            className='bg-[#0F4C81] hover:bg-[#0c3e6b] text-white rounded-xl font-bold px-8 shadow-sm'
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
