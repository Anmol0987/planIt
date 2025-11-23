import { Server, Socket } from "socket.io";

/**
 * Registers trip-related socket event handlers.
 * @param io - The Socket.IO server instance.
 * @param socket - The connected client socket.
 */
const activeMembers = new Map<
  string,
  Set<{ userId: string; name: string; email: string }>
>();

interface Message {
  userId: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
}

export function setupTripSocket(io: Server, socket: Socket): void {
  const user = socket.data.user as {
    userId: string;
    email: string;
    name: string;
  };

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
    if (!socket.data.trips) socket.data.trips = new Set();
    socket.data.trips.add(tripId);
    socket.join(tripId);

    //if new trip id create a new empty set
    if (!activeMembers.has(tripId)) {
      activeMembers.set(tripId, new Set());
    }

    //add current user to actrive members
    activeMembers.get(tripId)!.add({
      userId: user.userId,
      email: user.email,
      name: user.name,
    });

    // Adds the socket to the specified trip room, enabling it to receive events broadcast to that room.
    // socket.join(tripId);

    // Notify other members in the trip
    socket.to(tripId).emit("trip:memberJoined", {
      tripId,
      userId: user.userId,
      email: user.email,
      name: user.name,
      message: `${user.name} joined the trip`,
    });

    // This emits an updated list of all active members in the trip to everyone in the trip room.
    io.to(tripId).emit("trip:membersUpdate", {
      tripId,
      members: Array.from(activeMembers.get(tripId)!),
    });
  });

  socket.on("leaveTrip", (tripId: string) => {
    if (!tripId) return;

    // Removes the socket from the specified trip room.
    socket.leave(tripId);
    socket.data.trips?.delete(tripId);

    // console.log(`👋 ${user.name} left trip ${tripId}`);

    // remove the user from active members list
    const members = activeMembers.get(tripId);
    if (members) {
      const newSet = new Set(
        [...members].filter((m) => m.userId !== user.userId)
      );
      activeMembers.set(tripId, newSet);
    }

    // This emits an updated list of all active members in the trip to everyone in the trip room.
    io.to(tripId).emit("trip:membersUpdate", {
      tripId,
      members: Array.from(activeMembers.get(tripId) || []),
    });

    //notify other user that the user has left
    socket.to(tripId).emit("trip:memberLeft", {
      tripId,
      userId: user.userId,
      email: user.email,
      name: user.name,
      message: `${user.name} left the trip`,
    });
  });
  socket.on("disconnect", () => {
    if (!socket.data.trips) return;

    socket.data.trips.forEach((tripId: string) => {
      const members = activeMembers.get(tripId);
      if (!members) return;

      const newSet = new Set(
        [...members].filter((m) => m.userId !== user.userId)
      );
      activeMembers.set(tripId, newSet);
      io.to(tripId).emit("trip:membersUpdate", {
        tripId,
        members: Array.from(newSet),
      });
      socket.to(tripId).emit("trip:memberLeft", {
        tripId,
        userId: user.userId,
        email: user.email,
        name: user.name,
      });
    });
    // console.log(`❌ ${user.email} disconnected`);
  });

  socket.on("trip:createInvite", async ({ tripId, email }) => {
    if (!email || !tripId) return;

    // notify everyone in the trip room
    io.to(tripId).emit("trip:inviteCreated", {
      tripId,
      email,
      invitedBy: user.email,
      invitedByName: user.name,
    });
  });

  socket.on("trip:sendMessage", async ({ tripId, message }) => {
    if (!tripId || !message) return;
    const chatMessage: Message = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      message,
      timestamp: Date.now(),
    };
    // Broadcast to all in room INCLUDING sender
    io.to(tripId).emit("trip:newMessage", { tripId, ...chatMessage });
  });

  socket.on("trip:typing", ({ tripId }) => {
    socket.to(tripId).emit("trip:userTyping", {
      tripId,
      userId: user.userId,
      name: user.name,
    });
  });

  socket.on("trip:stopTyping", ({ tripId }) => {
    socket.to(tripId).emit("trip:userStopTyping", {
      tripId,
      userId: user.userId,
    });
  });
}
