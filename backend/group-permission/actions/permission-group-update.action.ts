"use server";

import { FlashMessageType } from "@/backend/flash-message/enum/flash-message-type.enum";
import { setFlashMessage } from "@/backend/flash-message/set-flash-message";
import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { StatusCode } from "@/backend/shared/enum/status-code";
import { request } from "@/backend/shared/helpers/request";
import { GroupPermissionDto } from "../dtos/group-permission.dto";
import { GroupPermissionSchema } from "../schemas/group-permission.schema";

export async function permissionGroupUpdateAction(id: string, input: GroupPermissionSchema): Promise<ReplyDto<GroupPermissionDto>> {
  const response = await request(`/group-permissions/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });

  const data = await response.json() as ReplyDto<GroupPermissionDto>;

  if (data.code === StatusCode.SUCCESS) {
    setFlashMessage({
      title: "Grupo de permissões atualizado com sucesso",
      description: "O grupo de permissões foi atualizado com sucesso.",
      type: FlashMessageType.SUCCESS,
    });
  }

  return data;
}