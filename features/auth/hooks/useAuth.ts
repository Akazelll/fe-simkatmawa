"use client";

import { useState, useEffect, useCallback } from "react";
import { authService, AuthUser } from "../services/authService";
import { tokenStorage } from "@/lib/api";

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const checkAuth = useCallback(async () => {
    const token = tokenStorage.get();

    if (!token) {
      setIsLoaded(true);
      return;
    }

    try {
      const response = await authService.me();
      if (response.success) {
        setCurrentUser(response.data);
        tokenStorage.set(token, response.data);
      } else {
        throw new Error("Invalid token");
      }
    } catch (error) {
      tokenStorage.clear();
      setCurrentUser(null);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      tokenStorage.clear();
      setCurrentUser(null);
      window.location.href = "/login";
    }
  };

  return {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoaded,
    logout,
    checkAuth,
  };
}
