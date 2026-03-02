"use client";

import { setSession } from "@/backend/session/helpers/set-session.helper";
import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { ERROR_MESSAGE } from "@/backend/shared/enum/messages/error.message";
import { StatusCode } from "@/backend/shared/enum/status-code";
import { request } from "@/backend/shared/helpers/request";
import { AuthenticationDto } from "../dtos/authentication-reply.dto";
import { RegisterSchema } from "../schemas/register.schema";

export async function registerAction(input: RegisterSchema): Promise<ReplyDto<AuthenticationDto>> {
  try {
    const response = await request("/authentication/register", {
      method: "POST",
      body: JSON.stringify(input),
      useAuth: false,
    });
  
    const result: ReplyDto<AuthenticationDto> = await response.json() as ReplyDto<AuthenticationDto>;
  
    if(result.code === StatusCode.SUCCESS){
      await setSession({
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
      });
    }
  
    return result;
  } catch  {
    return {
      code: StatusCode.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    } as ReplyDto<AuthenticationDto>;
  }
}