"use server";

import { SESSION_NAME } from "@/backend/shared/enum/session-name";
import { cookies } from "next/headers";
import { SessionDto } from "../dtos/session.dto";

export async function getSession<T = SessionDto>(): Promise<T | undefined> {
  const cks = await cookies();
  const data = cks.get(SESSION_NAME);

  if (!data) {
    return;
  }

  return JSON.parse(data.value) as T;
}