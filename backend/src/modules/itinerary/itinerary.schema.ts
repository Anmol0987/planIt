import z from "zod";

export const itinerarySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:mm)"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:mm)"),
  title: z.string().min(2, "title must be of atleast 2 character"),
  note: z.string().optional(),
});

export const updateItinerarySchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:mm)").optional(),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:mm)").optional(),
    title: z.string().min(2, "title must be of atleast 2 character").optional(),
    note: z.string().optional(),
  });
