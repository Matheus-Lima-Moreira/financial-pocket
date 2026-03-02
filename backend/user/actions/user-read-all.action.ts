"use client";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";
import { UserReplyDto } from "../dtos/user-reply.dto";
import { UserState } from "../enum/user-state";

export type UserFilterDto = {
  page?: number;
  name?: string;
  email?: string;
  state?: UserState;
};

export async function userReadAllAction(filter?: UserFilterDto): Promise<ReplyDto<UserReplyDto[]>> {
  const filters = filter ?? {};

  const queryParams = new URLSearchParams();

  if (filters.state) {
    queryParams.append("state", filters.state);
  }
  
  if (filters.name) {
    queryParams.append("name", filters.name);
  }
  if (filters.email) {
    queryParams.append("email", filters.email);
  }
  if (filters.page) {
    queryParams.append("page", filters.page.toString());
  }

  const response = await request(`/users?${queryParams.toString()}`, {
    method: "GET",
  });

  const data = await response.json() as ReplyDto<UserReplyDto[]>;

  return data;
}
