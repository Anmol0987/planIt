"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/app/lib/api";
import { useSocket } from "@/app/providers/SocketProvider";

type Poll = {
    id: string;
    question: string;
    type: "SINGLE" | "MULTIPLE";
    isClosed: boolean;
    createdBy: string;
    options: { id: string; text: string }[];
    votes: { id: string; optionId: string; userId: string }[];
  };

export function usePolls(tripId: string) {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);

  const socket = useSocket();

  const fetchPolls = useCallback(async () => {
    try {
      const res = await api.get(`/trip/${tripId}/polls`);
      setPolls(res.data.data || []);
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  //@ts-ignore
  useEffect(() => {
    if (!socket) return undefined;

    const handleVoteUpdate = (data: Poll) => {
      setPolls((prev) =>
        prev.map((p) => (p.id === data.id ? data : p))
      );
    };

    socket.on("poll:updated", handleVoteUpdate);

    return () => socket.off("poll:updated", handleVoteUpdate);
  }, [socket]);

  return { polls, loading, fetchPolls, setPolls };
}
