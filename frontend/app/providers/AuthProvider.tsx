"use client";

import { useEffect } from "react";
import { api } from "@/app/lib/api";
import { useAuthStore } from "@/app/lib/store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s:any) => s.setUser);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    }

    loadUser();
  }, []);

  return <>{children}</>;
}
