import { UserRegisterFrom } from "../enum/register-from";
import { UserState } from "../enum/user-state";

export type UserReplyDto = {
  id: string;
  name: string;
  email: string;
  active: boolean;
  isPrimary: boolean;
  organizationId: string;
  avatarUrl: string;
  registerFrom: UserRegisterFrom;
  emailVerified: boolean;
  state: UserState;
  createdAt: Date;
  updatedAt: Date;
};