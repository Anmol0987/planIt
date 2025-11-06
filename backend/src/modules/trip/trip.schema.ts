import { z } from "zod";

export const createTripSchema = z.object({
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
  startDate: z
    .string()
    .refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      { message: "Start date must be a valid ISO date string." }
    ),
  endDate: z
    .string()
    .refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      { message: "End date must be a valid ISO date string." }
    ),
}).refine(
  (data) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    return end >= start;
  },
  { message: "End date must be on or after start date.", path: ["endDate"] }
);
