"use server";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";
import { UserReplyDto } from "../dtos/user-reply.dto";

export async function userAvatarUploadAction(id: string, formData: FormData): Promise<ReplyDto<UserReplyDto>> {
  const response = await request(`/users/${id}/avatar`, {
    method: "POST",
    body: formData,
    isFile: true,
  });

  const data = await response.json() as ReplyDto<UserReplyDto>;

  return data;
}

