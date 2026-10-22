// The same two rules the backend enforces on POST /api/ai, said here too so
// the customer hears about them before a request is sent, not after one
// comes back 400.
import { z } from "zod";

export const assistantFormSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(20, "Describe what you feel like ordering in at least 20 characters.")
    .max(2000, "Keep your message under 2000 characters."),
});
export type AssistantFormValues = z.infer<typeof assistantFormSchema>;