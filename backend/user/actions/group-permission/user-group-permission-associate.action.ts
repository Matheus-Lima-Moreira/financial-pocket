"use server";

import { FlashMessageType } from "@/backend/flash-message/enum/flash-message-type.enum";
import { setFlashMessage } from "@/backend/flash-message/set-flash-message";
import { GroupPermissionDto } from "@/backend/group-permission/dtos/group-permission.dto";
import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { StatusCode } from "@/backend/shared/enum/status-code";
import { request } from "@/backend/shared/helpers/request";
import { UserGroupPermissionAssociateSchema } from "../../schemas/user-group-permission-associate.schema";

export async function userGroupPermissionAssociateAction(
  userId: string,
  input: UserGroupPermissionAssociateSchema
): Promise<ReplyDto<GroupPermissionDto>> {
  const response = await request(`/users/${userId}/group-permissions`, {
    method: "POST",
    body: JSON.stringify(input),
  });

  const data = await response.json() as ReplyDto<GroupPermissionDto>;

  if (data.code === StatusCode.SUCCESS) {
    setFlashMessage({
      title: "Grupo de permissões associado com sucesso",
      description: "O grupo de permissões foi associado ao usuário com sucesso.",
      type: FlashMessageType.SUCCESS,
    });
  }

  return data;
}
