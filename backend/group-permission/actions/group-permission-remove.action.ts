"use server";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";

export async function groupPermissionRemoveAction(id: string): Promise<ReplyDto<void>> {
  const response = await request(`/group-permissions/${id}`, {
    method: "DELETE",
  });

  const data = await response.json() as ReplyDto<void>;

  return data;
}

