"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/app/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/app/utils/validate";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting ,errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      await api.post("/auth/signUp", data);
      toast.success("Account created! Please login.");
      router.push("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="w-full max-w-md">
    <Card className="border-border shadow-lg bg-gradient-card">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl font-semibold tracking-tight text-center">
          Create an account
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Start planning your next adventure
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="h-10"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

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
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
  );
}
