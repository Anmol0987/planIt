"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TripInfoCard({
  trip,
  isAdmin,
  onInviteClick,
}: {
  trip: any;
  isAdmin: boolean;
  onInviteClick: () => void;
}) {
  return (
    <Card className="border-border bg-card text-card-foreground shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {trip.destination}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <p className="text-foreground">
          <span className="font-medium">Dates:</span>{" "}
          {new Date(trip.startDate).toLocaleDateString()} –{" "}
          {new Date(trip.endDate).toLocaleDateString()}
        </p>

        <p className="text-foreground">
          <span className="font-medium">Members:</span>{" "}
          {trip.members.map((m: any) => m.user.name).join(", ")}
        </p>

        {isAdmin && (
          <Button
            onClick={onInviteClick}
            className="mt-2 w-full sm:w-auto"
          >
            Invite Member
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
