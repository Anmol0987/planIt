"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/app/lib/api";
import toast from "react-hot-toast";
import { useAuthStore } from "@/app/lib/store";

export function useTripData(tripId: string | undefined) {
  const { user } = useAuthStore();

  const [trip, setTrip] = useState<any>(null);
  const [invites, setInvites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const isAdmin = trip?.members?.some(
    (m: any) => m.userId === user?.id && m.role === "ADMIN"
  );

  const fetchInvites = useCallback(async () => {
    if (!tripId) return;
    try {
      const res = await api.get(`/invite/${tripId}`);
      setInvites(res.data.invites);
    } catch (err: any) {
      if (isAdmin) toast.error(err.response?.data?.message);
    }
  }, [tripId, isAdmin]);


  useEffect(() => {
    if (!tripId) return;

    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/trip/${tripId}`);
        setTrip(res.data.data);
        if (isAdmin) await fetchInvites();
      } catch {
        toast.error("Failed to load trip details");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [tripId, user, isAdmin, fetchInvites]);

  return {
    trip,
    invites,
    setInvites,
    loading,
    isAdmin,
    fetchInvites,
  };
}
