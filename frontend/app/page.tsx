import LoginForm from "@/components/forms/loginForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" flex  gap-16 items-center justify-center bg-background min-h-screen text-foreground transition-colors duration-300">
      <p className="mt-6 text-sm text-muted-foreground">
        <Link
          href="/login"
          className="text-primary hover:underline font-medium transition-colors"
        >
          Login
        </Link>
      </p>
      <p className="mt-6 text-sm text-muted-foreground">
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
