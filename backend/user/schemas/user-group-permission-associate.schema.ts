import { MESSAGE } from "@/backend/shared/enum/messages";
import { z } from "zod";

export const userGroupPermissionAssociateSchema = z.object({
  groupPermissionId: z
    .string()
    .uuid(MESSAGE.user.GROUP_PERMISSION_ID_UUID),
});

export type UserGroupPermissionAssociateSchema = z.infer<typeof userGroupPermissionAssociateSchema>;

