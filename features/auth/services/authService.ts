import { api, tokenStorage } from "@/lib/api";

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "mahasiswa" | "admin" | "superadmin";
  identitas: string | null;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: AuthUser;
  };
  errors: Record<string, string[]> | null;
};

export type MeResponse = {
  success: boolean;
  message: string;
  data: AuthUser;
  errors: Record<string, string[]> | null;
};

export const authService = {
  login: async (payload: LoginPayload) => {
    const response = await api.post<LoginResponse>("/auth/login", payload);

    // PERBAIKAN: Otomatis simpan token dan data user ke localStorage
    if (response.data.success && response.data.data) {
      const { token, user } = response.data.data;
      tokenStorage.set(token, user);
    }

    return response.data;
  },

  me: async () => {
    const response = await api.get<MeResponse>("/auth/me");
    return response.data;
  },

  logout: async () => {
    try {
      const response = await api.post("/auth/logout");
      return response.data;
    } catch (error) {
      console.error("Gagal memanggil API logout:", error);
    } finally {
      // PERBAIKAN: Pastikan selalu menghapus token dan paksa pindah ke halaman login
      // agar tidak terjadi nyangkut atau error interceptor
      tokenStorage.clear();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  },
};
