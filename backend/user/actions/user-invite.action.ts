"use client";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";
import { UserInviteSchema } from "../schemas/user-invite.schema";

export async function userInviteAction(input: UserInviteSchema): Promise<ReplyDto<void>> {
  const response = await request("/users/invite", {
    method: "POST",
    body: JSON.stringify(input),
  });

  const result: ReplyDto<void> = await response.json() as ReplyDto<void>;

  return result;
}

