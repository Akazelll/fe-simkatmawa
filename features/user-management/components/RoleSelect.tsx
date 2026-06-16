import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RoleSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function RoleSelect({ value, onChange }: RoleSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(val: string | null) => onChange(val || "")}
    >
      <SelectTrigger className='!h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 focus:ring-[#0F4C81]/20 shadow-none text-slate-700'>
        <SelectValue placeholder='Pilih Role' />
      </SelectTrigger>
      <SelectContent className='rounded-xl border-slate-200'>
        <SelectItem value='Admin' className='cursor-pointer py-2.5'>
          <div className='flex items-center gap-2.5'>
            <span className='font-medium text-slate-700'>Admin</span>
          </div>
        </SelectItem>
        <SelectItem value='Superadmin' className='cursor-pointer py-2.5'>
          <div className='flex items-center gap-2.5'>
            <span className='font-medium text-slate-700'>Superadmin</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
