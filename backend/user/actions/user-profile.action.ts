"use server";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";
import { UserProfileDto } from "../dtos/user-profile-reply.dto";

export async function userProfileAction(): Promise<ReplyDto<UserProfileDto>> {
  const response = await request("/users/profile");
  const result: ReplyDto<UserProfileDto> = await response.json() as ReplyDto<UserProfileDto>;
  return result;
}

