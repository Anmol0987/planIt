"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/app/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/app/utils/validate";
import { useAuthStore } from "@/app/lib/store";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting,errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await api.post("/auth/signin", data);
      setUser(res.data.user);
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full max-w-md">
    <Card className="border-border shadow-lg bg-gradient-card">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl font-semibold tracking-tight text-center">
          Welcome back
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Enter your credentials to access your account
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="h-10"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-10"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full h-10 font-medium" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
  );
}
