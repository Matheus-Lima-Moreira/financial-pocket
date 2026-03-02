"use server";

import { FlashMessageType } from "@/backend/flash-message/enum/flash-message-type.enum";
import { setFlashMessage } from "@/backend/flash-message/set-flash-message";
import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";
import { UserReplyDto } from "../dtos/user-reply.dto";

export async function userGroupPermissionUpdateAction(
  userId: string,
  groupPermissionId: string
): Promise<ReplyDto<UserReplyDto>> {
  const response = await request(`/users/${userId}/group-permission`, {
    method: "PUT",
    body: JSON.stringify({ groupPermissionId }),
  });

  const data = await response.json() as ReplyDto<UserReplyDto>;

  if (data.code === 200) {
    setFlashMessage({
      title: "Grupo de permissões atualizado com sucesso",
      description: "O grupo de permissões do usuário foi atualizado com sucesso.",
      type: FlashMessageType.SUCCESS,
    });
  }

  return data;
}

