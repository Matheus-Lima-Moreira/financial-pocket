"use server";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";
import { GroupPermissionDetailDto } from "../dtos/group-permission-detail.dto";

export async function groupPermissionDetailsAction(id: string): Promise<ReplyDto<GroupPermissionDetailDto>> {
  const response = await request("/group-permissions/" + id, {
    method: "GET",
  });

  const result = await response.json() as ReplyDto<GroupPermissionDetailDto>;

  return result;
}