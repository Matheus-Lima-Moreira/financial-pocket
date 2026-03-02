"use server";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";

export async function confirmAccountAction(token: string): Promise<ReplyDto<void>> {
  const response = await request("/authentication/confirm-account", {
    method: "POST",
    body: JSON.stringify({ token }),
    useAuth: false,
  });

  console.log(response)

  const result: ReplyDto<void> = await response.json() as ReplyDto<void>;
  return result;
}