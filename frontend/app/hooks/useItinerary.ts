"use client";

import { useEffect, useState } from "react";
import { api } from "@/app/lib/api";
import toast from "react-hot-toast";
import { useSocket } from "../providers/SocketProvider";

export function useItinerary(
  tripId: string | undefined,
  token: string | null,
  hydrated: boolean
) {
  const [itinerary, setItinerary] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  const fetchItinerary = async () => {
    if (!tripId || !token) return;
    try {
      console.log("calling itenarty get", tripId);
      const res = await api.get(`/itinerary/${tripId}`);
      console.log("inside itenary hook", res.data);
      setItinerary(res.data.data);
    } catch (error: any) {
      if (error?.response?.status !== 401) {
        toast.error("Failed to load itinerary");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!hydrated) return;
    if (!token) return;
    if (!tripId) return;
    fetchItinerary();
  }, [tripId, token, hydrated]);

  useEffect(() => {
    if (!socket) return;

    const handleNewItem = (item: any) => {
      setItinerary((prev: any) => [...prev, item]);
    };

    socket.on("trip:itineraryCreated", handleNewItem);

    return () => {
      socket.off("trip:itineraryCreated", handleNewItem);
    };
  }, [socket]);
  return { itinerary, loading, fetchItinerary };
}
