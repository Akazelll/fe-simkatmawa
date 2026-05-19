import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  active?: boolean;
}

interface FormPageHeaderProps {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
}

export function FormPageHeader({
  title,
  description,
  breadcrumbs,
}: FormPageHeaderProps) {
  return (
    <div className='flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-4'>
      <div className='flex flex-col gap-1.5'>
        <h1 className='text-2xl font-bold text-slate-800'>{title}</h1>
        <p className='text-sm text-slate-500'>{description}</p>
      </div>

      <nav className='flex items-center gap-1.5 text-sm text-slate-400 flex-wrap'>
        {breadcrumbs.map((item, index) => (
          <span
            key={index}
            className='inline-flex items-center gap-1.5'
          >
            <span
              className={
                item.active ? "font-semibold text-[#0F4C81]" : ""
              }
            >
              {item.label}
            </span>
            {index < breadcrumbs.length - 1 && (
              <ChevronRight size={14} className='text-slate-300' />
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}
