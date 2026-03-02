"use server";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";
import { SessionProfileDTO } from "../dtos/session-profile.dto";

export async function sessionValidateAction(): Promise<ReplyDto<SessionProfileDTO>> {
  const response = await request("/sessions/profile");
  const result: ReplyDto<SessionProfileDTO> = await response.json() as ReplyDto<SessionProfileDTO>;
  return result;
}