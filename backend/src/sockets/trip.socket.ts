import { Server, Socket } from "socket.io";

/**
 * Registers trip-related socket event handlers.
 * @param io - The Socket.IO server instance.
 * @param socket - The connected client socket.
 */
export function setupTripSocket(io: Server, socket: Socket): void {
  const user = socket.data.user as { userId: string; email?: string };

  if (!user || !user.userId|| !user.email) {
    socket.disconnect(true);
    console.error("User object is invalid or missing. Disconnecting socket.");
    return;
  }

  /**
   * Handles a user joining a trip room by ID.
   * @param tripId - The ID of the trip/room to join.
   */
  socket.on("joinTrip", (tripId: string) => {
    if (typeof tripId !== "string" || !tripId.trim()) {
      socket.emit("error", { message: "Invalid trip ID." });
      return;
    }

    socket.join(tripId);
    // Notify other members in the trip
    socket.to(tripId).emit("trip:memberJoined", {
      userId: user.userId,
      email: user.email,
      message: `${user.email} joined the trip`,
    });
  });
}
