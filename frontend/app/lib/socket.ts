import { io, Socket } from "socket.io-client";
import { useAuthStore } from "./store";

let socket: Socket | null = null;

export const initSocket = (): Socket | null => {
  if (socket) return socket;

  const backend = "http://localhost:3000";

  socket = io(backend, {
    withCredentials: true,  
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("connected to socket");
  });
  socket.on("connect_error", (error) => {
    console.log("connect_error", error.message);
  });
  socket.on("disconnect", (reason) => {
    console.log("disconnected to socket", reason);
  });
  return socket;
};

export const getSocket = () => socket;
export const closeSocket = () => {
  socket?.disconnect();
  socket = null;
};
