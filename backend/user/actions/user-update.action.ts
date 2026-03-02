"use server";

import { FlashMessageType } from "@/backend/flash-message/enum/flash-message-type.enum";
import { setFlashMessage } from "@/backend/flash-message/set-flash-message";
import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";
import { UserReplyDto } from "../dtos/user-reply.dto";
import { UserEditSchema } from "../schemas/user-edit.schema";

export async function userUpdateAction(id: string, input: UserEditSchema): Promise<ReplyDto<UserReplyDto>> {
  const response = await request(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });

  const data = await response.json() as ReplyDto<UserReplyDto>;

  if (data.code === 200) {
    setFlashMessage({
      title: "Usuário atualizado com sucesso",
      description: "O usuário foi atualizado com sucesso.",
      type: FlashMessageType.SUCCESS,
    });
  }

  return data;
}

