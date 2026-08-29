// src/schemas/preOrderSchema.ts
// One schema. The rules live here, and the TypeScript type is DERIVED
// from it -- so a rule and its type can never drift apart.
import { z } from "zod";

export const preOrderSchema = z.object({
  // .min(1) is what "required" means for a string: not empty.
  productName: z.string().min(1, "Choose a product."),

  // .min(1) + .max() bound the quantity to a sane range.
  // register() below uses { valueAsNumber: true } so the value reaching
  // this schema is already a number, not a string from the input box.
  quantity: z
    .number()
    .min(1, "Order at least 1 item.")
    .max(10, "Max 10 per pre-order -- contact staff for bulk orders."),

  // .refine() adds any rule Zod does not ship: yours, as a function.
  // A pre-order for later today needs a pickup time in the future.
  pickupTime: z
    .string()
    .min(1, "Choose a pickup time.")
    .refine((value) => new Date(value).getTime() > Date.now(), {
      message: "Pickup time has to be in the future.",
    }),
});

// z.infer reads the schema and hands back the TypeScript type:
//   { productName: string; quantity: number; pickupTime: string }
// Written by hand, that type would be a second thing to keep in sync.
export type PreOrderFormValues = z.infer<typeof preOrderSchema>;