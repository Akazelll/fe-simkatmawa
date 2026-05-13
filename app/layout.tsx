import { Manrope } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "SIMKATMAWA - UDINUS",
  description: "Sistem Informasi Rekapitulasi Kegiatan Kemahasiswaan",
  icons: {
    icon: "/logo-udinus.png", 
    apple: "/logo-udinus.png", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='id' className={manrope.variable}>
      <body className='font-sans'>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
