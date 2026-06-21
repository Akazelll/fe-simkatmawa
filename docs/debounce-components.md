# Komponen dengan Debounce

Daftar komponen yang memakai debounce (lewat hook `useDebounce`). Ini target utama saat ngescan re-render pakai **react-scan** — pastikan saat ngetik di input, fetch/re-render tidak terjadi tiap karakter, tapi hanya setelah jeda debounce.

| Komponen | File | Yang di-debounce | Delay | Dipakai di |
| --- | --- | --- | --- | --- |
| `useDebounce` (hook dasar) | [features/shared/hooks/useDebounce.ts](../features/shared/hooks/useDebounce.ts) | nilai apa pun (generic) | default `400ms` | dipakai oleh 3 komponen di bawah |
| `FilterSection` | [features/shared/components/FilterSection.tsx](../features/shared/components/FilterSection.tsx) | input search | `400ms` (bisa override via prop `searchDebounceMs`) | achievement, user-management, recycle-bin, verification, recognition, queue, history, certificate, `ActivityLogFilter` |
| `SearchablePersonInput` | [features/submission/components/SearchablePersonInput.tsx](../features/submission/components/SearchablePersonInput.tsx) | `searchQuery` (cari mahasiswa/dosen) | `300ms` | form submission/pengajuan |
| `DosenNameAutocomplete` | [features/shared/components/form/DosenNameAutocomplete.tsx](../features/shared/components/form/DosenNameAutocomplete.tsx) | `value` (cari dosen pembimbing) | `300ms` | form yang butuh autocomplete dosen |

## Cara scan pakai react-scan

react-scan sudah terpasang sebagai dev dependency dan auto-aktif saat development (lihat [components/ReactScan.tsx](../components/ReactScan.tsx) yang dirender di [app/layout.tsx](../app/layout.tsx) hanya saat `NODE_ENV === "development"`).

**Cara 1 — overlay langsung di app (rekomendasi):**

```bash
npm run dev
```

Buka app, lalu ketik di salah satu input search/autocomplete di atas. react-scan akan menandai (highlight) komponen yang re-render secara real-time. Yang dicek: input **tidak** memicu fetch/re-render berat tiap ketukan, melainkan hanya setelah jeda debounce (300–400ms).

**Cara 2 — via CLI (browser terpisah):**

```bash
npm run dev      # terminal 1
npm run scan     # terminal 2 — react-scan localhost:3000
```

> Catatan: react-scan hanya alat dev. Komponen `ReactScan` di-guard `NODE_ENV === "development"` jadi tidak ikut ke production build.
