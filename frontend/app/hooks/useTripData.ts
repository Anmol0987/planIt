"use client";

import { useEffect, useState } from "react";
import { api } from "@/app/lib/api";
import toast from "react-hot-toast";
import { useAuthStore } from "@/app/lib/store";

export function useTripData(tripId: string | undefined) {
  const { token, user } = useAuthStore();

  const [trip, setTrip] = useState<any>(null);
  const [invites, setInvites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const isAdmin = trip?.members?.some(
    (m: any) => m.userId === user?.id && m.role === "ADMIN"
  );

  const fetchInvites = async () => {
    if (!token || !tripId) return;
    try {
      const res = await api.get(`/invite/${tripId}`);
      setInvites(res.data.invites);
    } catch (err: any) {
      if (isAdmin) toast.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    if (!tripId || !token) return;

    const load = async () => {
      try {
        const res = await api.get(`/trip/${tripId}`);
        setTrip(res.data.data);
        fetchInvites();
      } catch {
        toast.error("Failed to load trip details");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [tripId, token]);

  return {
    trip,
    invites,
    setInvites,
    loading,
    isAdmin,
    fetchInvites,
  };
}
