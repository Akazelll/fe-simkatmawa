import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackLinkProps {
  href: string;
  label?: string;
}

export function BackLink({ href, label = "Kembali" }: BackLinkProps) {
  return (
    <Link
      href={href}
      className='inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors duration-150 hover:text-[#0F4C81] w-fit group'
    >
      <ArrowLeft
        size={16}
        className='transition-transform duration-150 group-hover:-translate-x-0.5'
      />
      {label}
    </Link>
  );
}
