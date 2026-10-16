// src/schemas/authSchema.ts
// Two forms, two schemas. Each form's TypeScript type is DERIVED from its
// schema with z.infer, exactly as preOrderSchema.ts does for the pre-order form.
import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  // Only "not empty" on login. The 8-character rule belongs to register:
  // a login form that enforced it would turn a wrong password into a
  // message about password policy.
  password: z.string().min(1, "Enter your password."),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Enter your name."),
  email: z.email("Enter a valid email address."),
  // The backend's Customer schema says minlength 8. Say it here too, so the
  // person finds out before the request is sent, not after it comes back 400.
  password: z.string().min(8, "Password needs at least 8 characters."),
});
export type RegisterFormValues = z.infer<typeof registerSchema>;