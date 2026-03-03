"use client";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { ERROR_MESSAGE } from "@/backend/shared/enum/messages/error.message";
import { StatusCode } from "@/backend/shared/enum/status-code";
import { request } from "@/backend/shared/helpers/request";

export async function tokenResentAccountConfirmationAction(): Promise<ReplyDto<void>> {
  try {
    await request("/tokens/resend-account-confirmation", {
      method: "POST",
    });
  
    return {
      code: StatusCode.SUCCESS,
    } as ReplyDto<void>;
  } catch  {
    return {
      code: StatusCode.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    } as ReplyDto<void>;
  }
}
