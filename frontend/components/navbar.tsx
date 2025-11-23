"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon, User as UserIcon, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/store";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { api } from "@/app/lib/api";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      logout();
      router.replace("/login"); 
      toast.success("Successfully logged out");
    } catch {
      toast.error("Logout failed");
    }
  };

  const avatarInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <nav className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        
        {/* Brand */}
        <h1
          onClick={() => {
            if (!user) router.push("/");
            else router.push("/dashboard");
          }}
          className="text-lg font-semibold cursor-pointer transition-all hover:text-primary"
        >
          Plan<span className="text-primary">It</span>
        </h1>

        <div className="flex items-center gap-3">

          {/* KEEP THE THEME SWITCH COMMENTED */}
          {/*
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          */}

          {/* If logged out → show Login */}
          {!user && (
            <Button
              variant="outline"
              onClick={() => router.push("/login")}
              className="px-4"
            >
              Login
            </Button>
          )}

          {/* If logged in → show avatar menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger className="z-50" asChild>
                <Avatar className="cursor-pointer hover:opacity-80 transition">
                  <AvatarFallback>{avatarInitial}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 bg-neutral-50 z-[999]">
                <DropdownMenuLabel>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* <DropdownMenuItem
                  onClick={() => router.push("/profile")}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4" /> Profile
                </DropdownMenuItem> */}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

        </div>
      </div>
    </nav>
  );
}
