"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/lib/auth/types";
import { DUMMY_USERS } from "../data/DummyUsers";
import { logAudit } from "@/lib/audit/audit-log";

export function useAuth() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("simkatmawa_user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoaded(true);
  }, []);

  const login = (email: string, pass: string) => {
    const user = DUMMY_USERS.find(
      (u) => u.email === email && u.password === pass,
    );
    if (user) {
      // Hilangkan password dari object yg disimpan
      const userToStore = { ...user };
      delete userToStore.password;

      localStorage.setItem("simkatmawa_user", JSON.stringify(userToStore));
      setCurrentUser(userToStore);

      logAudit({
        actorId: user.id,
        actorName: user.name,
        actorRole: user.role,
        action: "LOGIN",
        description: "User logged in to the system",
      });

      // Redirect sesuai role
      router.push("/dashboard");
      return true;
    }
    return false;
  };

  const logout = () => {
    if (currentUser) {
      logAudit({
        actorId: currentUser.id,
        actorName: currentUser.name,
        actorRole: currentUser.role,
        action: "LOGOUT",
        description: "User logged out",
      });
    }
    localStorage.removeItem("simkatmawa_user");
    setCurrentUser(null);
    router.push("/login");
  };

  return {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoaded,
    login,
    logout,
  };
}
