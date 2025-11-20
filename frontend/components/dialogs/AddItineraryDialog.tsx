"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useState } from "react";

export default function AddItineraryDialog({
  open,
  setOpen,
  onSubmit,
  loading,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  onSubmit: (data: any) => void;
  loading: boolean;
}) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const reset = () => {
    setDate("");
    setStartTime("");
    setEndTime("");
    setTitle("");
    setNote("");
  };

  const handleSubmit = () => {
    if (!date || !startTime || !endTime || !title.trim() || !note.trim()) {
      toast.error("All fields are required");
      return;
    }
    if (endTime <= startTime) {
      toast.error("End time must be greater than start time");
      return;
    }

    onSubmit({
      date,
      startTime,
      endTime,
      title: title.trim(),
      note: note.trim(),
    });

    reset();
  };

  const handleClose = (value: boolean) => {
    if (!loading) {
      reset();
      setOpen(value);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
         className="
         sm:max-w-md 
         rounded-2xl 
         border border-border/60 
         bg-[hsl(var(--card))]/90 
         backdrop-blur-xl 
         text-card-foreground 
         shadow-2xl
         p-6
       "
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Add Itinerary
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          <Input
            placeholder="Title"
            value={title}
              className="bg-background border-border"
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            type="date"
            value={date}
              className="bg-background border-border"
            onChange={(e) => setDate(e.target.value)}
          />

          <Input
            type="time"
            value={startTime}
              className="bg-background border-border"
            onChange={(e) => setStartTime(e.target.value)}
          />

          <Input
            type="time"
            value={endTime}
              className="bg-background border-border"
            onChange={(e) => setEndTime(e.target.value)}
          />

          <Textarea
            placeholder="Activity details"
            value={note}
              className="bg-background border-border"
            onChange={(e) => setNote(e.target.value)}
          />

          <Button className="w-full mt-2" disabled={loading} onClick={handleSubmit}>
            {loading ? "Adding…" : "Add Itinerary"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
