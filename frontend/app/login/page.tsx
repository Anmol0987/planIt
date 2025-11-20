import LoginForm from "@/components/forms/loginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground px-4 py-10">
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">PlanIt</h1>
        <p className="text-muted-foreground">Plan trips together, effortlessly</p>
      </div>

      <LoginForm />

      <p className="mt-6 text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-primary underline-offset-2 hover:underline transition-colors font-medium"
        >
          Create one
        </Link>
      </p>
    </main>
  );
}
