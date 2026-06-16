import { useMemo } from "react";
import { SquareCheckBig } from "lucide-react";
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
  type LucideIcon,
} from "lucide-react";
import { hasRole } from "@/features/auth/utils/permissions";

export type NavChild = {
  label: string;
  icon: LucideIcon;
  href: string;
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
          label: "Submission",
          icon: Award,
          children: [
            { label: "Prestasi", icon: Trophy, href: "/achievement" },
            { label: "Sertifikat", icon: ScrollText, href: "/certificate" },
            { label: "Rekognisi", icon: UserCheck, href: "/recognition" },
          ],
        },
        { label: "Activity Log", icon: Activity, href: "/activity" },
      );
    }

    if (hasRole(currentUser, ["admin", "superadmin"])) {
      items.push(
        {
          label: "Verification",
          icon: SquareCheckBig,
          children: [
            { label: "Prestasi", icon: Trophy, href: "/verification/prestasi" },
            {
              label: "Sertifikat",
              icon: ScrollText,
              href: "/verification/sertifikat",
            },
            {
              label: "Rekognisi",
              icon: UserCheck,
              href: "/verification/rekognisi",
            },
          ],
        },
        { label: "History", icon: History, href: "/history" },
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

