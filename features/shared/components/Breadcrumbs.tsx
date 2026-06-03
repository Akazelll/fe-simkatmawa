"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

const LABEL_MAP: Record<string, string> = {
  dashboard: "Dashboard",
  achievement: "Prestasi",
  certificate: "Sertifikat",
  recognition: "Rekognisi",
  activity: "Activity Log",
  verification: "Verifikasi",
  queue: "Queue Monitoring",
  "user-management": "User Management",
  "recycle-bin": "Recycle Bin",
  settings: "Settings",
  create: "Form",
  edit: "Edit",
};

const formatSegment = (seg: string) =>
  LABEL_MAP[seg] ??
  seg
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav
      aria-label='Breadcrumb'
      className='flex items-center gap-1.5 text-sm text-slate-500 flex-wrap'
    >
      <Link
        href='/dashboard'
        className='inline-flex items-center gap-1.5 text-slate-400 hover:text-[#0F4C81] transition-colors'
      >
        <Home size={14} />
      </Link>

      {segments.map((seg, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;
        const label = formatSegment(seg);

        return (
          <Fragment key={href}>
            <ChevronRight size={14} className='text-slate-300' />
            {isLast ? (
              <span className='font-semibold text-[#0F4C81]'>{label}</span>
            ) : (
              <Link
                href={href}
                className='hover:text-[#0F4C81] transition-colors'
              >
                {label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
