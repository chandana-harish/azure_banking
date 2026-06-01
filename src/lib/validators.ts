import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(7).optional().or(z.literal("")),
  password: z.string().min(8)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const transactionSchema = z.object({
  amount: z.coerce.number().positive(),
  description: z.string().max(160).optional()
});
