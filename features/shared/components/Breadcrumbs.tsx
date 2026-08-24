"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

const KATEGORI_BREADCRUMB_MAP: Record<string, string> = {
  RISNOV: "Inovasi Saintek",
  RISNOVSSH: "Inovasi Soshum",
  SENBUD: "Seni Budaya",
  OLAHRAGA: "Olahraga",
  MINAT: "Minat Khusus",
};

const REKOGNISI_BREADCRUMB_MAP: Record<string, string> = {
  juri: "Juri",
  keynote: "Keynote",
  karya_seni: "Karya Seni",
  buku: "Buku",
  paten: "Paten",
  publikasi: "Publikasi",
  duta: "Duta",
  produk: "Produk",
};

const GENERAL_LABEL_MAP: Record<string, string> = {
  dashboard: "Dashboard",
  achievement: "Prestasi Mandiri",
  certificate: "Sertifikasi",
  recognition: "Rekognisi",
  activity: "Activity Log",
  verification: "Verifikasi",
  queue: "Queue Monitoring",
  "user-management": "User Management",
  "recycle-bin": "Recycle Bin",
  settings: "Pengaturan",
  create: "Tambah Data",
  edit: "Edit Data",
};

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [];

    if (!pathname || pathname === "/") return items;

    // 1. Prestasi Mandiri (/achievement)
    if (pathname.startsWith("/achievement")) {
      items.push({ label: "Daftar Prestasi" });
      items.push({ label: "Prestasi Mandiri", href: "/achievement" });

      const kategoriKey = searchParams.get("kategori");
      if (kategoriKey && KATEGORI_BREADCRUMB_MAP[kategoriKey]) {
        const kategoriLabel = KATEGORI_BREADCRUMB_MAP[kategoriKey];
        const isListOnly = pathname === "/achievement";
        items.push({
          label: kategoriLabel,
          href: isListOnly ? undefined : `/achievement?kategori=${kategoriKey}`,
        });
      }

      if (pathname.includes("/create")) {
        items.push({ label: "Tambah Data" });
      } else if (pathname.includes("/edit")) {
        items.push({ label: "Edit Data" });
      } else if (pathname !== "/achievement") {
        items.push({ label: "Detail" });
      }

      return items;
    }

    // 2. Rekognisi (/recognition)
    if (pathname.startsWith("/recognition")) {
      items.push({ label: "Daftar Prestasi" });
      items.push({ label: "Rekognisi", href: "/recognition" });

      const jenisGroupKey = searchParams.get("jenis_group");
      if (jenisGroupKey && REKOGNISI_BREADCRUMB_MAP[jenisGroupKey]) {
        const groupLabel = REKOGNISI_BREADCRUMB_MAP[jenisGroupKey];
        const isListOnly = pathname === "/recognition";
        items.push({
          label: groupLabel,
          href: isListOnly ? undefined : `/recognition?jenis_group=${jenisGroupKey}`,
        });
      }

      if (pathname.includes("/create")) {
        items.push({ label: "Tambah Data" });
      } else if (pathname.includes("/edit")) {
        items.push({ label: "Edit Data" });
      } else if (pathname !== "/recognition") {
        items.push({ label: "Detail" });
      }

      return items;
    }

    // 3. Sertifikasi (/certificate)
    if (pathname.startsWith("/certificate")) {
      items.push({ label: "Daftar Prestasi" });
      const isListOnly = pathname === "/certificate";
      items.push({
        label: "Sertifikasi",
        href: isListOnly ? undefined : "/certificate",
      });

      if (pathname.includes("/create")) {
        items.push({ label: "Tambah Data" });
      } else if (pathname.includes("/edit")) {
        items.push({ label: "Edit Data" });
      } else if (pathname !== "/certificate") {
        items.push({ label: "Detail" });
      }

      return items;
    }

    // 4. Default dynamic fallback for other routes
    const segments = pathname.split("/").filter(Boolean);
    segments.forEach((seg, i) => {
      const isLast = i === segments.length - 1;
      const href = "/" + segments.slice(0, i + 1).join("/");
      const label =
        GENERAL_LABEL_MAP[seg] ??
        seg
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(" ");

      items.push({
        label,
        href: isLast ? undefined : href,
      });
    });

    return items;
  };

  const items = getItems();
  if (items.length === 0) return null;

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

      {items.map((item, i) => {
        const isLast = i === items.length - 1;

        return (
          <Fragment key={i}>
            <ChevronRight size={14} className='text-slate-300' />
            {isLast || !item.href ? (
              <span
                className={
                  isLast ? "font-semibold text-[#0F4C81]" : "text-slate-500"
                }
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className='hover:text-[#0F4C81] transition-colors'
              >
                {item.label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
