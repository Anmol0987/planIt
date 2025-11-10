"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/app/lib/store";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, refreshToken } = useAuthStore();

  useEffect(() => {
    if (!token) refreshToken();
  }, [token]);

  return <>{children}</>;
}
