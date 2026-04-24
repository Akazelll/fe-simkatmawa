"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/sidebar";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Efek: Tutup sidebar otomatis setiap kali pindah halaman (Mobile)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Sembunyikan Layout (Sidebar/Hamburger) jika di halaman Login atau Landing
  const isLoginPage = pathname === "/login" || pathname === "/";
  if (isLoginPage) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      
      {/* ===== SIDEBAR DESKTOP ===== */}
      <aside className="hidden lg:block w-64 bg-white border-r border-slate-100 sticky top-0 h-screen overflow-y-auto">
        <Sidebar />
      </aside>

      {/* ===== SIDEBAR MOBILE (DRAWER) ===== */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Overlay gelap dengan efek Blur */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setOpen(false)}
        />

        {/* Drawer Sidebar */}
        <aside
          className={`absolute left-0 top-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Tombol Close di dalam Drawer (Opsional) */}
          <div className="p-4 flex justify-end lg:hidden">
             <button onClick={() => setOpen(false)} className="text-slate-400 p-1">
                <X size={20} />
             </button>
          </div>
          <Sidebar />
        </aside>
      </div>

      {/* ===== MAIN CONTENT WRAPPER ===== */}
      {/* min-w-0 adalah 'magic class' agar konten di dalamnya tidak meluber */}
      <div className="flex-1 flex flex-col min-w-0 w-full relative">

        {/* ===== HAMBURGER HEADER (MOBILE ONLY) ===== */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-100 sticky top-0 z-30">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors text-slate-600 cursor-pointer"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#003580] rounded-lg flex items-center justify-center text-white font-black text-xs">S</div>
            <h1 className="text-sm font-black text-[#003580] tracking-tighter uppercase">
              SIMKATMAWA
            </h1>
          </div>
          
          <div className="w-10" /> {/* Penyeimbang agar logo di tengah */}
        </header>

        {/* ===== CONTENT AREA ===== */}
        <main className="flex-1 w-full max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}