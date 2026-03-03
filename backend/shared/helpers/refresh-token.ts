"use server";

import { SessionDto } from "@/backend/session/dtos/session.dto";
import { getSession } from "@/backend/session/helpers/get-session.helper";
import { setSession } from "@/backend/session/helpers/set-session.helper";


export async function refreshToken(): Promise<void> {
  try {
    const token = await getSession<SessionDto>();

    if (!token) {
      return undefined;
    }

    const request = await fetch(`${process.env.API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: token.refresh_token,
      }),
    });

    if (request.status != 200) {
      return undefined;
    }

    const data = await request.json();

    if (!data.success) {
      return undefined;
    }

    const newAccessToken = data.data.access_token;

    await setSession({
      access_token: newAccessToken,
      refresh_token: token.refresh_token,
    });
  } catch {
    console.error("Error refreshing token");
    return;
  }
}