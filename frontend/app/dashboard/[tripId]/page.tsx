"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/app/lib/api";
import { useAuthStore } from "@/app/lib/store";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSocket } from "@/app/providers/SocketProvider";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function TripDetailsPage() {
  // Get tripId from URL
  const { tripId } = useParams<{ tripId: string }>();

  // Auth token from Zustand
  const { token, user } = useAuthStore();

  // Trip info from backend
  const [trip, setTrip] = useState<any>(null);

  // Active users currently online
  const [activeMembers, setActiveMembers] = useState<string[]>([]);

  //get pending invites list
  const [invites, setInvites] = useState<any[]>([]);

  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const [sending, setSending] = useState(false);
  // Get connected socket instance from provider
  const socket = useSocket();

  const isAdmin = trip?.members?.some(
    (m: any) => m.userId === user?.id && m.role === "ADMIN"
  );

  //
  const fetchInvites = async () => {
    if (!token || !tripId) return;
    try {
      const res = await api.get(`/invite/${tripId}`, {
        headers: { Authorization: token },
      });
      console.log(res.data);
      setInvites(res.data.invites);
    } catch {
      setInvites([]);
      if (isAdmin) toast.error("Failed to load invites");
    }
  };

  const sendInvite = async () => {
    setSending(true);
    if (!socket || !inviteEmail.trim()) return;

    try {
      await api.post(
        `/invite/${tripId}`,
        { email: inviteEmail },
        { headers: { Authorization: token } }
      );

      setInviteEmail("");
      setInviteOpen(false);
      setSending(false);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to send invite";
      toast.error(msg);
    }
  };

  //trip details on load
  useEffect(() => {
    if (!tripId || !token) return;
    fetchInvites();
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

  useEffect(() => {
    if (!socket || !tripId) return;

    let isUnmounting = false;

    // Tell backend: opened this trip
    socket.emit("joinTrip", tripId);

    // A new member joined
    const handleMemberJoined = (data: any) => {
      toast.success(`${data.email} joined this trip`);
    };

    // Someone left
    const handleMemberLeft = (data: any) => {
      if (!isUnmounting) toast.success(`${data.email} left the trip`);
    };

    socket.on("trip:memberJoined", handleMemberJoined);
    socket.on("trip:memberLeft", handleMemberLeft);

    //  active members list
    socket.on("trip:membersUpdate", (data) => {
      setActiveMembers(data.members);
    });

    socket.on("trip:inviteCreated", (invite) => {
      setInvites((prev) => [...(prev || []), invite]);
      toast.success(`Invite sent to ${invite.email}`);
    });

    // Cleanup
    return () => {
      isUnmounting = true;

      // Tell backend leaving this trip "
      socket.emit("leaveTrip", tripId);

      // Remove event listeners
      socket.off("trip:memberJoined");
      socket.off("trip:memberLeft");
      socket.off("trip:membersUpdate");
      socket.off("trip:inviteCreated");
    };
  }, [socket, tripId]);

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

        {/* Trip info */}
        <Card>
          <CardHeader>
            <CardTitle>{trip.destination}</CardTitle>
          </CardHeader>

          <CardContent>
            <p>
              <strong>Dates:</strong>{" "}
              {new Date(trip.startDate).toLocaleDateString()} –{" "}
              {new Date(trip.endDate).toLocaleDateString()}
            </p>
            <p className="mt-2">
              <strong>Members:</strong>{" "}
              {trip.members.map((m: any) => m.user.name).join(", ")}
            </p>
            <br />
            {isAdmin && (
              <Button onClick={() => setInviteOpen(true)}>Invite Member</Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/*  Active Members Badge */}
      <div className=" flex-col  w-full max-w-2xl justify-start bg-accent p-3 rounded-md mt-4">

        <strong>👥 Active now:</strong>
        <ul className="mt-1 mx-12 text-sm max-w-fit text-muted-foreground">
          {activeMembers.map((m) => (
            
            <li  className=" flex justify-center items-center gap-2 h-5" key={m}><div className="bg-green-400 h-2 w-2 rounded-full"></div>{m}</li>
          ))}
        </ul>
      </div>
      {isAdmin && (
        <div className="bg-accent p-3 rounded-md mt-4 w-full max-w-2xl">
          <strong>📩 Pending Invites:</strong>

          {Array.isArray(invites) && invites.length > 0 ? (
            <ul className="mt-1 text-sm text-muted-foreground">
              {invites.map((inv, index) => (
                <li key={index}>{inv.email}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm mt-1">
              No pending invites
            </p>
          )}
        </div>
      )}

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-md bg-neutral-50 border border-border shadow-xl rounded-xl">
          <DialogHeader>
            <DialogTitle>Invite Member</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              placeholder="Enter email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <Button className="w-full" onClick={sendInvite}>
              {sending ? "Sending Invite..." : "Invite"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
