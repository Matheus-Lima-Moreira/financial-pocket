import { MESSAGE } from "@/backend/shared/enum/messages";
import { z } from "zod";

export const userEditSchema = z.object({
  name: z
    .string()
    .min(2, MESSAGE.user.NAME_MIN)
    .max(100, MESSAGE.user.NAME_MAX),
  
  email: z
    .string()
    .email(MESSAGE.user.EMAIL_INVALID),
  
  position: z
    .string()
    .min(2, MESSAGE.user.POSITION_MIN)
    .max(100, MESSAGE.user.POSITION_MAX),
});

export type UserEditSchema = z.infer<typeof userEditSchema>;

