"use client";

import { useState, useEffect, useCallback } from "react";
import { authService, AuthUser } from "../services/authService";
import { tokenStorage } from "@/lib/api";

// Global state shared across all hook instances
let globalCurrentUser: AuthUser | null = null;
let globalIsLoaded = false;
let globalCheckAuthPromise: Promise<AuthUser | null> | null = null;
const listeners = new Set<(user: AuthUser | null, loaded: boolean) => void>();

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(globalCurrentUser);
  const [isLoaded, setIsLoaded] = useState(globalIsLoaded);

  // Subscribe to global state changes
  useEffect(() => {
    const listener = (user: AuthUser | null, loaded: boolean) => {
      setCurrentUser(user);
      setIsLoaded(loaded);
    };
    listeners.add(listener);

    // Initialize state from global state or cache on mount
    const token = tokenStorage.get();
    const cachedUser = tokenStorage.getUser();

    if (globalIsLoaded) {
      setCurrentUser(globalCurrentUser);
      setIsLoaded(true);
    } else if (token && cachedUser) {
      globalCurrentUser = cachedUser;
      globalIsLoaded = true;
      setCurrentUser(cachedUser);
      setIsLoaded(true);
    } else if (!token) {
      globalIsLoaded = true;
      setIsLoaded(true);
    }

    return () => {
      listeners.delete(listener);
    };
  }, []);

  const updateGlobalState = (user: AuthUser | null, loaded: boolean) => {
    globalCurrentUser = user;
    globalIsLoaded = loaded;
    listeners.forEach((listener) => listener(user, loaded));
  };

  const checkAuth = useCallback(async () => {
    const token = tokenStorage.get();

    if (!token) {
      updateGlobalState(null, true);
      return;
    }

    // If there is already a verification request in progress, reuse it
    if (globalCheckAuthPromise) {
      try {
        const user = await globalCheckAuthPromise;
        if (user) {
          updateGlobalState(user, true);
        }
      } catch {
        updateGlobalState(null, true);
      }
      return;
    }

    // Start a new verification request
    globalCheckAuthPromise = (async () => {
      try {
        const response = await authService.me();
        if (response.success) {
          tokenStorage.set(token, response.data);
          return response.data;
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        tokenStorage.clear();
        return null;
      }
    })();

    try {
      const user = await globalCheckAuthPromise;
      updateGlobalState(user, true);
    } finally {
      globalCheckAuthPromise = null;
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
      updateGlobalState(null, false);
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
