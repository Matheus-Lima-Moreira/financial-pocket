import { MESSAGE } from "@/backend/shared/enum/messages";
import { z } from "zod";

export const groupPermissionSchema = z.object({
  name: z
    .string()
    .min(2, MESSAGE.groupPermission.NAME_MIN)
    .max(100, MESSAGE.groupPermission.NAME_MAX)
});

export type GroupPermissionSchema = z.infer<typeof groupPermissionSchema>;

