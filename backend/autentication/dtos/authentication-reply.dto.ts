import { SessionDto } from "@/backend/session/dtos/session.dto";

export type AuthenticationDto = SessionDto & {
  userRegisterFrom: string;
  userEmailVerified: boolean;
  hasPassword: boolean;
}