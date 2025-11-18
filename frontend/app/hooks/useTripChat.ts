import { useEffect, useState } from "react";
import { useSocket } from "../providers/SocketProvider";

export interface ChatMessage {
  userId: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
}

export function useTripChat(tripId?: string) {
  const socket = useSocket();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingUser, setTypingUser] = useState<string | null>(null);

  useEffect(() => {
    if (!socket || !tripId) return;
    const handleNewMessage = (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    };
    const handleTyping = ({ name }: { name: string }) => {
      setTypingUser(name);
    };

    const handleStopTyping = () => {
      setTypingUser(null);
    };

    socket.on("trip:newMessage", handleNewMessage);
    socket.on("trip:userTyping", handleTyping);
    socket.on("trip:userStopTyping", handleStopTyping);
    return () => {
      socket?.off("trip:newMessage", handleNewMessage);
      socket.off("trip:userTyping", handleTyping);
      socket.off("trip:userStopTyping", handleStopTyping);
    };
  }, [socket, tripId]);

  const sendMessage = (message: string) => {
    socket!.emit("trip:sendMessage", { tripId, message });
  };
  const sendTyping = () => {
    socket!.emit("trip:typing", { tripId });
  };

  const stopTyping = () => {
    socket!.emit("trip:stopTyping", { tripId });
  };

  return { messages, sendMessage,typingUser,sendTyping,stopTyping};
}
