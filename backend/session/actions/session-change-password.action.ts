"use client";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";
import { UserChangePasswordSchema } from "@/backend/user/schemas/user-change-password.schema";

export async function sessionChangePasswordAction(
  input: UserChangePasswordSchema
): Promise<ReplyDto<void>> {
  const response = await request("/sessions/change-password", {
    method: "POST",
    body: JSON.stringify(input),
  });

  const result = await response.json() as ReplyDto<void>;

  return result;
}