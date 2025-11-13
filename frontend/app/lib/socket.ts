import { io, Socket } from "socket.io-client";
import { useAuthStore } from "./store";

let socket: Socket | null = null;

export const initSocket = (): Socket | null => {
  const { token } = useAuthStore.getState();

  if (!token) {
    console.log("no token found");
    return null;
  }
  if (socket && socket.connected) return socket;

  const backend = "http://localhost:3000";

  socket = io(backend, {
    auth: { token },
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("connected to socket", socket?.id);
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
