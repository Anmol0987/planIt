import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ItinerarySection({
  itinerary,
  isAdmin,
  onAdd,
}: {
  itinerary: any[];
  isAdmin: boolean;
  onAdd: () => void;
}) {
  return (
    <Card className="w-full  mt-6 bg-card text-card-foreground border border-border rounded-xl shadow-sm">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>🗓 Trip Itinerary</CardTitle>

        {isAdmin && (
          <Button size="sm" variant="outline" onClick={onAdd}>
            + Add
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {itinerary.length === 0 ? (
          <p className="text-muted-foreground text-sm">No itinerary added yet.</p>
        ) : (
          <div className="space-y-4">
            {itinerary.map((item, i) => (
              <div
                key={i}
                className="border border-border p-3 rounded-md bg-muted text-foreground"
              >
                <p className="font-semibold">
                  {new Date(item.date).toDateString()}
                </p>

                <p className="text-sm text-muted-foreground mt-1">
                  {item.note}
                </p>

                <h2 className="mt-1 font-medium">{item.title}</h2>

                <p className="text-sm mt-1">
                  {item.startTime} – {item.endTime}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
