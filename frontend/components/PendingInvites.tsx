export default function PendingInvites({ invites }: any) {
  return (
    <div className="w-full  bg-card text-card-foreground border border-border rounded-xl p-4 mt-4 shadow-sm">
      <strong className="font-medium">📩 Pending Invites:</strong>

      {Array.isArray(invites) && invites.length > 0 ? (
        <ul className="mt-2 text-sm text-muted-foreground space-y-1">
          {invites.map((inv: any, index: number) => (
            <li key={index}>{inv.email}</li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground text-sm mt-2">No pending invites</p>
      )}
    </div>
  );
}
