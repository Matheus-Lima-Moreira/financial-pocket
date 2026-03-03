"use server";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";

export async function tokenValidateAction(token: string): Promise<ReplyDto<boolean>> {
  const searchParams = new URLSearchParams({ token });
  const response = await request(`/tokens/validate?${searchParams.toString()}`);
  const result: ReplyDto<boolean> = await response.json() as ReplyDto<boolean>;
  return result;
}