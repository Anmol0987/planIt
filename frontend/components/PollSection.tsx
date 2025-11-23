"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { api } from "@/app/lib/api";
import { Trash2, X } from "lucide-react";
import { usePolls } from "@/app/hooks/usePolls";
import { SkeletonPollCard } from "./SkeletonComponents";

export default function PollSection({ tripId }: { tripId: string }) {
  const { polls, loading, setPolls, fetchPolls } = usePolls(tripId);

  const [isOpen, setIsOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState<string[]>(["", ""]);

  async function createPoll() {
    const question = newQuestion.trim();
    const options = newOptions.map((o) => o.trim()).filter(Boolean);

    if (question.length < 5 || options.length < 2) {
      alert("Enter a valid question & at least 2 options");
      return;
    }

    try {
      await api.post(`/trip/${tripId}/polls`, {
        question,
        type: "SINGLE",
        options,
      });

      setIsOpen(false);
      setNewQuestion("");
      setNewOptions(["", ""]);

      fetchPolls();
    } catch (err) {
      console.error("Error creating poll:", err);
    }
  }

  async function vote(pollId: string, optionId: string) {
    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id !== pollId) return poll;

        // remove user’s previous vote
        const filteredVotes = poll.votes.filter((v) => v.userId !== "temp");

        return {
          ...poll,
          votes: [
            ...filteredVotes,
            {
              id: Date.now().toString(),
              optionId,
              userId: "temp",
            },
          ],
        };
      })
    );
    try {
      await api.post(`/polls/${pollId}/vote`, {
        optionIds: [optionId],
      });

      fetchPolls();
    } catch (err) {
      console.error("Error voting:", err);
    }
  }

  async function closePoll(pollId: string) {
    setPolls((prev) =>
      prev.map((p) => (p.id === pollId ? { ...p, isClosed: true } : p))
    );

    try {
      await api.patch(`/polls/${pollId}/close`);
      fetchPolls();
    } catch (err) {
      console.error("Error closing poll:", err);
    }
  }

  async function deletePoll(pollId: string) {
    setPolls((prev) => prev.filter((p) => p.id !== pollId));

    try {
      await api.delete(`/polls/${pollId}`);
      fetchPolls();
    } catch (err) {
      console.error("Error deleting poll:", err);
    }
  }

  if (loading) {
    return <SkeletonPollCard />;
  }
  return (
    <div className="p-4 space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Polls</h2>
        <Button onClick={() => setIsOpen(true)} className="h-8 px-3 text-sm">
          Create Poll
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Poll</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium">Question</label>
              <Input
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Where should we go?"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Options</label>
              {newOptions.map((opt, i) => (
                <Input
                  key={i}
                  value={opt}
                  onChange={(e) =>
                    setNewOptions((arr) =>
                      arr.map((v, idx) => (idx === i ? e.target.value : v))
                    )
                  }
                  placeholder={`Option ${i + 1}`}
                  className="mt-2"
                />
              ))}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNewOptions([...newOptions, ""])}
                className="mt-2"
              >
                + Add option
              </Button>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button onClick={createPoll}>Create</Button>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {polls.length === 0 && (
        <p className="text-muted-foreground text-sm">No polls yet.</p>
      )}

      {polls.map((poll) => (
        <Card key={poll.id} className="p-4 space-y-3 w-full">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-sm">{poll.question}</h3>
              <p className="text-xs text-muted-foreground">
                {poll.type} • {poll.isClosed ? "Closed" : "Open"}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex gap-2 bg-red-500 text-neutral-100"
                onClick={() => deletePoll(poll.id)}
              >
                <Trash2 size={13} /> Delete
              </Button>

              {!poll.isClosed && (
                <Button
                  size="sm"
                  className="flex gap-2 bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-950"
                  onClick={() => closePoll(poll.id)}
                >
                  <X size={15} /> Close
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {poll.options.map((opt) => {
              const count = poll.votes.filter(
                (v) => v.optionId === opt.id
              ).length;
              const total = poll.votes.length;
              const percent =
                total === 0 ? 0 : Math.round((count / total) * 100);

              return (
                <div
                  key={opt.id}
                  className="flex items-center justify-between gap-4 w-full"
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-center text-sm">
                      <span>{opt.text}</span>
                      <span className="text-xs text-muted-foreground">
                        {count} votes
                      </span>
                    </div>

                    <Progress value={percent} className="mt-1" />
                  </div>

                  <Button
                    size="sm"
                    onClick={() => vote(poll.id, opt.id)}
                    disabled={
                      poll.isClosed ||
                      poll.votes.some((v) => v.userId === "temp")
                    }
                    className="whitespace-nowrap"
                  >
                    Vote
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>
      ))}
    </div>
  );
}
