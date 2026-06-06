"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
        setError(result.message || "Email atau password salah.");
        return;
      }

      router.push("/dashboard");
    } catch (err: any) {
      if (err.response?.status === 422) {
        setError("Format email atau password tidak valid.");
      } else {
        setError(
          err.response?.data?.message ||
            "Terjadi kesalahan koneksi. Pastikan backend berjalan.",
        );
      }
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
