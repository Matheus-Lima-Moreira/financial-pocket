"use server";

import { SESSION_NAME } from "@/backend/shared/enum/session-name";
import { cookies } from "next/headers";
import { SessionDto } from "../dtos/session.dto";


export async function setSession(session:SessionDto) {
  const data = JSON.stringify(session);
  const cks = await cookies();

  cks.set(SESSION_NAME, data, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
}