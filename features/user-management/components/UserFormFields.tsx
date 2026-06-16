import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface UserFormData {
  name: string;
  email: string;
  role: string;
  password: string;
}

interface UserFormFieldsProps {
  formData: UserFormData;
  onChange: (field: keyof UserFormData, value: string) => void;
  isEdit: boolean;
}

export function UserFormFields({
  formData,
  onChange,
  isEdit,
}: UserFormFieldsProps) {
  return (
    <div className='flex flex-col gap-4 py-4'>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='name' className='text-sm font-semibold text-slate-700'>
          Nama Lengkap
        </Label>
        <Input
          id='name'
          value={formData.name || ""}
          onChange={(e) => onChange("name", e.target.value || "")}
          placeholder='Contoh: Udinus Semarang'
          className='h-11 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-[#0F4C81]/20'
        />
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor='email' className='text-sm font-semibold text-slate-700'>
          Email
        </Label>
        <Input
          id='email'
          type='email'
          value={formData.email || ""}
          onChange={(e) => onChange("email", e.target.value || "")}
          placeholder='admin@domain.com'
          className='h-11 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-[#0F4C81]/20'
        />
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor='role' className='text-sm font-semibold text-slate-700'>
          Role
        </Label>
        <Select
          value={formData.role || ""}
          onValueChange={(val: any) => onChange("role", val || "")}
        >
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
          Password{" "}
          {isEdit && (
            <span className='text-slate-400 font-normal'>(Opsional)</span>
          )}
        </Label>
        <Input
          id='password'
          type='password'
          value={formData.password || ""}
          onChange={(e) => onChange("password", e.target.value || "")}
          placeholder={
            isEdit ? "Biarkan kosong jika tidak ingin mengubah" : "••••••••"
          }
          className='h-11 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-[#0F4C81]/20'
        />
        {isEdit && (
          <p className='text-[11px] text-slate-400 italic mt-1'>
            *Isi kolom ini hanya jika Anda ingin mengubah kata sandi pengguna
            ini.
          </p>
        )}
      </div>
    </div>
  );
}
