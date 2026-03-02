import { MESSAGE } from "@/backend/shared/enum/messages";
import { z } from "zod";

export const firstAccessSchema = z.object({
  token: z.string(),
  password: z
    .string()
    .min(6, MESSAGE.authentication.PASSWORD_MIN)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      MESSAGE.authentication.PASSWORD_PATTERN
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: MESSAGE.authentication.CONFIRM_PASSWORD_MISMATCH,
  path: ["confirmPassword"],
});

export type FirstAccessSchema = z.infer<typeof firstAccessSchema>;










