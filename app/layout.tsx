import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import LayoutContent from "./layout-context";

export const metadata: Metadata = {
  title: "SIMKATMAWA UDINUS",
  description: "Sistem Informasi Manajemen Pemeringkatan Kemahasiswaan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{ fontFamily: "'Inter', sans-serif" }}
        className="antialiased bg-[#F8FAFC] text-slate-900 selection:bg-blue-100 selection:text-[#003580]"
      >
        <LayoutContent>{children}</LayoutContent>

        <Toaster
          position="top-center"
          richColors
          closeButton
          toastOptions={{
            style: {
              borderRadius: "16px",
              fontFamily: "'Inter', sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}