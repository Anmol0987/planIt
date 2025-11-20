"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/app/lib/api";
import toast from "react-hot-toast";
import { tripSchema } from "@/app/utils/validate";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TripData = z.infer<typeof tripSchema>;
type TripFormProps = { onTripCreated: () => void };

export default function TripForm({ onTripCreated }: TripFormProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TripData>({
    resolver: zodResolver(tripSchema),
  });

  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  const onSubmit = async (data: TripData) => {
    try {
      await api.post("/trip", data);
      toast.success("Trip created successfully!");
      setOpen(false);
      reset();
      onTripCreated();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create trip");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setOpen(true)}>+ New Trip</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-xl border border-border bg-card text-card-foreground shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Create a Trip</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div>
            <Label htmlFor="name">Trip Name</Label>
            <Input id="name" placeholder="Summer Vacation" {...register("name")} />
          </div>

          <div>
            <Label htmlFor="destination">Destination</Label>
            <Input id="destination" placeholder="Manali" {...register("destination")} />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <Label>Start Date</Label>
              <Input type="date" {...register("startDate")} />
            </div>

            <div className="flex-1">
              <Label>End Date</Label>
              <Input type="date" {...register("endDate")} />
            </div>
          </div>

          <Button variant={"default"} type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating…" : "Create Trip"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
