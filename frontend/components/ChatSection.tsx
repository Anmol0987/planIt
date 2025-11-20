"use client";

import { useState } from "react";
import { useTripChat } from "@/app/hooks/useTripChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/app/lib/store";
import { TypingIndicator } from "./TypingIndicator";

export default function ChatSection({ tripId }: { tripId: string }) {
  const { messages, sendMessage, sendTyping, stopTyping, typingUser } =
    useTripChat(tripId);
  const { user } = useAuthStore();
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
    stopTyping();
  };

  return (
    <div className="relative w-full h-[480px] overflow-hidden rounded-2xl">
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="
            absolute inset-0 
            bg-[url('/chat-bg.png')] 
            bg-top 
            bg-cover 
            bg-no-repeat    
          "
        ></div>

      </div>

      <div
        className="
          relative flex flex-col h-full rounded-2xl p-4 
          bg-white/40 dark:bg-[#1c1c1e]/40
          backdrop-blur-sm 
          shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)]
          border border-white/10
        "
      >
        {/* Messages */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 p-2">
          {messages.map((msg, idx) => {
            const isMe = msg.userId === user?.id;

            return (
              <div
                key={idx}
                className={`flex flex-col max-w-[80%] ${
                  isMe ? "ml-auto items-end" : "items-start"
                }`}
              >
                {!isMe && (
                  <span className="text-xs font-medium text-muted-foreground">
                    {msg.name}
                  </span>
                )}

                <div
                  className={`
                    px-4 py-2 shadow-sm max-w-[80%] 
                    ${
                      isMe
                        ? "bg-[#0A84FF] text-white rounded-3xl rounded-br-md"
                        : "bg-[#E5E5EA] dark:bg-[#3A3A3C] text-black dark:text-white rounded-3xl rounded-bl-md"
                    }
                  `}
                >
                  {msg.message}
                </div>

                <span className="text-[10px] mt-1 text-muted-foreground">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            );
          })}
        </div>

        {/* Typing Indicator */}
        {typingUser && <TypingIndicator />}

        {/* Input */}
        <div className="flex gap-2 mt-4">
          <Input
            placeholder="Type a message…"
            value={text}
            className="rounded-full px-4 bg-neutral-50"
            onChange={(e) => {
              setText(e.target.value);
              if (e.target.value.trim().length > 0) sendTyping();
              else stopTyping();
            }}
          />
          <Button onClick={handleSend} className="rounded-full px-6 bg-neutral-50 border-neutral-500 border">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
