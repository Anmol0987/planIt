import { Link } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
export default function TripCard({ t, deleteTrip }:any) {
    return (
        <div
        key={t.id}
        className="rounded-xl overflow-hidden border border-border shadow-sm transition hover:shadow-md"
      >
        <Link href={`/dashboard/${t.id}`}>
          <div className="relative group rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition"
                style={{
                  backgroundImage: `url('/card-bg.jpeg')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
            </div>

            <div className="relative z-10 p-5 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {t.name}
                  </h3>
                  <p className="text-sm text-white/80">
                    Destination: {t.destination}
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 rounded-full bg-black/20 hover:bg-black/30"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-5 w-5 text-white" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className=" backdrop-blur-xl bg-neutral-50 text-card-foreground"
                  >
                    <DropdownMenuItem
                      className="flex items-center gap-2 hover:bg-neutral-200 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditTrip(t);
                        setEditOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" /> Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="flex items-center gap-2 text-red-700 hover:bg-neutral-200 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTrip(t.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="text-white/90 text-sm">
                {new Date(t.startDate).toLocaleDateString()} —{" "}
                {new Date(t.endDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
  