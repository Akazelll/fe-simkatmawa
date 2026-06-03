import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RestoreDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  itemName?: string;
}

export function RestoreDialog({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  itemName,
}: RestoreDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md rounded-2xl p-6 border-slate-200'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold text-slate-800'>
            Restore Data
          </DialogTitle>
          <DialogDescription className='text-sm text-slate-500 pt-2'>
            Anda yakin ingin mengembalikan{" "}
            <span className='font-semibold text-slate-700'>{itemName}?</span>?
            Data akan kembali muncul di tabel aktif dengan status sebelumnya.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='gap-2 pt-4 border-t border-slate-100'>
          <Button
            variant='ghost'
            onClick={onClose}
            disabled={isLoading}
            className='rounded-xl font-semibold text-slate-500'
          >
            Batal
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className='bg-[#0F4C81] hover:bg-[#0c3e6b] text-white rounded-xl font-bold px-8'
          >
            {isLoading ? "Memproses..." : "Restore Data"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
