"use server";

import { FlashMessageType } from "@/backend/flash-message/enum/flash-message-type.enum";
import { setFlashMessage } from "@/backend/flash-message/set-flash-message";
import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";
import { UserReplyDto } from "../dtos/user-reply.dto";

export async function userAvatarRemoveAction(id: string): Promise<ReplyDto<UserReplyDto>> {
  const response = await request(`/users/${id}/avatar`, {
    method: "DELETE",
  });

  const data = await response.json() as ReplyDto<UserReplyDto>;

  if (data.code === 200) {
    setFlashMessage({
      title: "Foto de perfil removida com sucesso",
      description: "A foto de perfil foi removida com sucesso.",
      type: FlashMessageType.SUCCESS,
    });
  }

  return data;
}

