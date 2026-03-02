import { ActionGroupDto } from "@/backend/actions/dtos/action-group-reply.dto";
import { GroupPermissionDto } from "./group-permission.dto";

export type GroupPermissionDetailDto = GroupPermissionDto & {
  actions: ActionGroupDto[];
};
