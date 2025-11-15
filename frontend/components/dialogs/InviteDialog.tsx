import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

export default function InviteDialog({
  open,
  setOpen,
  inviteEmail,
  setInviteEmail,
  sending,
  onSend,
}: {open:boolean,
  setOpen:(value:boolean)=>void
  inviteEmail:string,
  setInviteEmail:(value:string)=>void,
  sending:boolean,
  onSend:()=>void

}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-md bg-neutral-50 border border-border shadow-xl rounded-xl">
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Enter email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <Button className="w-full" onClick={onSend}>
            {sending ? "Sending Invite..." : "Invite"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
