"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/app/lib/theme";
import { Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/store";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="w-full border-b bg-background/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <h1
          onClick={() => router.push("/dashboard")}
          className="text-lg font-semibold cursor-pointer select-none"
        >
          Plan<span className="text-primary">It</span>
        </h1>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
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
