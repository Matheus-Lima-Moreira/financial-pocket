"use server";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";
import { UserChangePasswordSchema } from "../schemas/user-change-password.schema";

export async function userChangePasswordAction(
  input: UserChangePasswordSchema
): Promise<ReplyDto<void>> {
  const response = await request("/users/change-password", {
    method: "PUT",
    body: JSON.stringify(input),
  });

  const result = await response.json() as ReplyDto<void>;

  return result;
}

