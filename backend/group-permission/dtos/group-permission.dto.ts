import { GROUP_PERMISSION_TYPE } from "../enum/group-permission-type.enum";

export type GroupPermissionDto = {
  id: string;
  name: string;
  type: GROUP_PERMISSION_TYPE;
  organizationId?: string;
  createdAt: Date;
  updatedAt: Date;
};
