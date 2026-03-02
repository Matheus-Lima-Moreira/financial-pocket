"use client";

import { GroupPermissionDto } from "../dtos/group-permission.dto";
import { GroupPermissionFilterDto } from "../dtos/group-permission-filter.dto";
import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";

export async function groupPermissionReadAllAction(filter?: GroupPermissionFilterDto): Promise<ReplyDto<GroupPermissionDto[]>> {
  const filters = filter ?? {};

  const queryParams = new URLSearchParams();
  
  if (filters.name) {
    queryParams.append("name", filters.name);
  }
  if (filters.type) {
    queryParams.append("type", filters.type);
  }
  if (filters.page) {
    queryParams.append("page", filters.page.toString());
  }

  const response = await request(`/group-permissions?${queryParams.toString()}`, {
    method: "GET",
  });

  const data = await response.json() as ReplyDto<GroupPermissionDto[]>;

  return data;
}