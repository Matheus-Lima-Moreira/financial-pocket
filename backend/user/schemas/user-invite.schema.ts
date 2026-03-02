import { MESSAGE } from "@/backend/shared/enum/messages";
import { z } from "zod";

export const userInviteSchema = z.object({
  email: z
    .string()
    .email(MESSAGE.user.EMAIL_INVALID),
  
  name: z
    .string()
    .min(2, MESSAGE.user.NAME_MIN)
    .max(100, MESSAGE.user.NAME_MAX),
  
  position: z
    .string()
    .min(2, MESSAGE.user.POSITION_MIN)
    .max(100, MESSAGE.user.POSITION_MAX),
  
  groupPermissionId: z
    .string()
    .uuid(MESSAGE.user.GROUP_PERMISSION_ID_UUID),
});

export type UserInviteSchema = z.infer<typeof userInviteSchema>;

