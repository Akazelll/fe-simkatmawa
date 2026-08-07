import { useMemo } from "react";
import {
  LayoutDashboard,
  Trophy,
  ScrollText,
  UserCheck,
  Activity,
  Rows3,
  Settings,
  Recycle,
  Award,
  History,
  SquareCheckBig,
  Cpu,
  Users,
  Palette,
  Medal,
  Star,
  Gavel,
  Mic,
  Image as ImageIcon,
  Book,
  ShieldCheck,
  Newspaper,
  Crown,
  Box,
  type LucideIcon,
} from "lucide-react";
import { hasRole } from "@/features/auth/utils/permissions";

export type NavChild = {
  label: string;
  icon: LucideIcon;
  href?: string;
  children?: NavChild[];
};

export type NavItem = {
  label: string;
  icon: LucideIcon;
  href?: string;
  children?: NavChild[];
};

export function useSidebarNav(currentUser: any) {
  return useMemo(() => {
    const items: NavItem[] = [
      { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    ];

    if (hasRole(currentUser, "mahasiswa")) {
      items.push(
        {
          label: "Daftar Prestasi",
          icon: Award,
          children: [
            {
              label: "Prestasi Mandiri",
              icon: Trophy,
              children: [
                {
                  label: "Inovasi Saintek",
                  icon: Cpu,
                  href: "/achievement?kategori=RISNOV",
                },
                {
                  label: "Inovasi Soshum",
                  icon: Users,
                  href: "/achievement?kategori=RISNOVSSH",
                },
                {
                  label: "Seni Budaya",
                  icon: Palette,
                  href: "/achievement?kategori=SENBUD",
                },
                {
                  label: "Olahraga",
                  icon: Medal,
                  href: "/achievement?kategori=OLAHRAGA",
                },
                {
                  label: "Minat Khusus",
                  icon: Star,
                  href: "/achievement?kategori=MINAT",
                },
              ],
            },
            {
              label: "Rekognisi",
              icon: UserCheck,
              children: [
                {
                  label: "Juri",
                  icon: Gavel,
                  href: "/recognition?jenis_group=juri",
                },
                {
                  label: "Keynote",
                  icon: Mic,
                  href: "/recognition?jenis_group=keynote",
                },
                {
                  label: "Karya Seni",
                  icon: ImageIcon,
                  href: "/recognition?jenis_group=karya_seni",
                },
                {
                  label: "Buku",
                  icon: Book,
                  href: "/recognition?jenis_group=buku",
                },
                {
                  label: "Paten",
                  icon: ShieldCheck,
                  href: "/recognition?jenis_group=paten",
                },
                {
                  label: "Publikasi",
                  icon: Newspaper,
                  href: "/recognition?jenis_group=publikasi",
                },
                {
                  label: "Duta",
                  icon: Crown,
                  href: "/recognition?jenis_group=duta",
                },
                {
                  label: "Produk",
                  icon: Box,
                  href: "/recognition?jenis_group=produk",
                },
              ],
            },
            { label: "Sertifikasi", icon: ScrollText, href: "/certificate" },
          ],
        },
        { label: "Activity Log", icon: Activity, href: "/activity" },
      );
    }

    if (hasRole(currentUser, ["admin", "superadmin"])) {
      items.push(
        {
          label: "Daftar Pengajuan",
          icon: SquareCheckBig,
          children: [
            {
              label: "Prestasi Mandiri",
              icon: Trophy,
              href: "/verification/prestasi",
            },
            {
              label: "Rekognisi",
              icon: UserCheck,
              href: "/verification/rekognisi",
            },
            {
              label: "Sertifikasi",
              icon: ScrollText,
              href: "/verification/sertifikasi",
            },
          ],
        },
        { label: "Queue Monitoring", icon: Rows3, href: "/queue" },
        { label: "Activity Log", icon: Activity, href: "/activity" },
      );
    }

    if (hasRole(currentUser, "superadmin")) {
      items.push(
        { label: "User Management", icon: UserCheck, href: "/user-management" },
        { label: "Recycle Bin", icon: Recycle, href: "/recycle-bin" },
        { label: "Settings", icon: Settings, href: "/settings" },
      );
    }

    return items;
  }, [currentUser]);
}
