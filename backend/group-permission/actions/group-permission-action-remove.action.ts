"use server";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";

export async function permissionGroupActionRemoveAction(permissionGroupId: string, actionId: string): Promise<ReplyDto<void>> {
  const response = await request(`/group-permissions/${permissionGroupId}/actions/${actionId}`, {
    method: "DELETE"
  });

  const data = await response.json() as ReplyDto<void>;

  return data;
}