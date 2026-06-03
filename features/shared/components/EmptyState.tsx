import React from "react";

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function EmptyState({ icon, title, description }: Props) {
  return (
    <div className='flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50'>
      <div className='p-4 bg-white rounded-full shadow-sm mb-4 text-slate-400'>
        {icon}
      </div>
      <h3 className='text-sm font-bold text-slate-700'>{title}</h3>
      <p className='text-xs text-slate-500 mt-1 max-w-sm'>{description}</p>
    </div>
  );
}
