"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Trophy, Award, BadgeCheck, 
  ChevronDown, ChevronUp, LogOut 
} from 'lucide-react';

const MENU_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

const PRESTASI_SUBMENU = [
  { name: "Prestasi", href: "/prestasi", icon: Trophy },
  { name: "Sertifikat", href: "/sertifikat", icon: Award },
  { name: "Rekognisi", href: "/rekognisi", icon: BadgeCheck },
];

export default function Sidebar() {
  const pathname = usePathname();
  
  // Logika: Apakah kita sedang berada di salah satu halaman prestasi (termasuk /tambah)?
  const isPrestasiRouteActive = useMemo(() => {
    return PRESTASI_SUBMENU.some(sub => pathname.startsWith(sub.href));
  }, [pathname]);

  const [isPrestasiOpen, setIsPrestasiOpen] = useState(isPrestasiRouteActive);

  // Sync dropdown agar terbuka otomatis jika halaman di dalamnya diakses
  useEffect(() => {
    if (isPrestasiRouteActive) setIsPrestasiOpen(true);
  }, [isPrestasiRouteActive]);

  const color = {
    strongText: "text-[#003580]",
    softText: "text-slate-600",
    strongIcon: "text-[#003580]",
    softIcon: "text-slate-400",
  };

  return (
    <aside className="w-full flex flex-col h-full font-sans bg-white">      
      {/* LOGO SECTION */}
      <div className="p-6 mb-2 hidden lg:block">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#003580] rounded flex items-center justify-center text-white font-black text-lg">S</div>
          <span className="font-extrabold text-[#003580] tracking-tighter text-lg uppercase">SIMKATMAWA</span>
        </div>
      </div>

      {/* NAV ITEMS */}
      <nav className="flex-1 px-4 space-y-1 mt-4 lg:mt-0">
        
        {/* DASHBOARD */}
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive ? 'bg-blue-50' : 'hover:bg-slate-50'
              }`}>
                <item.icon size={20} className={isActive ? color.strongIcon : color.softIcon} />
                <span className={`text-[13px] sm:text-sm font-semibold ${isActive ? color.strongText : color.softText}`}>
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}

        {/* DROPDOWN PRESTASI GROUP */}
        <div className="space-y-1">
          <div 
            onClick={() => setIsPrestasiOpen(!isPrestasiOpen)}
            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all cursor-pointer group ${
              isPrestasiRouteActive ? 'bg-blue-50/40' : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Trophy size={20} className={isPrestasiRouteActive ? color.strongIcon : color.softIcon} />
              <span className={`text-[13px] sm:text-sm font-semibold ${isPrestasiRouteActive ? color.strongText : color.softText}`}>
                Prestasi
              </span>
            </div>
            {isPrestasiOpen ? <ChevronUp size={16} className={color.softIcon} /> : <ChevronDown size={16} className={color.softIcon} />}
          </div>

          {/* SUB MENU ITEMS */}
          {isPrestasiOpen && (
            <div className="ml-4 pl-4 border-l-2 border-slate-100 space-y-1 mt-1 transition-all">
              {PRESTASI_SUBMENU.map((sub) => {
                // KUNCI RESPONSIVE ACTIVE STATE: Pakai startsWith!
                const isSubActive = pathname.startsWith(sub.href);
                return (
                  <Link key={sub.name} href={sub.href}>
                    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                      isSubActive ? 'bg-blue-100/60' : 'hover:bg-slate-50'
                    }`}>
                      <sub.icon size={18} className={isSubActive ? color.strongIcon : color.softIcon} />
                      <span className={`text-[12px] sm:text-[13px] ${isSubActive ? `${color.strongText} font-bold` : color.softText}`}>
                        {sub.name}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-slate-50">
        <div className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl cursor-pointer transition-colors font-bold text-xs sm:text-sm">
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
}