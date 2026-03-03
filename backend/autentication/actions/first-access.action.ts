"use server";

import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { request } from "@/backend/shared/helpers/request";
import { FirstAccessSchema } from "../schemas/first-access.schema";

export async function firstAccessAction(input: FirstAccessSchema): Promise<ReplyDto<void>> {
  const response = await request("/auth/first-access", {
    method: "POST",
    body: JSON.stringify(input),
    useAuth: false,
  });

  const result: ReplyDto<void> = await response.json() as ReplyDto<void>;
  return result;
}










