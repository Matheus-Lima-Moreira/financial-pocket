import { GROUP_PERMISSION_TYPE } from "../enum/group-permission-type.enum";

export function groupPermissionLabel(type: GROUP_PERMISSION_TYPE): string {
  switch (type) {
    case GROUP_PERMISSION_TYPE.BASE_SYSTEM:
      return "Sistema";
    case GROUP_PERMISSION_TYPE.CUSTOM:
      return "Personalizado";
  }
}