"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/app/lib/store";
import { useRouter } from "next/navigation";
import { api } from "@/app/lib/api";
import toast from "react-hot-toast";

// ✅ shadcn/ui imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TripForm from "@/components/forms/tripForm";

export default function Dashboard() {
  const { token, user } = useAuthStore();
  const router = useRouter();
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await api.get("/trip", {
        headers: { Authorization: token },
      });
      setTrips(res.data.data);
    } catch {
      toast.error("Failed to load trips");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }

    fetchTrips();
  }, [token]);

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Welcome, {user?.email?.split("@")[0] || "Traveler ✈️"}
          </h2>

          <TripForm onTripCreated={() => fetchTrips()} />
        </header>

        {/* Trips List */}
        <section>
          {trips.length > 0 ? (
            <div className="space-y-3">
              {trips.map((t) => (
                <Card key={t.id} className="border border-muted shadow-sm">
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
