"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { api } from "@/app/lib/api";
import toast from "react-hot-toast";

export default function EditTripDialog({ open, setOpen, trip, onSuccess }: any) {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    if (trip) {
      setName(trip.name);
      setDestination(trip.destination);
      setStart(trip.startDate?.slice(0, 10));
      setEnd(trip.endDate?.slice(0, 10));
    }
  }, [trip]);

  const handleUpdate = async () => {
    try {
      if (!name.trim() || !destination.trim() || !start || !end) {
        toast.error("Please fill all fields");
        return;
      }

      await api.put(`/trip/${trip.id}`, {
        name,
        destination,
        startDate: start,
        endDate: end,
      });

      toast.success("Trip updated!");
      setOpen(false);
      onSuccess();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded-xl border border-border shadow-xl backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Edit Trip</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-3">
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <Label>Destination</Label>
            <Input value={destination} onChange={(e) => setDestination(e.target.value)} />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <Label>Start Date</Label>
              <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
            </div>

            <div className="flex-1">
              <Label>End Date</Label>
              <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
            </div>
          </div>

          <Button onClick={handleUpdate} className="w-full mt-3">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
