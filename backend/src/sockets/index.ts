import { Server, Socket } from "socket.io";
import http from "http";
import { env } from "../config/env";
import jwt from "jsonwebtoken";
import { setupTripSocket } from "./trip.socket";

let io: Server | undefined;

/**
 * Initializes the Socket.IO server and configures authentication and event handlers.
 * @param server - The HTTP server instance.
 * @returns The initialized Socket.IO server instance.
 */
export const setupSocketServer = (server: http.Server): Server => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:3001"],
      credentials: true,
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization"],
    },
  });

  io.use((socket: Socket, next) => {
    try {
      const token: string | undefined =
        (socket.handshake.auth?.token as string | undefined) ||
        (socket.handshake.query?.token as string | undefined);

      if (!token) {
        return next(new Error("No token provided"));
      }

      const decoded = jwt.verify(
        token,
        env.JWT_ACCESS_SECRET
      ) as jwt.JwtPayload;
      socket.data.user = decoded;
      (socket as any).user = decoded;
      next();
    } catch {
      return next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", (socket: Socket) => {
    const user = (socket as any).user;
    console.log("🧠 Full user object on connect:", user);
    if (user && user.email) {
      console.log(`User connected: ${user.email}`);
    }

    setupTripSocket(io as Server, socket);

    socket.on("disconnect", () => {
      if (user && user.email) {
        console.log(`User disconnected: ${user.email}`);
      }
    });
  });
  return io;
};

/**
 * Returns the initialized Socket.IO server instance.
 * Throws an error if the server has not been initialized.
 */
export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.IO not initialized! Call setupSocketServer first.");
  }
  return io;
};
