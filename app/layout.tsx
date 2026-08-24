import { Manrope } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { ReactScan } from "@/components/ReactScan";
import { Toaster } from "@/components/ui/sonner";

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
    <html lang='id' className={manrope.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var clean = function(el) {
                    if (el && el.removeAttribute) {
                      el.removeAttribute('bis_skin_checked');
                      el.removeAttribute('bis_register');
                    }
                  };
                  var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(m) {
                      if (m.type === 'attributes' && m.attributeName && m.attributeName.indexOf('bis_') === 0) {
                        clean(m.target);
                      }
                    });
                  });
                  observer.observe(document.documentElement, { attributes: true, subtree: true });
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className='font-sans' suppressHydrationWarning>
        {process.env.NODE_ENV === "development" && <ReactScan />}
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
