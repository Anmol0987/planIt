"use client";
export default function ActiveMembers({ activeMembers }: any) {
  return (
    <div className=" flex-col  w-full max-w-2xl justify-start bg-accent p-3 rounded-md mt-4">
      <strong>👥 Active now:</strong>
      <ul className="mt-1 mx-12 text-sm max-w-fit text-muted-foreground">
        {activeMembers.map((m: any) => (
          <li className=" flex justify-center items-center gap-2 h-5" key={m}>
            <div className="bg-green-400 h-2 w-2 rounded-full"></div>
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}
