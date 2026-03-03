"use client";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";
import { ResetPasswordSchema } from "../schemas/reset-password.schema";

export async function resetPasswordAction(input: ResetPasswordSchema): Promise<ReplyDto<void>> {
  const response = await request("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(input),
    useAuth: false,
  });

  const result: ReplyDto<void> = await response.json() as ReplyDto<void>;
  return result;
}

