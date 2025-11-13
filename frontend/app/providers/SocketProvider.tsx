"use client";

import { useContext, useEffect, useState,createContext } from "react";
import {  useAuthStore } from "../lib/store";
import { closeSocket, initSocket } from "../lib/socket";
import { Socket } from "socket.io-client";

type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null!);

export const useSocket = () => useContext(SocketContext);
   

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, hydrated } = useAuthStore();
  const [socket, setSocket] = useState<SocketContextType>(null);

  useEffect(() => {
    if (!hydrated) return;
    if (!token) {
      closeSocket();
      setSocket(null);
      return;
    }
    const s = initSocket();
    setSocket(s);
    return () => {
      closeSocket();
      setSocket(null);
    };
  }, [token, hydrated]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
