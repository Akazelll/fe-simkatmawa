import axios from "axios";

export const TOKEN_KEY = "simkatmawa_token";
export const USER_KEY = "user_profile";

export const tokenStorage = {
  get: (): string | null => {
    if (typeof window === "undefined") return null;

    return localStorage.getItem(TOKEN_KEY);
  },

  getUser: () => {
    if (typeof window === "undefined") return null;

    const user = localStorage.getItem(USER_KEY);

    if (!user) return null;

    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  },

  set: (token: string, user?: any) => {
    if (typeof window === "undefined") return;

    localStorage.setItem(TOKEN_KEY, token);

    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  clear: () => {
    if (typeof window === "undefined") return;

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = tokenStorage.get();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers.Accept = "application/json";

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenStorage.clear();

      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;

        if (currentPath !== "/login") {
          window.location.href = `/login?redirect=${encodeURIComponent(
            currentPath,
          )}`;
        }
      }
    }

    return Promise.reject(error);
  },
);
