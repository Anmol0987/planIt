import LoginForm from "@/components/forms/loginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className=" flex flex-col items-center justify-center bg-background min-h-screen text-foreground transition-colors duration-300">
      <LoginForm />

      <p className="mt-6 text-sm text-muted-foreground">
        No account?{" "}
        <Link
          href="/register"
          className="text-primary hover:underline font-medium transition-colors"
        >
          Register
        </Link>
      </p>
    </main>
  );
}
