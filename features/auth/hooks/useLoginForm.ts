"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { customToast } from "@/lib/custom-toast";
import { authService } from "@/features/auth/services/authService";

export function useLoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [keepSigned, setKeepSigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      const result = await authService.login({
        email,
        password,
      });

      if (!result.success) {
        const msg = result.message || "Email atau password salah.";
        setError(msg);
        customToast.error("Login Gagal", { description: msg });
        return;
      }

      customToast.success("Selamat Datang!", {
        description: "Berhasil masuk ke sistem SIMKATMAWA.",
      });
      router.push("/dashboard");
    } catch (err: any) {
      const msg =
        err.response?.status === 422
          ? "Format email atau password tidak valid."
          : err.response?.data?.message ||
            "Terjadi kesalahan koneksi. Pastikan backend berjalan.";
      setError(msg);
      customToast.error("Login Gagal", { description: msg });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    error,
    isLoading,
    showPassword,
    keepSigned,
    setEmail,
    setPassword,
    setShowPassword,
    setKeepSigned,
    handleSubmit,
  };
}
