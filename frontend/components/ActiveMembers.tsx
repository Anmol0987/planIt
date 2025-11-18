"use client";

interface Member {
  userId: string;
  name: string;
  email: string;
}

export default function ActiveMembers({ activeMembers }: { activeMembers: Member[] }) {
  return (
    <div className="flex-col w-full max-w-2xl justify-start bg-accent p-3 rounded-md mt-4">
      <strong>👥 Active now:</strong>
      <ul className="mt-1 mx-12 text-sm max-w-fit text-muted-foreground">
        {activeMembers.map((m) => (
          <li className="flex items-center gap-2 h-5" key={m.userId}>
            <div className="bg-green-400 h-2 w-2 rounded-full"></div>
            {m.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
