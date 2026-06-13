"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { LoginBrand } from "@/features/auth/components/LoginBrand";
import { LoginCard } from "@/features/auth/components/LoginCard";
import { tokenStorage } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = tokenStorage.get();

    if (token) {
      router.replace("/dashboard");
      return;
    }

    setIsChecking(false);
  }, [router]);

  if (isChecking) {
    return null;
  }

  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-[#f0f2f5] px-4 py-8 gap-5'>
      <LoginBrand />
      <LoginCard />
    </main>
  );
}
