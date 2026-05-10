"use client";

import { Plus, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
  description: string;
  createPath?: string;
  buttonText?: string;
  buttonIcon?: LucideIcon;
  onButtonClick?: () => void;
}

export function PageHeader({
  title,
  description,
  createPath,
  buttonText,
  buttonIcon: Icon = Plus,
  onButtonClick,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold text-slate-800'>{title}</h1>
        <p className='text-slate-600 text-sm'>{description}</p>
      </div>

      {buttonText && (createPath || onButtonClick) && (
        <Button
          onClick={() =>
            onButtonClick
              ? onButtonClick()
              : createPath && router.push(createPath)
          }
          className='h-10 gap-2 bg-[#155DFC] hover:bg-[#124cb0] text-white font-bold text-sm rounded-xl shadow-sm px-5 transition-all hover:-translate-y-0.5'
        >
          <Icon size={16} />
          {buttonText}
        </Button>
      )}
    </div>
  );
}
