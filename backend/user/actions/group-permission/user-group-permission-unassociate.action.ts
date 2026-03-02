"use client";

import { GroupPermissionDto } from "@/backend/group-permission/dtos/group-permission.dto";
import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";

export async function userGroupPermissionUnassociateAction(
  userId: string,
  groupPermissionId: string
): Promise<ReplyDto<GroupPermissionDto>> {
  const response = await request(`/users/${userId}/group-permissions/${groupPermissionId}`, {
    method: "DELETE",
  });

  const result = await response.json() as ReplyDto<GroupPermissionDto>;

  return result;
}

