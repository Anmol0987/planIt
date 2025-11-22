"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/app/lib/store";
import { useRouter } from "next/navigation";
import { api } from "@/app/lib/api";
import toast from "react-hot-toast";

import TripForm from "@/components/forms/tripForm";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditTripDialog from "@/components/dialogs/EditTripDialog";
import {
  SkeletonHeader,
  SkeletonTripCard,
  SkeletonTripList,
} from "@/components/SkeletonComponents/SkeletonHeader";

export default function Dashboard() {
  const router = useRouter();
  const { user, setUser }: { user: any; setUser: (u: any) => void } =
    useAuthStore() as any;

  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editTrip, setEditTrip] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);

  const bootstrap = useCallback(async () => {
    setLoading(true);
    try {
      const [userRes, tripsRes] = await Promise.allSettled([
        api.get("/auth/me"),
        api.get("/trip"),
      ]);
      if (userRes.status === "fulfilled") {
        setUser((userRes.value as any).data.user);
      } else {
        setUser(null);
        router.replace("/");
        return;
      }

      if (tripsRes.status === "fulfilled") {
        setTrips((tripsRes.value as any).data.data || []);
      } else {
        toast.error("Failed to load trips");
        setTrips([]);
      }
    } catch (err) {
      console.error("bootstrap error:", err);
      setUser(null);
      router.replace("/");
    } finally {
      setLoading(false);
    }
  }, [router, setUser]);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const fetchTrips = useCallback(async () => {
    try {
      const res = await api.get("/trip");
      setTrips(res.data.data || []);
    } catch {
      toast.error("Failed to load trips");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTrip = useCallback(
    async (id: string) => {
      try {
        setTrips((s) => s.filter((t) => t.id !== id));
        await api.delete(`/trip/${id}`);
        toast.success("Trip deleted");
      } catch (err) {
        toast.error("Failed to delete trip");
        fetchTrips();
      }
    },
    [trips, fetchTrips]
  );

  return (
    <main className="min-h-screen bg-background text-foreground py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {loading ? (
            <div className="space-y-1">
              <div className="h-8 sm:h-9 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
              <div className="h-4 w-36 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
            </div>
          ) : (
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Welcome, {user.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                Manage your trips and plans
              </p>
            </div>
          )}

          <div className="flex justify-end">
            {!loading && <TripForm onTripCreated={() => fetchTrips()} />}
          </div>
        </header>

        {loading ? (
          <section>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-border shadow-sm"
                >
                  <div className="relative rounded-xl overflow-hidden">
                    {/* Background shimmer */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-shimmer bg-[length:200%_100%]" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
                    </div>

                    <div className="relative z-10 p-5 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2 flex-1">
                          {/* Title skeleton */}
                          <div className="h-7 w-48 bg-white/20 dark:bg-white/10 rounded animate-pulse" />
                          {/* Destination skeleton */}
                          <div className="h-4 w-36 bg-white/20 dark:bg-white/10 rounded animate-pulse" />
                        </div>

                        {/* Menu button skeleton */}
                        <div className="h-8 w-8 rounded-full bg-white/20 dark:bg-white/10 animate-pulse" />
                      </div>

                      {/* Date skeleton */}
                      <div className="h-4 w-44 bg-white/20 dark:bg-white/10 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section>
            {trips.length > 0 ? (
              <div className="space-y-4">
                {trips.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-xl overflow-hidden border border-border shadow-sm transition hover:shadow-md"
                  >
                    <Link href={`/dashboard/${t.id}`}>
                      <div className="relative group rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
                        <div className="absolute inset-0">
                          <div
                            className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition"
                            style={{
                              backgroundImage: `url('/card-bg.jpeg')`,
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
                        </div>

                        <div className="relative z-10 p-5 flex flex-col gap-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-semibold text-white">
                                {t.name}
                              </h3>
                              <p className="text-sm text-white/80">
                                Destination: {t.destination}
                              </p>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-8 w-8 p-0 rounded-full bg-black/20 hover:bg-black/30"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreVertical className="h-5 w-5 text-white" />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent
                                align="end"
                                className=" backdrop-blur-xl bg-neutral-50 text-card-foreground"
                              >
                                <DropdownMenuItem
                                  className="flex items-center gap-2 hover:bg-neutral-200 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditTrip(t);
                                    setEditOpen(true);
                                  }}
                                >
                                  <Pencil className="h-4 w-4" /> Edit
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  className="flex items-center gap-2 text-red-700 hover:bg-neutral-200 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTrip(t.id);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="text-white/90 text-sm">
                            {new Date(t.startDate).toLocaleDateString()} —{" "}
                            {new Date(t.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center mt-8">
                You haven’t created any trips yet.
              </p>
            )}
          </section>
        )}
      </div>

      <EditTripDialog
        open={editOpen}
        setOpen={setEditOpen}
        trip={editTrip}
        onSuccess={() => fetchTrips()}
      />
    </main>
  );
}
