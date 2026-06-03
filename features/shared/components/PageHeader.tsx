"use client";

import { Plus, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export interface PageHeaderProps {
  title: string;
  description: string;
  createPath?: string;
  buttonText?: string;
  buttonIcon?: LucideIcon;
  onButtonClick?: () => void; 
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  createPath,
  buttonText,
  buttonIcon: Icon = Plus,
  onButtonClick,
  children,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold text-slate-800'>{title}</h1>
        <p className='text-slate-600 text-sm'>{description}</p>
      </div>
      {children && <div className='flex gap-2'>{children}</div>}
      {buttonText && (createPath || onButtonClick) && (
        <Button
          type='button'
          onClick={() =>
            onButtonClick
              ? onButtonClick()
              : createPath && router.push(createPath)
          }
          className='h-10 gap-2 bg-[#1a2b5e] hover:bg-[#111d42] text-white font-bold text-sm rounded-xl shadow-sm px-5 transition-all'
        >
          <Icon size={16} />
          {buttonText}
        </Button>
      )}
    </div>
  );
}
