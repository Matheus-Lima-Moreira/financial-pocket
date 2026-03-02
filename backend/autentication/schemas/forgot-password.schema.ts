import { MESSAGE } from "@/backend/shared/enum/messages";
import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email(MESSAGE.authentication.EMAIL_INVALID),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;











