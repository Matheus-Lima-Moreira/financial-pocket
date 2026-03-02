import { MESSAGE } from "@/backend/shared/enum/messages";
import { z } from "zod";

export const userChangePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, MESSAGE.authentication.PASSWORD_REQUIRED),
  
  newPassword: z
    .string()
    .min(6, MESSAGE.authentication.PASSWORD_MIN)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      MESSAGE.authentication.PASSWORD_PATTERN
    ),
});

export type UserChangePasswordSchema = z.infer<typeof userChangePasswordSchema>;

