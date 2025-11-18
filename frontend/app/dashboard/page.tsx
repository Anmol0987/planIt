"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/app/lib/store";
import { useRouter } from "next/navigation";
import { api } from "@/app/lib/api";
import toast from "react-hot-toast";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TripForm from "@/components/forms/tripForm";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const { user, setUser }: { user: any; setUser: (u: any) => void } = useAuthStore() as any;
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load user from cookie (/auth/me)
  const loadUser = useCallback(async () => {
    try {
      const res = await api.get("/auth/me"); 
      setUser(res.data.user);
    } catch {
      setUser(null);
      router.replace("/"); 
    }
  }, [setUser, router]);

  // Load trips after user is known
  const fetchTrips = useCallback(async () => {
    try {
      const res = await api.get("/trip");
      setTrips(res.data.data);
    } catch {
      toast.error("Failed to load trips");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  // When user loads, fetch trips
  useEffect(() => {
    if (user) fetchTrips();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Welcome, {user.name}
          </h2>

          <TripForm onTripCreated={() => fetchTrips()} />
        </header>

        <section>
          {loading ? (
            <p className="text-center text-muted-foreground">Loading trips…</p>
          ) : trips.length > 0 ? (
            <div className="space-y-3">
              {trips.map((t) => (
                <Link key={t.id} href={`/dashboard/${t.id}`}>
                  <Card className="border border-muted shadow-sm hover:bg-accent cursor-pointer transition">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">
                        {t.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-sm">
                      Destination: {t.destination}
                      <br />
                      Dates:{" "}
                      <span className="text-foreground">
                        {new Date(t.startDate).toLocaleDateString()} -{" "}
                        {new Date(t.endDate).toLocaleDateString()}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center mt-6">
              No trips found. Start by creating your first adventure 🌍
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
