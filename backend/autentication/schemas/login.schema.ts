import { MESSAGE } from "@/backend/shared/enum/messages";
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email(MESSAGE.authentication.EMAIL_INVALID),
  
  password: z
    .string()
    .min(1, MESSAGE.authentication.PASSWORD_REQUIRED),
});

export type LoginSchema = z.infer<typeof loginSchema>;

