"use client";

import { SESSION_NAME } from "@/backend/shared/enum/session-name";

export async function clientRequest(
  endpoint: string,
  init?: RequestInit & { isFile?: boolean },
): Promise<Response> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // Pegar token dos cookies
  const cookies = document.cookie.split(";");
  const sessionCookie = cookies.find((cookie) => cookie.trim().startsWith(`${SESSION_NAME}=`));
  let token: string | undefined;

  if (sessionCookie) {
    try {
      const sessionValue = sessionCookie.split("=")[1];
      const session = JSON.parse(decodeURIComponent(sessionValue));
      token = session?.accessToken;
    } catch {
      // Ignora erro de parse
    }
  }

  const headers: HeadersInit = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!init?.isFile) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${apiUrl}${endpoint}`, {
    ...init,
    headers: {
      ...headers,
      ...(init?.headers || {}),
    },
  });

  return response;
}

