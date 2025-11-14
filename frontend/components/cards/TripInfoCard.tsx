"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TripInfoCard({ trip, isAdmin, onInviteClick }: any) {
  return (
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

        {isAdmin && (
          <Button onClick={onInviteClick} className="mt-4">
            Invite Member
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
