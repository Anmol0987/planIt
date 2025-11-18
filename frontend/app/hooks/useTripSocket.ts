"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSocket } from "@/app/providers/SocketProvider";

export function useTripSocket(tripId: string | undefined, setInvites: any) {
  const socket = useSocket();
  type Member = {
    userId: string;
    name: string;
    email: string;
  };
  const [activeMembers, setActiveMembers] = useState<Member[]>([]);

  useEffect(() => {
    if (!socket || !tripId) return;

    let unmounted = false;

    socket.emit("joinTrip", tripId);

    socket.on("trip:memberJoined", (data) => {
      if (!unmounted) toast.success(`${data.name} joined this trip`);
    });

    socket.on("trip:memberLeft", (data) => {
      if (!unmounted) toast.success(`${data.name} left the trip`);
    });

    socket.on("trip:membersUpdate", (data) => {
      setActiveMembers(data.members);
    });

    socket.on("trip:inviteCreated", (invite) => {
      setInvites((prev: any[]) => [...prev, invite]);
      toast.success(`Invite sent to ${invite.email}`);
    });

    return () => {
      unmounted = true;

      socket.emit("leaveTrip", tripId);
      socket.off("trip:memberJoined");
      socket.off("trip:memberLeft");
      socket.off("trip:membersUpdate");
      socket.off("trip:inviteCreated");
    };
  }, [socket, tripId]);

  return {
    activeMembers,
  };
}
