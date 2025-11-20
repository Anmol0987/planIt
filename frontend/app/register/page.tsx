import RegisterForm from "@/components/forms/registerForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground px-4 py-10">
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">PlanIt</h1>
        <p className="text-muted-foreground">Plan trips together, effortlessly</p>
      </div>

      <RegisterForm />

      <p className="mt-6 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary underline-offset-2 hover:underline transition-colors font-medium"
        >
          Sign in
        </Link>
      </p>
    </main>
  );
}
