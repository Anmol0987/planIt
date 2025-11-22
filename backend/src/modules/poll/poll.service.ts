import prisma from "../../prisma";

export interface VoteInput {
  pollId: string;
  userId: string;
  optionIds: string[];
}

export interface PollResponse {
  id: string;
  question: string;
  type: string;
  isClosed: boolean;
  createdAt: Date;
  options: any[];
  votes: any[];
}
export const getPollDetailsByIdService = async (
  pollId: string
): Promise<PollResponse | null> => {
  return await prisma.poll.findUnique({
    where: { id: pollId },
    include: { options: true, votes: true },
  });
};
export const voteOnPollService = async (
  input: VoteInput
): Promise<PollResponse> => {
  const { pollId, userId, optionIds } = input;
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
  return updated as PollResponse;
};

export const deletePollByIdService = async (pollId: string)=> {
    const poll = await prisma.poll.delete({
      where: {
        id: pollId,
      },
    });
    return poll;
 
};

export const closePollByIdService = async (pollId: string):Promise<PollResponse> => {
  return await prisma.poll.update({
      where: { id: pollId },
      data: { isClosed: true },
      include: {
        options: true,
        votes: true,
      },
    }); 
};
