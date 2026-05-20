import { Badge } from "@/components/ui/badge";
import React from "react";

interface Props {
  title: string;
  description?: string;
  badge?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, badge, action }: Props) {
  return (
    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6'>
      <div className='space-y-1.5'>
        <div className='flex items-center gap-3'>
          <h1 className='text-2xl font-extrabold text-[#1a2b5e] tracking-tight'>
            {title}
          </h1>
          {badge && (
            <Badge className='bg-slate-900 text-white font-bold text-[10px] rounded-md tracking-wider border-0 shadow-none uppercase px-2 py-0.5'>
              {badge}
            </Badge>
          )}
        </div>
        {description && (
          <p className='text-xs font-medium text-slate-500'>{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
