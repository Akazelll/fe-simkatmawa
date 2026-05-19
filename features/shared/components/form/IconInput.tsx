import { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
}

export function IconInput({
  icon: Icon,
  className,
  ...props
}: IconInputProps) {
  return (
    <div className='relative w-full'>
      {Icon && (
        <Icon
          size={16}
          className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none'
        />
      )}
      <Input
        {...props}
        className={cn(
          "w-full h-11 md:h-12 bg-white border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all placeholder:text-slate-400",
          Icon && "pl-10",
          className,
        )}
      />
    </div>
  );
}
