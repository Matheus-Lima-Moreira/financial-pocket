"use client";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { StatusCode } from "@/backend/shared/enum/status-code";
import { request } from "@/backend/shared/helpers/request";
import { ForgotPasswordSchema } from "../schemas/forgot-password.schema";

export async function forgotPasswordAction(input: ForgotPasswordSchema): Promise<ReplyDto<void>> {
  try {
    const response = await request("/tokens/reset-password", {
      method: "POST",
      body: JSON.stringify(input),
      useAuth: false,
    });
  
    const result: ReplyDto<void> = await response.json() as ReplyDto<void>;
    return result;
  } catch {
    return {
      code: StatusCode.INTERNAL_SERVER_ERROR,
    } as ReplyDto<void>;
  }
}

