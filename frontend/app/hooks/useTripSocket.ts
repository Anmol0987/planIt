"use client";

import { useEffect, useRef, useState } from "react";
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
    socket.off("trip:memberJoined");
    socket.off("trip:memberLeft");
    socket.off("trip:membersUpdate");
    socket.off("trip:inviteCreated");
    socket.emit("joinTrip", tripId);

    const handleJoined = (data: any) => {
      if (data.tripId !== tripId) return;
      toast.success(`${data.name} joined this trip`);
    };

    const handleLeft = (data: any) => {
      if (data.tripId !== tripId) return;
      toast.success(`${data.name} left the trip`);
    };

    const handleMembersUpdate = (data: any) => {
      if (data.tripId !== tripId) return;
      setActiveMembers(data.members);
    };

    const handleInvite = (invite: any) => {
      if (invite.tripId !== tripId) return;
      setInvites((prev: any[]) => [...prev, invite]);
      toast.success(`Invite sent to ${invite.email}`);
    };
    socket.on("trip:memberJoined", handleJoined);
    socket.on("trip:memberLeft", handleLeft);
    socket.on("trip:membersUpdate", handleMembersUpdate);
    socket.on("trip:inviteCreated", handleInvite);


    return () => {

      socket.emit("leaveTrip", tripId);
   
      socket.off("trip:memberJoined", handleJoined);
      socket.off("trip:memberLeft", handleLeft);
      socket.off("trip:membersUpdate", handleMembersUpdate);
      socket.off("trip:inviteCreated", handleInvite);

    };
  }, [socket, tripId]);

  return {
    activeMembers,
  };
}
