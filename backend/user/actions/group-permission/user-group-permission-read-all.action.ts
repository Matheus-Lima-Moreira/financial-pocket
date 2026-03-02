"use client";

import { GroupPermissionDto } from "@/backend/group-permission/dtos/group-permission.dto";
import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";

export async function userGroupPermissionReadAllAction(userId: string): Promise<ReplyDto<GroupPermissionDto[]>> {
  const response = await request(`/users/${userId}/group-permissions`);
  const result: ReplyDto<GroupPermissionDto[]> = await response.json() as ReplyDto<GroupPermissionDto[]>;
  return result;
}