import { z } from "zod";

export const VoteSchema = z.object({
  optionIds: z
    .array(z.string().uuid())
    .min(1, { message: "At least one option must be selected." }),
});

export const ClosePollSchema = z.object({
  isClosed: z.boolean().default(true),
});
