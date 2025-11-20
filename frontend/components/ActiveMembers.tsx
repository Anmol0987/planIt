"use client";

interface Member {
  userId: string;
  name: string;
  email: string;
}

export default function ActiveMembers({ activeMembers }: { activeMembers: Member[] }) {
  return (
    <div className="w-full  bg-card text-card-foreground border border-border rounded-xl p-4 shadow-sm mt-4">
      <p className="font-medium flex items-center gap-2">
        👥 Active now:
      </p>

      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {activeMembers.map((m) => (
          <li key={m.userId} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
            {m.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
