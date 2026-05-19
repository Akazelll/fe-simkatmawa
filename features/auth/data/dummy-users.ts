import { User } from "@/lib/auth/types";

// Catatan: Password plaintext ini HANYA untuk simulasi logic frontend.
// Nantinya proses otentikasi akan menggunakan Laravel Sanctum REST API.
export const DUMMY_USERS: User[] = [
  {
    id: "user-mahasiswa-001",
    name: "Adam Raga",
    email: "mahasiswa@simkatmawa.test",
    password: "password",
    role: "mahasiswa",
    nim: "A11.2024.15598",
  },
  {
    id: "user-admin-001",
    name: "Admin Kemahasiswaan",
    email: "admin@simkatmawa.test",
    password: "password",
    role: "admin",
  },
  {
    id: "user-superadmin-001",
    name: "Superadmin SIMKATMAWA",
    email: "superadmin@simkatmawa.test",
    password: "password",
    role: "superadmin",
  },
];
