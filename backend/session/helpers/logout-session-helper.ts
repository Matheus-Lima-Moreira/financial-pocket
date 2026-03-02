"use server";

import { SESSION_NAME } from "@/backend/shared/enum/session-name";
import { cookies } from "next/headers";

export async function logoutSessionHelper() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_NAME);
  return true;
}