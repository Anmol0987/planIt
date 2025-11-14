import LoginForm from "@/components/forms/loginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-subtle px-4">

    <div className="mb-8 text-center space-y-2">
      <h1 className="text-4xl font-bold tracking-tight">PlanIt</h1>
      <p className="text-muted-foreground">Plan trips together, effortlessly</p>
    </div>

    <LoginForm />

    <p className="mt-6 text-sm text-muted-foreground">
      Don't have an account?{" "}
      <Link
        href="/register"
        className="text-foreground hover:underline font-medium transition-colors"
      >
        Create one
      </Link>
    </p>
  </main>
  );
}
