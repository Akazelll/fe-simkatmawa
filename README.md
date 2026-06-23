# SIMKATMAWA — UDINUS (Frontend)

**Sistem Informasi Rekapitulasi Kegiatan Kemahasiswaan** untuk Universitas Dian Nuswantoro (UDINUS).

Aplikasi web ini digunakan untuk mengelola pengajuan, verifikasi, dan rekapitulasi kegiatan kemahasiswaan (Prestasi, Sertifikat, dan Rekognisi) beserta sinkronisasinya ke sistem Kemdikbud. Mendukung tiga peran pengguna — **mahasiswa**, **admin**, dan **superadmin** — dengan kontrol akses berbasis peran (RBAC).

---

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Prasyarat](#prasyarat)
- [Memulai](#memulai)
- [Variabel Lingkungan](#variabel-lingkungan)
- [Skrip yang Tersedia](#skrip-yang-tersedia)
- [Struktur Proyek](#struktur-proyek)
- [Peran & Hak Akses](#peran--hak-akses)
- [Autentikasi & Integrasi API](#autentikasi--integrasi-api)
- [Konvensi & Catatan Pengembangan](#konvensi--catatan-pengembangan)

---

## Fitur Utama

| Fitur | Mahasiswa | Admin | Superadmin |
| --- | :---: | :---: | :---: |
| **Dashboard** — ringkasan statistik & aktivitas terbaru | ✅ | ✅ | ✅ |
| **Submission** — pengajuan Prestasi / Sertifikat / Rekognisi (CRUD milik sendiri) | ✅ | — | — |
| **Verification** — verifikasi (approve/reject) pengajuan mahasiswa | — | ✅ | ✅ |
| **History** — riwayat pengajuan yang sudah diproses | — | ✅ | ✅ |
| **Queue Monitoring** — pemantauan antrian sinkronisasi & failed jobs | — | ✅ | ✅ |
| **Activity Log** — log aktivitas + ekspor PDF | ✅ | ✅ | ✅ |
| **User Management** — kelola pengguna | — | — | ✅ |
| **Recycle Bin** — pemulihan data terhapus | — | — | ✅ |
| **Settings** — kelola kredensial Kemdikbud | — | — | ✅ |
| **Notifications** — notifikasi dalam aplikasi | ✅ | ✅ | ✅ |

> Domain pengajuan terbagi menjadi tiga jenis: **Prestasi** (achievement), **Sertifikat** (certificate), dan **Rekognisi** (recognition).

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router) + [React 19](https://react.dev)
- **Bahasa:** TypeScript 5
- **Styling:** Tailwind CSS 4, `tw-animate-css`, `next-themes` (dukungan tema)
- **Komponen UI:** [shadcn/ui](https://ui.shadcn.com) (style `base-nova`), Radix UI, Base UI, ikon [lucide-react](https://lucide.dev)
- **Data fetching & state:** [TanStack Query 5](https://tanstack.com/query) + Axios
- **Charts:** Recharts
- **PDF:** `@react-pdf/renderer` (ekspor log aktivitas)
- **Form & input:** `cmdk`, `react-day-picker`, `date-fns`
- **Notifikasi:** `sonner` (toast)
- **Tooling:** ESLint 9, [react-scan](https://github.com/aidenybai/react-scan) (audit re-render)

---

## Prasyarat

- **Node.js** 18.18+ (disarankan LTS terbaru) dan npm
- Backend **SIMKATMAWA API** yang sedang berjalan (lihat [Variabel Lingkungan](#variabel-lingkungan))

---

## Memulai

```bash
# 1. Pasang dependensi
npm install

# 2. Siapkan environment (lihat bagian di bawah)
#    salin .env.example menjadi .env.local lalu isi NEXT_PUBLIC_API_URL
cp .env.example .env.local

# 3. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## Variabel Lingkungan

Salin `.env.example` menjadi `.env.local`, lalu sesuaikan nilainya:

```bash
cp .env.example .env.local
```

```env
# Base URL API backend (Laravel). Wajib diisi.
NEXT_PUBLIC_API_URL=your backend api key
```

| Variabel | Wajib | Keterangan |
| --- | :---: | --- |
| `NEXT_PUBLIC_API_URL` | ✅ | Base URL endpoint API backend. Diekspos ke browser (prefix `NEXT_PUBLIC_`). |

---

## Skrip yang Tersedia

| Perintah | Deskripsi |
| --- | --- |
| `npm run dev` | Menjalankan development server di `localhost:3000` |
| `npm run build` | Build produksi |
| `npm run start` | Menjalankan hasil build produksi |
| `npm run lint` | Menjalankan ESLint |
| `npm run scan` | Menjalankan [react-scan](https://github.com/aidenybai/react-scan) untuk audit performa re-render |

---

## Struktur Proyek

Proyek menggunakan **arsitektur berbasis fitur** (`features/`) dengan App Router Next.js.

```
.
├── app/                      # Routing (App Router)
│   ├── (main)/               # Route group ber-autentikasi (dibungkus AppShell + ProtectedRoute)
│   │   ├── dashboard/
│   │   ├── achievement/      # Prestasi (mahasiswa)
│   │   ├── certificate/      # Sertifikat (mahasiswa)
│   │   ├── recognition/      # Rekognisi (mahasiswa)
│   │   ├── verification/     # Verifikasi (admin/superadmin)
│   │   ├── history/
│   │   ├── queue/            # Queue monitoring
│   │   ├── activity/         # Activity log
│   │   ├── user-management/  # (superadmin)
│   │   ├── recycle-bin/      # (superadmin)
│   │   └── settings/         # (superadmin)
│   ├── login/
│   ├── forbidden/
│   └── layout.tsx            # Root layout (font, QueryProvider, ReactScan)
│
├── features/                 # Modul per-domain (komponen, hooks, services, types, utils)
│   ├── auth/                 # Login, guard, permissions (RBAC)
│   ├── submission/
│   ├── achievement/ certificate/ recognition/
│   ├── verification/
│   ├── dashboard/  history/  queue/  activity/
│   ├── user-management/  recycle-bin/  settings/  notification/
│   └── shared/               # Komponen & hooks lintas fitur
│
├── components/
│   ├── ui/                   # Komponen shadcn/ui
│   ├── providers/            # QueryProvider (TanStack Query)
│   ├── sidebar/              # Navigasi sidebar (berbasis peran)
│   ├── AppShell.tsx  AppSidebar.tsx  Navbar.tsx
│
├── lib/
│   ├── api.ts                # Instance Axios + interceptor + tokenStorage
│   ├── utils.ts              # Helper (cn, dll.)
│   ├── utils/dateFormat.ts
│   └── audit/audit-log.ts
│
├── hooks/                    # Hooks global (mis. use-mobile)
└── public/                   # Aset statis (logo, ikon)
```

Alias path `@/*` dipetakan ke root proyek (lihat `tsconfig.json`).

---

## Peran & Hak Akses

Akses dikendalikan lewat RBAC di [`features/auth/utils/permissions.ts`](features/auth/utils/permissions.ts). Setiap peran memiliki daftar permission, dan navigasi sidebar dirender sesuai peran ([`components/sidebar/useSidebarNav.ts`](components/sidebar/useSidebarNav.ts)).

| Peran | Ringkasan kemampuan |
| --- | --- |
| **mahasiswa** | Membuat & mengelola pengajuan milik sendiri (create, read-own, update-own, delete-own) |
| **admin** | Membaca semua pengajuan, approve/reject, melihat queue |
| **superadmin** | Semua kemampuan admin + recycle bin, user management, settings, kelola kredensial Kemdikbud |

Komponen pelindung yang tersedia: `ProtectedRoute`, `RoleGuard`, `PermissionGuard`, dan helper `hasPermission` / `hasAnyPermission` / `hasRole`.

---

## Autentikasi & Integrasi API

- Autentikasi berbasis **Bearer token** yang disimpan di `localStorage` (lihat `tokenStorage` di [`lib/api.ts`](lib/api.ts)).
- **Request interceptor** otomatis menyisipkan header `Authorization: Bearer <token>`.
- **Response interceptor** menangani `401 Unauthorized` dengan menghapus token dan mengarahkan ke `/login?redirect=<path>`.
- Endpoint auth utama: `POST /auth/login`, `GET /auth/me`, `POST /auth/logout` (lihat [`features/auth/services/authService.ts`](features/auth/services/authService.ts)).
- Backend mengembalikan envelope standar `{ success, message, data, errors }`.

---

## Konvensi & Catatan Pengembangan

- ⚠️ **Versi Next.js ini memiliki breaking changes.** Sebelum menulis kode, baca panduan di `node_modules/next/dist/docs/` dan perhatikan deprecation notice (lihat [`AGENTS.md`](AGENTS.md)).
- Bahasa UI menggunakan **Bahasa Indonesia** (`<html lang="id">`).
- Penambahan komponen UI mengikuti konfigurasi [`components.json`](components.json) (shadcn/ui, style `base-nova`, ikon lucide).
- `react-scan` aktif hanya pada mode development untuk membantu mengaudit re-render.
- Sebagian modul masih menggunakan data dummy / `localStorage` selama integrasi backend berjalan.
