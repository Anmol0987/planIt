"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/lib/store";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { hydrated, token, refreshAccessToken } = useAuthStore();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!hydrated) return;

    const init = async () => {
      try{ await refreshAccessToken();}
      catch{}
      setReady(true);
    };

    init();
  }, [ hydrated]);
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};
