"use server";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";
import { UserReplyDto } from "../dtos/user-reply.dto";

export async function userDetailsAction(id: string): Promise<ReplyDto<UserReplyDto>> {
  const response = await request("/users/" + id, {
    method: "GET",
  });

  const result = await response.json() as ReplyDto<UserReplyDto>;

  return result;
}

