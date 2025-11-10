"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/app/lib/api";
import { useAuthStore } from "@/app/lib/store";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TripDetailsPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const { token } = useAuthStore();
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    if (!tripId || !token) return;
    (async () => {
      try {
        const res = await api.get(`/trip/${tripId}`, {
          headers: { Authorization: token },
        });
        setTrip(res.data.data);
      } catch {
        toast.error("Failed to load trip details");
      }
    })();
  }, [tripId, token]);

  if (!trip)
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        Loading trip...
      </div>
    );

  return (
    <main className="min-h-screen flex flex-col items-center py-10 px-4 bg-background text-foreground">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{trip.name}</h1>
          <Link href="/dashboard">
            <Button variant="outline">← Back</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{trip.destination}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Dates:</strong> 
              {new Date(trip.startDate).toLocaleDateString()} – 
              {new Date(trip.endDate).toLocaleDateString()}
            </p>
            <p className="mt-2">
              <strong>Members:</strong> 
              {trip.members.map((m: any) => m.user.name).join(", ")}
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
