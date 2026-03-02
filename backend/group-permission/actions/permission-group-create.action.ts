"use server";

import { FlashMessageType } from "@/backend/flash-message/enum/flash-message-type.enum";
import { setFlashMessage } from "@/backend/flash-message/set-flash-message";
import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";
import { GroupPermissionDto } from "../dtos/group-permission.dto";
import { GroupPermissionSchema } from "../schemas/group-permission.schema";

export async function permissionGroupCreateAction(input: GroupPermissionSchema): Promise<ReplyDto<GroupPermissionDto>> {
  const response = await request("/group-permissions", {
    method: "POST",
    body: JSON.stringify(input),
  });

  const data = await response.json() as ReplyDto<GroupPermissionDto>;

  setFlashMessage({
    title: "Grupo de permissões criado com sucesso",
    description: "O grupo de permissões foi criado com sucesso, agora você pode adicionar ações a ele.",
    type: FlashMessageType.SUCCESS,
  });

  return data;
}