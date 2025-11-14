import RegisterForm from "@/components/forms/registerForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
<main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-subtle px-4 py-12">

      <div className="mb-8 text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">PlanIt</h1>
        <p className="text-muted-foreground">Plan trips together, effortlessly</p>
      </div>

      <RegisterForm />

      <p className="mt-6 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-foreground hover:underline font-medium transition-colors"
        >
          Sign in
        </Link>
      </p>
    </main>
  );
}
