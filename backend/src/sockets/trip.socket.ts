import { Server, Socket } from "socket.io";
import prisma from "../prisma";

/**
 * Registers trip-related socket event handlers.
 * @param io - The Socket.IO server instance.
 * @param socket - The connected client socket.
 */
const activeMembers = new Map<string, Set<string>>();
export function setupTripSocket(io: Server, socket: Socket): void {
  const user = socket.data.user as { userId: string; email: string };

  if (!user || !user.userId || !user.email) {
    socket.disconnect(true);
    console.error("User object is invalid or missing. Disconnecting socket.");
    return;
  }

  /**
   * Handles a user joining a trip room by ID.
   * @param tripId - The ID of the trip/room to join.
   */
  socket.on("joinTrip", (tripId: string) => {
    //checks if tripId is there or not
    if (typeof tripId !== "string" || !tripId.trim()) {
      socket.emit("error", { message: "Invalid trip ID." });
      return;
    }

    //if new trip id create a new empty set
    if (!activeMembers.has(tripId)) {
      activeMembers.set(tripId, new Set());
    }

    //add current user to actrive members
    activeMembers.get(tripId)!.add(user.email);

    // Adds the socket to the specified trip room, enabling it to receive events broadcast to that room.
    socket.join(tripId);

    // Notify other members in the trip
    socket.to(tripId).emit("trip:memberJoined", {
      userId: user.userId,
      email: user.email,
      message: `${user.email} joined the trip`,
    });

    // This emits an updated list of all active members in the trip to everyone in the trip room.
    io.to(tripId).emit("trip:membersUpdate", {
      members: Array.from(activeMembers.get(tripId)!),
    });
  });

  socket.on("leaveTrip", (tripId: string) => {
    if (!tripId) return;

    // Removes the socket from the specified trip room.
    socket.leave(tripId);
    console.log(`👋 ${user.email} left trip ${tripId}`);

    // remove the user from active members list
    activeMembers.get(tripId)?.delete(user.email);

    // This emits an updated list of all active members in the trip to everyone in the trip room.
    io.to(tripId).emit("trip:membersUpdate", {
      members: Array.from(activeMembers.get(tripId) || []),
    });

    //notify other user that the user has left
    socket.to(tripId).emit("trip:memberLeft", {
      userId: user.userId,
      email: user.email,
      message: `${user.email} left the trip`,
    });
  });
  socket.on("disconnect", () => {
    const userId = user.userId;
    activeMembers.forEach((set, tripId) => {
      if (set.has(userId)) {
        set.delete(userId);
      }
      io.to(tripId).emit("trip:membersUpdate", {
        members: Array.from(set),
      });
      socket.to(tripId).emit("trip:memberLeft", {
        email: user.email,
        userId,
      });
    });
    console.log(`❌ ${user.email} disconnected`);
  });

  socket.on("trip:createInvite",async({tripId,email})=>{
    if (!email || !tripId) return;


  // notify everyone in the trip room
  io.to(tripId).emit("trip:inviteCreated", {
    email,
    invitedBy: user.email
  });

  })
}
