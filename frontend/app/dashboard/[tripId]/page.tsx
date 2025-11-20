"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/app/lib/api";
import { useAuthStore } from "@/app/lib/store";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
import {
  CalendarIcon,
  MailPlusIcon,
  MessageSquareIcon,
  UsersIcon,
} from "lucide-react";
import ChatSection from "@/components/ChatSection";
import PollSection from "@/components/PollSection";

export default function TripDetailsPage() {
  const router = useRouter();
  const { tripId } = useParams<{ tripId: string }>();
  const { user } = useAuthStore();

  const { trip, invites, setInvites, loading, isAdmin } = useTripData(tripId);
  const { activeMembers } = useTripSocket(tripId, setInvites);
  const { itinerary, loading: itineraryLoading } = useItinerary(tripId);

  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [sending, setSending] = useState(false);

  const [addOpen, setAddOpen] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const addItinerary = async (data: any) => {
    try {
      setLoadingAdd(true);
      await api.post(`/itinerary/create/${tripId}`, data);
      toast.success("Itinerary added");
      setAddOpen(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add itinerary");
    } finally {
      setLoadingAdd(false);
    }
  };

  const sendInvite = async () => {
    setSending(true);
    try {
      await api.post(`/invite/${tripId}`, { email: inviteEmail });
      setInviteEmail("");
      setInviteOpen(false);
      toast.success("Invite sent!");
    } finally {
      setSending(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-foreground">
        Loading…
      </div>
    );
  }

  if (loading || !trip || itineraryLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-foreground">
        Loading trip…
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center py-8 px-4 bg-background text-foreground">
      <div className="w-full max-w-3xl space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl sm:text-3xl font-semibold">{trip.name}</h1>

          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              ← Back
            </Button>
          </Link>
        </div>

        <TripInfoCard
          trip={trip}
          isAdmin={isAdmin}
          onInviteClick={() => setInviteOpen(true)}
        />
      </div>

      <Tabs defaultValue="itinerary" className="w-full max-w-3xl mt-6">
        <TabsList className="grid grid-cols-3 md:grid-cols-4 w-full gap-3 bg-muted text-foreground mb-2">
          <TabsTrigger value="itinerary" className="text-sm flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            Itinerary
          </TabsTrigger>

          <TabsTrigger value="members" className="text-sm flex items-center">
            <UsersIcon className="w-4 h-4 mr-1" />
            Members
          </TabsTrigger>

          <TabsTrigger value="chat" className="text-sm flex items-center">
            <MessageSquareIcon className="w-4 h-4 mr-1" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="polls" className="text-sm flex items-center">
            <MessageSquareIcon className="w-4 h-4 mr-1" />
            Poll
          </TabsTrigger>

        </TabsList>

        <TabsContent value="itinerary" className="pt-4">
          <ItinerarySection
            itinerary={itinerary}
            isAdmin={isAdmin}
            onAdd={() => setAddOpen(true)}
          />
        </TabsContent>

        <TabsContent value="members" className="pt-4">
          <ActiveMembers activeMembers={activeMembers} />
        </TabsContent>

        <TabsContent value="chat" className="pt-4">
          <ChatSection tripId={tripId} />
        </TabsContent>
        <TabsContent value="polls" className="pt-4">
          <PollSection tripId={tripId} />
        </TabsContent>

      </Tabs>

      <InviteDialog
        open={inviteOpen}
        setOpen={setInviteOpen}
        inviteEmail={inviteEmail}
        setInviteEmail={setInviteEmail}
        sending={sending}
        onSend={sendInvite}
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
