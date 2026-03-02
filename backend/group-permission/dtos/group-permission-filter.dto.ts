import { GROUP_PERMISSION_TYPE } from "../enum/group-permission-type.enum";

export type GroupPermissionFilterDto = {
  name?: string;
  type?: GROUP_PERMISSION_TYPE;
  page?: number;
}