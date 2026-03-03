"use client";

import { setSession } from "@/backend/session/helpers/set-session.helper";
import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { ERROR_MESSAGE } from "@/backend/shared/enum/messages/error.message";
import { StatusCode } from "@/backend/shared/enum/status-code";
import { request } from "@/backend/shared/helpers/request";
import { AuthenticationDto } from "../dtos/authentication-reply.dto";
import { LoginSchema } from "../schemas/login.schema";

export async function loginAction(input: LoginSchema): Promise<ReplyDto<AuthenticationDto>> {
  try {
    const response = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
      useAuth: false,
    });
  
    const result: ReplyDto<AuthenticationDto> = await response.json() as ReplyDto<AuthenticationDto>;
  
    if(result.code === StatusCode.SUCCESS){
      await setSession({
        access_token: result.data.access_token,
        refresh_token: result.data.refresh_token,
      });
    }
  
    return result;
  } catch {
    return {
      code: StatusCode.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    } as ReplyDto<AuthenticationDto>;
  }
}
