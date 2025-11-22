"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/store";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out");
    router.push("/");
  };

  return (
    <nav className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <h1
          onClick={() => router.push("/dashboard")}
          className="text-lg font-semibold cursor-pointer"
        >
          Plan<span className="text-primary">It</span>
        </h1>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {user && (
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
