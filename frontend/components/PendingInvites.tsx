export default function PendingInvites({invites}:any){
    return(
        <div className="bg-accent p-3 rounded-md mt-4 w-full max-w-2xl">
          <strong>📩 Pending Invites:</strong>

          {Array.isArray(invites) && invites.length > 0 ? (
            <ul className="mt-1 text-sm text-muted-foreground">
              {invites.map((inv, index) => (
                <li key={index}>{inv.email}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm mt-1">
              No pending invites
            </p>
          )}
        </div>
    )
}