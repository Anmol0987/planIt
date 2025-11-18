"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/app/lib/api";
import toast from "react-hot-toast";
import { useSocket } from "../providers/SocketProvider";

export function useItinerary(tripId?: string) {
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  // Fetch itinerary list
  const fetchItinerary = useCallback(async () => {
    if (!tripId) return;

    try {
      const res = await api.get(`/itinerary/${tripId}`);
      setItinerary(res.data.data || []);
    } catch (error: any) {
      toast.error("Failed to load itinerary");
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  // Run fetch on mount / trip change
  useEffect(() => {
    if (!tripId) return;
    fetchItinerary();
  }, [tripId, fetchItinerary]);

  // Listen for new itinerary items through socket
  useEffect(() => {
    if (!socket) return;

    const handleNewItem = (item: any) => {
      setItinerary((prev) => [...prev, item]);
    };

    socket.on("trip:itineraryCreated", handleNewItem);

    return () => {
      socket.off("trip:itineraryCreated", handleNewItem);
    };
  }, [socket]);

  return { itinerary, loading, fetchItinerary };
}
