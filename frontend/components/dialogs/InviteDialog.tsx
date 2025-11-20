"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function InviteDialog({
  open,
  setOpen,
  inviteEmail,
  setInviteEmail,
  sending,
  onSend,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  inviteEmail: string;
  setInviteEmail: (value: string) => void;
  sending: boolean;
  onSend: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-xl border border-border bg-background text-card-foreground shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Invite Member
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            Description
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Enter email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            required={true}
          />

          <Button className="w-full" onClick={onSend} disabled={sending}>
            {sending ? "Sending..." : "Invite"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
