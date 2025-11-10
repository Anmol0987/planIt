import RegisterForm from "@/components/forms/registerForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground transition-colors duration-300">
      {/* Register Form */}
      <RegisterForm />

      {/* Bottom Text */}
      <p className="mt-6 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary hover:underline font-medium transition-colors"
        >
          Login
        </Link>
      </p>
    </main>
  );
}
