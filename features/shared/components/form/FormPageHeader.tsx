interface FormPageHeaderProps {
  title: string;
  description: string;
}

export function FormPageHeader({ title, description }: FormPageHeaderProps) {
  return (
    <div className='flex flex-col gap-1.5'>
      <h1 className='text-2xl font-bold text-slate-800'>{title}</h1>
      <p className='text-sm text-slate-500'>{description}</p>
    </div>
  );
}
