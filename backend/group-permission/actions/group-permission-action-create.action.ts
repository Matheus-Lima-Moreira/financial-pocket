"use server";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";

export async function permissionGroupActionCreateAction(permissionGroupId: string, actionId: string): Promise<ReplyDto<void>> {
  const response = await request(`/group-permissions/${permissionGroupId}/actions`, {
    method: "POST",
    body: JSON.stringify({
      actionId: actionId,
    }),
  });

  const data = await response.json() as ReplyDto<void>;

  return data;
}