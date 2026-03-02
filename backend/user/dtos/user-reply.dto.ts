import { UserRegisterFrom } from "../enum/register-from";
import { UserState } from "../enum/user-state";

export type UserReplyDto = {
  id: string;
  name: string;
  email: string;
  position: string;
  active: boolean;
  isPrimary: boolean;
  organizationId: string;
  avatar: string;
  registerFrom: UserRegisterFrom;
  emailVerified: boolean;
  state: UserState;
  createdAt: Date;
  updatedAt: Date;
};