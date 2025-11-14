"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { api } from "@/app/lib/api";
import { useAuthStore } from "@/app/lib/store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import TripInfoCard from "@/components/cards/TripInfoCard";
import ActiveMembers from "@/components/ActiveMembers";
import PendingInvites from "@/components/PendingInvites";
import InviteDialog from "@/components/dialogs/InviteDialog";
import { useTripSocket } from "@/app/hooks/useTripSocket";
import { useTripData } from "@/app/hooks/useTripData";
import { useItinerary } from "@/app/hooks/useItinerary";
import ItinerarySection from "@/components/ItinerarySection";
import toast from "react-hot-toast";
import AddItineraryDialog from "@/components/dialogs/AddItineraryDialog";

export default function TripDetailsPage() {
  const { token, hydrated } = useAuthStore();
  const { tripId } = useParams<{ tripId: string }>();
  const { trip, invites, setInvites, loading, isAdmin } = useTripData(tripId);

  const { activeMembers } = useTripSocket(tripId, setInvites);

  const { itinerary, loading: itineraryLoading } = useItinerary(
    tripId,
    token,
    hydrated
  );

  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [sending, setSending] = useState(false);

  const [itineraryData, setItineraryData] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const addItinerary = async (data: any) => {
    try {
      setLoadingAdd(true);
      console.log("data=====",data)
      await api.post(`/itinerary/create/${tripId}`, data);

      toast.success("Itinerary added");
      setAddOpen(false);
      setLoadingAdd(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add itinerary");
      setLoadingAdd(false);
    }
  };

  const sendInvite = async () => {
    setSending(true);
    try {
      await api.post(`/invite/${tripId}`, { email: inviteEmail });
      setInviteEmail("");
      setInviteOpen(false);
    } finally {
      setSending(false);
    }
  };
  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Authenticating...
      </div>
    );
  }
  if (loading || !trip || itineraryLoading)
    return (
      <div className="flex justify-center items-center w-full h-min-screen">
        Loading...
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

        <TripInfoCard
          trip={trip}
          isAdmin={isAdmin}
          onInviteClick={() => setInviteOpen(true)}
        />
      </div>

      <ActiveMembers activeMembers={activeMembers} />
      {isAdmin && <PendingInvites invites={invites} />}

      <InviteDialog
        open={inviteOpen}
        setOpen={setInviteOpen}
        inviteEmail={inviteEmail}
        setInviteEmail={setInviteEmail}
        sending={sending}
        onSend={sendInvite}
      />
      <ItinerarySection
        itinerary={itinerary}
        isAdmin={isAdmin}
        onAdd={() => setAddOpen(true)}
      />

      <AddItineraryDialog
        open={addOpen}
        setOpen={setAddOpen}
        onSubmit={addItinerary}
        loading={loadingAdd}
      />
    </main>
  );
}
