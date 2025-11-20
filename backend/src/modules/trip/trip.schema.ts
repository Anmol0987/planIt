import { PollType } from "@prisma/client";
import { z } from "zod";

export const createTripSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Trip name must be at least 2 characters long." })
      .max(100, { message: "Trip name must be at most 100 characters long." })
      .trim(),
    destination: z
      .string()
      .min(2, { message: "Destination must be at least 2 characters long." })
      .max(100, { message: "Destination must be at most 100 characters long." })
      .trim(),
    startDate: z.string().refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      { message: "Start date must be a valid ISO date string." }
    ),
    endDate: z.string().refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      { message: "End date must be a valid ISO date string." }
    ),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end >= start;
    },
    { message: "End date must be on or after start date.", path: ["endDate"] }
  );

export const CreatePollSchema = z.object({
  question: z
    .string()
    .min(5, { message: "question must have min 5 letter" })
    .max(100, { message: "question  must be at most 100 characters long." })
    .trim(),
  type: z.enum(["SINGLE", "MULTIPLE"], {
    message: "type is required",
  }),
  options: z
    .array(
      z
        .string()
        .min(1, { message: "Option cannot be empty." })
        .max(60, { message: "Option must be at most 60 characters." })
    )
    .min(2, { message: "At least two options are required." }), 
});
