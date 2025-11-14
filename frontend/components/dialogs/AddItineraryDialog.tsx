"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";

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

  const resetFields = () => {
    setTitle("")
    setDate("");
    setStartTime("");
    setEndTime("");
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
      note: note.trim(),
      title: title.trim(),
    });

    resetFields();
  };
  const handleClose = (value: boolean) => {
    if (!loading) {
      resetFields();
      setOpen(value);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-white rounded-xl border">
        <DialogHeader>
          <DialogTitle>Add Itinerary</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            placeholder="From"
          />

          <Input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            placeholder="To"
          />

          <Textarea
            placeholder="Activity (temple visit, hiking, etc)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add Itinerary"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
