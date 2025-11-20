import prisma from "../../prisma";
interface VoteInput {
  pollId: string;
  userId: string;
  optionIds: string[];
}
export const getPollDetailsByIdService = async (pollId: string) => {
  try {
    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: { options: true, votes: true },
    });
    return poll;
  } catch (err) {
    console.error("getPollDetailsByIdService error:", err);
    throw err;
  }
};
export const voteOnPollService = async ({
  pollId,
  userId,
  optionIds,
}: VoteInput) => {
  try {
    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: { options: true },
    });
    if (!poll) throw new Error("Poll not found");
    if (poll.isClosed) throw new Error("Poll is closed");

    const validOptionIds = poll.options.map((o) => o.id);
    const invalid = optionIds.some((id) => !validOptionIds.includes(id));
    if (invalid) throw new Error("One or more selected options are invalid.");

    if (poll.type === "SINGLE") {
      await prisma.pollVote.deleteMany({
        where: { pollId, userId },
      });
    }
    await prisma.pollVote.createMany({
      data: optionIds.map((optionId) => ({
        pollId,
        optionId,
        userId,
      })),
    });
    const updated = await prisma.poll.findUnique({
      where: { id: pollId },
      include: {
        options: {
          include: {
            votes: true,
          },
        },
        votes: true,
      },
    });
    return updated;
  } catch (err: any) {
    console.error("voteOnPollService error:", err);
    throw err;
  }
};

export const deletePollByIdService = async (pollId: string) => {
  try {
    const poll = await prisma.poll.delete({where:{
        id:pollId
    }})
    return poll
  } catch (err: any) {
    console.error("deletePollService error:", err);
    throw err;
  }
};

export const closePollByIdService = async (pollId: string) => {
    try {
      const poll = await prisma.poll.update({
        where: { id: pollId },
        data: { isClosed: true },
        include: {
          options: true,
          votes: true,
        },
      });
  
      return poll;
    } catch (err: any) {
      console.error("closePollService error:", err);
      throw err;
    }
  };