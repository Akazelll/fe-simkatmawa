import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FormWelcomeBannerProps {
  badge: string;
  title: string;
  description: string;
}

export function FormWelcomeBanner({
  badge,
  title,
  description,
}: FormWelcomeBannerProps) {
  return (
    <Card className='rounded-2xl border-slate-100 bg-linear-to-br from-sky-50/60 via-white to-indigo-50/60 shadow-sm'>
      <div className='flex flex-col gap-3 p-6'>
        <span className='inline-flex w-fit items-center gap-1.5 rounded-full bg-[#0F4C81]/10 px-3 py-1 text-xs font-semibold text-[#0F4C81]'>
          <Sparkles size={12} />
          {badge}
        </span>
        <h2 className='text-xl font-bold text-slate-800'>{title}</h2>
        <p className='text-sm text-slate-500 leading-relaxed'>{description}</p>
      </div>
    </Card>
  );
}
