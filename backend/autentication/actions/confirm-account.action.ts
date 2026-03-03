"use server";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";

export async function confirmAccountAction(token: string): Promise<ReplyDto<void>> {
  const response = await request("/auth/verify-email", {
    method: "POST",
    body: JSON.stringify({ token }),
    useAuth: false,
  });

  const result: ReplyDto<void> = await response.json() as ReplyDto<void>;
  return result;
}